import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  step = 1
  bookingResponse: any = {}
  flightTime = ''
  retunrFlightTime = ''
  checkOutForm: FormGroup = new FormGroup({
    airLineName: new FormControl('',  Validators.required),
    flightNumber: new FormControl('', Validators.required),
    // flightTime: new FormControl (this.flightTime,Validators.required),
    returnAirLineName: new FormControl(''),
    returnFlightNumber: new FormControl(''),
    // returnFlightTime: new FormControl ('',Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    noOfPassenger: new FormControl('', Validators.required),
    additionalInfo: new FormControl(''),
    paymentOption: new FormControl('', Validators.required)
  })

  constructor(private httpService: HttpService, private router: Router, private paymentService: PaymentService) {
    this.bookingResponse = httpService.bookingResponse
    console.log(this.bookingResponse)
 
  }

  ngOnInit() {
    this.flightTime = this.httpService.getCurrentTime()
    this.checkOutForm.patchValue({
      airLineName: this.bookingResponse['flightname']['0']['AirlineName']
    })
  
    if(this.bookingResponse['bkType'] == 'return'){
      this.checkOutForm.patchValue({
        returnAirLineName: this.bookingResponse['returnflightname']['0']['AirlineName']
      })
      this.retunrFlightTime = this.httpService.getCurrentTime()
      this.checkOutForm.controls['returnAirLineName'].setValidators([Validators.required])
      this.checkOutForm.controls['returnFlightNumber'].setValidators([Validators.required])

    }

  }



  goToStep(step: number) {
    console.log(this.checkOutForm)
    console.log(this.checkOutForm.valid)
    if (this.checkOutForm.valid) {
      this.step = step
    } else {
      alert('All fields are required')
    }
  }

  checkout() {
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
        passenger: this.checkOutForm.get('noOfPassenger')?.value,
        notes: this.checkOutForm.get('additionalInfo')?.value,
        "coupon_code": "",
        "coupon_type": "",
        "coupon_original_amount": "",
        "coupon_amount": "",
        "paymentMethod": "Stripe",
        "pickedExtras": "",
        "name_on_card": "",
        "card_number": "",
        "cvc": "",
        "expiration_month": "",
        "expiration_year": "",
        "stripe_token": "",
      }
  
      console.log(param)
      this.httpService.showLoading()
      this.httpService.postData('checkout',param).subscribe({
        next: res => {
          this.httpService.dismissLoading()
          this.paymentService.paymentSheet(res['paymentIntent'], res['customer'],res['ephemeralKey'])
          // this.router.navigate(['/tabs/home'],{replaceUrl:true});
          // alert(res['msg'])
        },
        error: () => {
          this.httpService.dismissLoading()
        }
      })
    } else {
      alert('All fields are required')
    }
  }

}

