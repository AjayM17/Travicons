import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card/card.component';
import { RegistrationComponent } from './registration/registration.component';
import { PipeModule } from '../pipes/pipe.modules';


@NgModule({
  declarations: [CardComponent,RegistrationComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipeModule,
    FormsModule
  ],
  exports: [CardComponent,RegistrationComponent]
})
export class ComponentsModule { }
