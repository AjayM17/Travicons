import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleListPageRoutingModule } from './vehicle-list-routing.module';

import { VehicleListPage } from './vehicle-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleListPageRoutingModule
  ],
  declarations: [VehicleListPage]
})
export class VehicleListPageModule {}
