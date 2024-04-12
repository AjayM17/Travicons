import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcursionCheckoutPage } from './excursion-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: ExcursionCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcursionCheckoutPageRoutingModule {}
