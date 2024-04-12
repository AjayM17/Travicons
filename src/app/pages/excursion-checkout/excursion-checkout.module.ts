import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcursionCheckoutPageRoutingModule } from './excursion-checkout-routing.module';

import { ExcursionCheckoutPage } from './excursion-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExcursionCheckoutPageRoutingModule
  ],
  declarations: [ExcursionCheckoutPage]
})
export class ExcursionCheckoutPageModule {}
