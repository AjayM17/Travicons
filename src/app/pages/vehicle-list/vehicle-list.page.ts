import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {

  vehicleList = []
  params: any = {}
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.params = this.httpService.vehicleListResponse
    this.vehicleList = this.params['vehicles']
    console.log(this.params)
  }

  bookCar(vehicle: any) {
    const params = {
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

    console.log(params)

    this.httpService.postData('setCarForBooking', params).subscribe(res => {
      console.log(res)
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
