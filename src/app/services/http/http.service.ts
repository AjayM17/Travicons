import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BASE_URL = environment.api
  vehicleListResponse: any = {}
  bookingResponse: any = {}
  noOfPassenger:string = ''
  loading: HTMLIonLoadingElement | undefined;
  private rts = 'eESKPYIK8RXJhr9mGcTzWCXcKClklykP'
  private tv = ''
  constructor(private http: HttpClient, private loadingCtrl: LoadingController) { }

  getData(url: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}${url}?random=${this.generateRandomString(8)}`,{headers:{Authorization: this.tv}})
  }

  postData(url: string, params: {}): Observable<any> {
    return this.http.post(`${this.BASE_URL}${url}?random=${this.generateRandomString(8)}`, params,{headers:{Authorization: this.tv}})
  }

  paymnetSheetHttp(body:any) {
    // return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({});
    this.loading.present();
  }

  dismissLoading() {
    if(this.loading != null && this.loading != undefined){
      this.loading.dismiss()
    }
  }

  getRts(){
    return this.rts
  }

  setTv(tv:string){
    this.tv = tv
  }
}
