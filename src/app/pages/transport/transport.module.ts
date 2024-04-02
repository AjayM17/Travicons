import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportPageRoutingModule } from './transport-routing.module';

import { TransportPage } from './transport.page';
import { ComponentsModule } from '../../components/component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TransportPageRoutingModule
  ],
  declarations: [TransportPage]
})
export class TransportPageModule {}
