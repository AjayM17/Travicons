import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcursionsPage } from './excursions.page';

const routes: Routes = [
  {
    path: '',
    component: ExcursionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcursionsPageRoutingModule {}
