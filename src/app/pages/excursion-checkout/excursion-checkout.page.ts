import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-excursion-checkout',
  templateUrl: './excursion-checkout.page.html',
  styleUrls: ['../checkout/checkout.page.scss'],
})
export class ExcursionCheckoutPage implements OnInit {

  carts: any = []
  coupon_code = ''
  coupon_details = {
    amount: "",
    coupon_type: "",
    min_amount: "",
    status: 0,
    success: false
  }
  sub_total = 0
  coupon_value = 0
  checkOutForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    additionalInfo: new FormControl(''),
    paymentOption: new FormControl('', Validators.required)
  })
  net_price = 0
  constructor(private router: Router, private paymentService: PaymentService, private httpService: HttpService, private storageService: StorageService) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    this.carts = await this.storageService.getCartItem()
    console.log(this.carts)
    this.getSubTotal()
    this.calculateNetPrice()
  }
  validateCoupon() {
    // const param1 = {
    //   "phone": "7007788563",
    //   "email": "akshitahuja16@gmail.com",
    //   "coupon_code": "KSC10",
    //   "price": 74
    // }

    const param = {
      phone: this.checkOutForm.get('phone')?.value,
      email: this.checkOutForm.get('email')?.value,
      coupon_code: this.coupon_code,
      price: this.sub_total
    }
    this.httpService.showLoading()
    this.httpService.postData('validateCoupon', param).subscribe({
      next: res => {
        this.coupon_details = res
        this.coupon_details['success'] = res['success']
        if (res['success']) {
          if (res['status'] == 2) {

          } else if (res['status'] == 3) {

          } else {
            if (res['coupon_type'] == 'percent') {
              this.coupon_value = Math.round(((this.sub_total * Number(res['amount'])) / 100))
            } else {
              this.coupon_value = Number(res['amount'])
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

  getTotalprice(cart: any) {
    let price = 0
    if (cart['is_yacht'] == 0) {
      price = cart['package_count'] * Number(cart['price']) + cart['kids'] * ((Number(cart['price']) * 75) / 100)
    } else {
      price = cart['hours'] * Number(cart['price'])
    }

    return price
  }

  getSubTotal() {
    this.sub_total = 0
    for (let cart of this.carts) {
      if (cart['is_yacht'] == 0) {
        this.sub_total +=  cart['package_count'] * Number(cart['price']) + cart['kids'] * ((Number(cart['price']) * 75) / 100)
      } else {
        this.sub_total += cart['hours'] * Number(cart['price'])
      }
    }
  }

  calculateNetPrice() {
    this.net_price = this.sub_total - this.coupon_value
  }

  checkout() {
    if (this.checkOutForm.valid) {
      const param = {
        cart: this.carts,
        coupon_amount: this.coupon_value,
        coupon_type: this.coupon_details.coupon_type,
        coupon_original_amount: this.coupon_details.amount,
        fname: this.checkOutForm.get('firstName')?.value,
        sname: this.checkOutForm.get('lastName')?.value,
        email: this.checkOutForm.get('email')?.value,
        phone: this.checkOutForm.get('phone')?.value,
        notes: this.checkOutForm.get('additionalInfo')?.value,
        price: this.net_price,
        paymentMethod: this.checkOutForm.get('paymentOption')?.value
      }
      this.httpService.showLoading()
      this.httpService.postData('checkoutCart', param).subscribe({
        next: res => {
          this.httpService.dismissLoading()
          console.log(res)
          if (this.checkOutForm.get('paymentOption')?.value == 'Stripe') {
            this.paymentService.paymentSheet('updateCartPaymentStatus',res['revCode'], res['paymentIntent'], res['customer'], res['ephemeralKey'])
          } else {
            this.router.navigate(['/tabs/home'], { replaceUrl: true });
            alert(res['msg'])
          }
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
