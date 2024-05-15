import { Injectable } from '@angular/core';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  paypalConfig ={
    currency: "USD",
    clientId: "AY-oGUD6mV_rLMUIL7FqS8YImZnskc-vhcsD7WPEa8uGNBA4-kI5GdTRQ1tG5T2IU1Jqz6sqpz0rgJvS",
    currency_code: "USD"
  }
  private randompk = ''
  constructor(private httpService: HttpService, private router: Router) { }

  initializeStripe() {
    Stripe.initialize({
      publishableKey: this.randompk,
    });
  }



  async paymentSheet(statusUrl:string, revCode:string, paymentIntent: any, customer: any, ephemeralKey: any) {
    // async paymentSheet() {
    /*
    With PaymentSheet, you can make payments in a single flow. 
    As soon as the User presses the payment button, 
    the payment is completed. (If you want user have some flow after that, 
    please use paymentFlow method)
    */

    try {
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      
      });

      // const data = new HttpParams({
      //   fromObject: this.data
      // });
      // Connect to your backend endpoint, and get every key.
      // const data$ = this.httpService.paymnetSheetHttp(this.data);

      // const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

  

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Travions'
      });
      // prepare PaymentSheet with CreatePaymentSheetOption.
      // const param = {
      // customer: "cus_PqUs8r60o1pxn1",
      // ephemeralKey: "ek_test_YWNjdF8xTFByRG1Cc0QzUWdES1pkLDBudGpjT203NnJUTE5YYmtyMGhGenh6ZW9mOTR1dHI_00r6zYOuwr",
      // paymentIntent: "pi_3P0nslBsD3QgDKZd1xkpOkuk_secret_0PD6PlpKERRma0ymicNWeFqXj"
      // }
      // await Stripe.createPaymentSheet({
      //   paymentIntentClientSecret: param.paymentIntent,
      //   customerId: param.customer,
      //   customerEphemeralKeySecret: param.ephemeralKey,
      //   merchantDisplayName: 'Travions'
      // });

     
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
   
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.updatePaymentStatus(statusUrl,revCode, paymentIntent, true)
      } else {
        this.updatePaymentStatus(statusUrl,revCode, paymentIntent, false)
      }
    } catch (e) {
   
    }
  }

  updatePaymentStatus(statusUrl:string, revCode:string, paymentIntent: string, status: boolean) {
    this.httpService.showLoading()
    const param = {
      revCode: revCode,
      status: status,
      response: {
        'paymentIntent': paymentIntent
      }
    }
    //updateBookingPaymentStatus
    this.httpService.postData(statusUrl, param).subscribe({
      next: res => {
        this.httpService.dismissLoading()
        // this.paymentService.paymentSheet(res['paymentIntent'], res['customer'], res['ephemeralKey'])
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        alert(res['msg'])
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

  splitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');

    return result;
  }

  setRandomPk(pk:string){
    this.randompk =pk
   
  }


  updatePaypalPaymentStatus(statusUrl:string, revCode:string, orderId: string) {
    this.httpService.showLoading()
    const param = {
      revCode: revCode,
      orderId: orderId
    }
   console.log(param)
    this.httpService.postData(statusUrl, param).subscribe({
      next: res => {
        this.httpService.dismissLoading()
        // this.paymentService.paymentSheet(res['paymentIntent'], res['customer'], res['ephemeralKey'])
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
        alert(res['msg'])
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

}
