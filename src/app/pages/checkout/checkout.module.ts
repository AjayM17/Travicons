import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
