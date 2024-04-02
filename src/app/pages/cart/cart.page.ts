import { Component, OnInit } from '@angular/core';
import { Excursion } from 'src/app/models/excursion.modal';
import { Home } from 'src/app/models/home.modal';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  excursions : Excursion[] = []
  constructor(private httpService: HttpService) { }

  ngOnInit() {
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

}
