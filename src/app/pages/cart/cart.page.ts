import { Component, OnInit } from '@angular/core';
import { Excursion } from 'src/app/models/excursion.modal';
import { Home } from 'src/app/models/home.modal';
import { HttpService } from 'src/app/services/http/http.service';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  excursions: Excursion[] = []
  carts: any = []
  showAlert = false
  delete_excursion_id = '0'
  net_total = 0

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.delete_excursion_id = '0'
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: async () => {
      this.carts =  await this.storageService.deleteCartItem(this.delete_excursion_id)
      this.getNetTotal()
      },
    },
  ];

  constructor(private httpService: HttpService, private storageService: StorageService) { 
   
  }

  ngOnInit() {
    console.log('-----')
    this.httpService.showLoading()
    
    this.httpService.getData('getHomePageData?random=havsh123').subscribe({
      next: res => {
        this.excursions = res.excursions
        this.httpService.dismissLoading()
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

  toggleDeleteAlert(excursion_id:string){
    this.delete_excursion_id = excursion_id
    this.showAlert = !this.showAlert
  }

  async ionViewWillEnter(){
    this.carts = await this.storageService.getCartItem()
    this.getNetTotal()
    console.log(this.carts)
  }


  getTotalprice(cart:any){
    let price = 0
    if (cart['is_yacht'] == 0) {
      price +=  cart['package_count'] * Number(cart['price']) + cart['kids'] * ((Number(cart['price']) * 75) / 100)
    } else {
      price += cart['hours'] * Number(cart['price'])
    }
    return price
  }

  getNetTotal(){
    this.net_total = 0
    for (let cart of this.carts) {
      if (cart['is_yacht'] == 0) {
        this.net_total +=  cart['package_count'] * Number(cart['price']) + cart['kids'] * ((Number(cart['price']) * 75) / 100)
      } else {
        this.net_total += cart['hours'] * Number(cart['price'])
      }
    }
  }

}
