import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {

  base_url = environment.api
  vehicleList = []
  params: any = {}
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.params = this.httpService.vehicleListResponse
    console.log(this.params)
    this.vehicleList = this.params['vehicles']
  }

  bookCar(vehicle: any) {
    const params = {
      passenger:this.httpService.noOfPassenger,
      bkdate: this.params['bkdate'],
      bktime: this.params['bktime'],
      retdate: this.params['retdate'],
      rettime: this.params['rettime'],
      locFrom: this.params['locFrom'],
      locTo: this.params['locTo'],
      retLocFrom: this.params['retLocFrom'],
      retLocTo: this.params['retLocTo'],
      bkType: this.params['bkType'],
      pricingID: vehicle['pricingID']
    }

    this.httpService.postData('setCarForBooking', params).subscribe(res => {
      this.httpService.bookingResponse = res
      this.router.navigate(['/checkout']);

    })
  }

  getPrice(vehicle:any){
    if(this.params['bkType'] == 'return'){
        return (Number(vehicle['price']) + Number(vehicle['retPrice']))
    } else {
      return Number(vehicle['price'])
    }
  }

}
