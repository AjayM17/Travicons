import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { HttpService } from './services/http/http.service';
import { PaymentService } from './services/payment/payment.service';
import { StorageService } from './services/storage/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showSplashLoader = true
  constructor(private httpService:HttpService, private storageService: StorageService, private platform:Platform, private router: Router, private paymentService: PaymentService) {
    StatusBar.setBackgroundColor({color:'009eec'})
    platform.ready().then(()=> {
      document.body.classList.remove('dark');
     httpService.postData('/AuthAPI/generateTo',{random:httpService.getbdasdas()})
     .subscribe({
      next : res => {
        httpService.setdnmada(res['to'])
        console.log(res['to'])
        paymentService.initializeStripe()
        storageService.init()
        this.router.navigate(['tabs'])
        setTimeout(() => {
          this.showSplashLoader =false
        },1500)

      },
      error: () => {
       
      }
    })
 
    })
  }
}
