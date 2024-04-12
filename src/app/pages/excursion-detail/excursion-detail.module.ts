import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcursionDetailPageRoutingModule } from './excursion-detail-routing.module';

import { ExcursionDetailPage } from './excursion-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcursionDetailPageRoutingModule
  ],
  declarations: [ExcursionDetailPage]
})
export class ExcursionDetailPageModule {}
