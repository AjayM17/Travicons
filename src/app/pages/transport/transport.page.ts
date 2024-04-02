import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/models/home.modal';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from 'src/app/models/location.modal'

@Component({
  selector: 'app-transport',
  templateUrl: './transport.page.html',
  styleUrls: ['./transport.page.scss'],
})
export class TransportPage implements OnInit {
  pickUpLocations: Location[] = []
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getData('getHomePageData?random=havsh123').subscribe( (res: Home) => {
    this.pickUpLocations = res.pickUpLocations
    })
  }
}
