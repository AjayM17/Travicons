import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CutomPipe } from './pipes/cutom.pipe';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [AppComponent, CutomPipe],
  imports: [BrowserModule, IonicStorageModule.forRoot(), IonicModule.forRoot({mode:'ios'}), AppRoutingModule,HttpClientModule,NgxPayPalModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
