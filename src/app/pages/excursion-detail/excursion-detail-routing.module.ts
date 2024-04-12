import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcursionDetailPage } from './excursion-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExcursionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcursionDetailPageRoutingModule {}
