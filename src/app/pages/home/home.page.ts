import { Component, OnInit } from '@angular/core';
import { Excursion } from 'src/app/models/excursion.modal';
import { Location } from 'src/app/models/location.modal'
import { Home } from 'src/app/models/home.modal';
import { HttpService } from 'src/app/services/http/http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  excursions : Excursion[] = []
  pickUpLocations: Location[] = []
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    // this.httpService.showLoading()
    this.httpService.getData('getHomePageData').subscribe({
      next: res => {
        this.excursions = res.excursions
        this.pickUpLocations = res.pickUpLocations
        // this.httpService.dismissLoading()
      },
      error: () => {
        // this.httpService.dismissLoading()
      }
    })
  }

}
