import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcursionsPageRoutingModule } from './excursions-routing.module';
import { ExcursionsPage } from './excursions.page';
import { PipeModule } from 'src/app/pipes/pipe.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    ExcursionsPageRoutingModule
  ],
  declarations: [ExcursionsPage]
})
export class ExcursionsPageModule {}
