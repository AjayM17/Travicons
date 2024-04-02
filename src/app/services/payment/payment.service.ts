import { Injectable } from '@angular/core';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';




@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // data: any = {
  //   name: 'Ajay',
  //   email: 'ajaymandrawal17@gmail.com',
  //   amount: 100,
  //   currency: 'inr'
  // };

  constructor(private httpService: HttpService) { }

  initializeStripe() {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }

 

  async paymentSheet(paymentIntent:any,customer:any,ephemeralKey:any) {
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
        console.log('PaymentSheetEventsEnum.Completed');
      });
    
      // const data = new HttpParams({
      //   fromObject: this.data
      // });
      // Connect to your backend endpoint, and get every key.
      // const data$ = this.httpService.paymnetSheetHttp(this.data);

      // const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

      // console.log('paymentIntent: ', paymentIntent);

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

      console.log('createPaymentSheet');
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        // this.splitAndJoin(paymentIntent);
      }
    } catch(e) {
      console.log(e);
    }
  }
}
