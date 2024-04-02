import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { PaymentService } from './services/payment/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showSplashLoader = true
  constructor(private platform:Platform, private router: Router, private paymentService: PaymentService) {
    StatusBar.setBackgroundColor({color:'009eec'})
    platform.ready().then(()=> {
      document.body.classList.remove('dark');
      paymentService.initializeStripe()
      setTimeout(() => {
        this.showSplashLoader =false
      },1500)
    })
  }
}
