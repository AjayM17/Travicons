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
    platform.ready().then(async ()=> {
      document.body.classList.remove('dark');
      const tres = await  httpService.postData('/AuthAPI/generateTo',{random:httpService.getRts()})
      tres.subscribe({
        next : res => {

          httpService.setTv(res['to'])
          this.getRandomString()
          
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

  async getRandomString(){
    const res = await this.httpService.getData('getRandomString')
    res.subscribe( res => {
      console.log(res)
      this.paymentService.setRandomPk(res['pk'])
      this.paymentService.initializeStripe()
    })
  }
}
