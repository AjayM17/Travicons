import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpService } from 'src/app/services/http/http.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  breakpoint = 0.3
  @ViewChild(IonModal) modal: IonModal|any;
  base_url = environment.api
  payPalConfig?: IPayPalConfig;
  step = 1
  bookingResponse: any = {}
  extras: any = []
  flightTime = ''
  coupon_code = ''
  coupon_details = {
    amount: "",
    coupon_type: "",
    min_amount: "",
    status: 0,
    success:false
  }
  coupon_value = 0
  retunrFlightTime = ''
  extra_price = 0
  sub_total = 0
  net_price = 0
  noOfPassenger = ''
  booking_id= ''
  paypal_refcode = ''
  checkOutForm: FormGroup = new FormGroup({
    airLineName: new FormControl('', Validators.required),
    flightNumber: new FormControl('', Validators.required),
    // flightTime: new FormControl (this.flightTime,Validators.required),
    returnAirLineName: new FormControl(''),
    returnFlightNumber: new FormControl(''),
    // returnFlightTime: new FormControl ('',Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    // noOfPassenger: new FormControl('', Validators.required),
    additionalInfo: new FormControl(''),
    paymentOption: new FormControl('', Validators.required)
  })

  togglePaypalModal = false
  constructor(private httpService: HttpService, private router: Router, private paymentService: PaymentService) {
    this.bookingResponse = httpService.bookingResponse
  }

  ngOnInit() {
    this.noOfPassenger = this.httpService.noOfPassenger
    this.initConfig()
    this.flightTime = this.httpService.getCurrentTime()
    this.checkOutForm.patchValue({
      airLineName: this.bookingResponse['flightname']['0']['AirlineName']
    })
     
    if (this.bookingResponse['bkType'] == 'return') {
      this.checkOutForm.patchValue({
        returnAirLineName: this.bookingResponse['returnflightname']['0']['AirlineName']
      })
      this.retunrFlightTime = this.httpService.getCurrentTime()
      this.checkOutForm.controls['returnAirLineName'].setValidators([Validators.required])
      this.checkOutForm.controls['returnFlightNumber'].setValidators([Validators.required])
      this.sub_total = Number(this.bookingResponse['price']) + Number(this.bookingResponse['retprice'])
    } else{
      this.sub_total = Number(this.bookingResponse['price'])
    }
    this.calculateNetPrice()

  }



  goToStep(step: number) {
  
    if (this.checkOutForm.valid) {
      this.step = step
    } else {
      alert('All fields are required')
    }
  }

  checkout() {
    // this.togglePaypalModal = !this.togglePaypalModal
    // return
    if (this.checkOutForm.valid) {
      const param = {
        bkType: this.bookingResponse['bkType'],
        bkdate: this.bookingResponse['bkdate'],
        bktime: this.bookingResponse['bktime'],
        retdate: this.bookingResponse['retdate'],
        rettime: this.bookingResponse['rettime'],
        locFrom: this.bookingResponse['locFrom'],
        locTo: this.bookingResponse['locTo'],
        retLocFrom: this.bookingResponse['retLocFrom'],
        retLocTo: this.bookingResponse['retLocTo'],
        pricingID: Number(this.bookingResponse['pricingID']),
        flightname: this.checkOutForm.get('airLineName')?.value,
        returnflightname: this.checkOutForm.get('returnAirLineName')?.value,
        flight_number: this.checkOutForm.get('flightNumber')?.value,
        arrival_time: this.flightTime,
        departure_flight_number: this.checkOutForm.get('returnFlightNumber')?.value,
        departure_flight_time: this.retunrFlightTime,
        fname: this.checkOutForm.get('firstName')?.value,
        sname: this.checkOutForm.get('lastName')?.value,
        email: this.checkOutForm.get('email')?.value,
        phone: this.checkOutForm.get('phone')?.value,
        passenger: this.noOfPassenger,
        notes: this.checkOutForm.get('additionalInfo')?.value,
        coupon_code: this.coupon_code,
        coupon_type: this.coupon_details['coupon_type'],
        coupon_original_amount: this.coupon_details['amount'],
        coupon_amount: this.coupon_value,
        paymentMethod: this.checkOutForm.get('paymentOption')?.value,
        pickedExtras: JSON.stringify(this.extras),
        "name_on_card": "",
        "card_number": "",
        "cvc": "",
        "expiration_month": "",
        "expiration_year": "",
        "stripe_token": "",
      }

      console.log(param)
      this.httpService.showLoading()
      this.httpService.postData('checkout', param).subscribe({
        next: res => {
          console.log(res)
          this.httpService.dismissLoading()
          if(this.checkOutForm.get('paymentOption')?.value == 'Stripe'){
            this.paymentService.paymentSheet('updateBookingPaymentStatus',res['revCode'], res['paymentIntent'], res['customer'], res['ephemeralKey'])
          } else {
            this.paypal_refcode = res['revCode']
            this.booking_id = res['bookingId']
            this.togglePaypalModal = true
          }
        },
        error: (err) => {
          console.log(err)
          this.httpService.dismissLoading()
        }
      })
    } else {
      alert('All fields are required')
    }
  }

  selectExtra(event: any, extra: any) {
    const extra_index = this.extras.findIndex((ele: any) => ele['IDExtra'] == extra['IDExtra'])
 
    if (event['detail']['checked']) {
      if (extra_index == -1) {
        this.extras.push(extra)
      }
    } else {
      if (extra_index != 1) {
        this.extras.splice(extra_index, 1)
      }
    }
    this.calculatePriceWithExtra()
  }



  calculatePriceWithExtra() {
     this.extra_price = 0
    for (let index in this.extras) {
      this.extra_price += (Number(this.extras[index]['UnitPrice']) * Number(this.noOfPassenger))
    }
    // this.bookingResponse['price'] = Number(this.bookingResponse['price']) + extra_price
    this.calculateNetPrice()
  }

  calculateNetPrice(){
    this.net_price =  (this.sub_total - this.coupon_value) + this.extra_price
  }





  validateCoupon() {
    // const param1 = {
    //   "phone": "7007788563",
    //   "email": "akshitahuja16@gmail.com",
    //   "coupon_code": "KSC10",
    //   "price": 74
    // }

    const param = {
      phone:  this.checkOutForm.get('phone')?.value,
      email: this.checkOutForm.get('email')?.value,
      coupon_code: this.coupon_code,
      price: this.bookingResponse['price']
    }
    this.httpService.showLoading()
    this.httpService.postData('validateCoupon', param).subscribe({
      next: res => {
        this.coupon_details =  res
         this.coupon_details['success'] = res['success']
          if(res['success']){
            if(res['status'] == 2){

            } else if(res['status'] == 3){

            } else {
              if(res['coupon_type'] == 'percent'){
                  this.coupon_value = Math.round(((this.sub_total * Number(res['amount'])) / 100))
              } else {
                this.coupon_value =  Number(res['amount'])
              }
              this.calculateNetPrice()
            }
          }
        this.httpService.dismissLoading()
     
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

  onPaypalModalWillDismiss() {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
   this.togglePaypalModal = false
  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: this.paymentService.paypalConfig.currency,
    clientId: this.paymentService.paypalConfig.clientId,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          custom_id: this.booking_id,
          amount: {
            currency_code: this.paymentService.paypalConfig.currency_code,
            value: this.net_price.toString(),
            breakdown: {
              item_total: {
                currency_code: this.paymentService.paypalConfig.currency_code,
                value: this.net_price.toString()
              }
            }
          },
          items: [
            {
              name: 'Transportation',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: this.paymentService.paypalConfig.currency_code,
                value: this.net_price.toString(),
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        this.togglePaypalModal = false
        this.paymentService.updatePaypalPaymentStatus('updateBookingPaymentStatusPaypal',this.paypal_refcode,details['id'])
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log(data)
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      
      // this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}

