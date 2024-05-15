import { Component, OnInit } from '@angular/core';
import { Excursion } from 'src/app/models/excursion.modal';
import { Home } from 'src/app/models/home.modal';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-excursions',
  templateUrl: './excursions.page.html',
  styleUrls: ['./excursions.page.scss'],
})
export class ExcursionsPage implements OnInit {

  excursions : Excursion[] = []
  base_url = environment.api
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.showLoading()
    this.httpService.getData('getExcursionsPageData').subscribe({
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
