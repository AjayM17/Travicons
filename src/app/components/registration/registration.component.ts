import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonDatetime, IonDatetimeButton } from '@ionic/angular';
import { Location } from 'src/app/models/location.modal'
import { HttpService } from 'src/app/services/http/http.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  @Input() inputId:string  = "867862";
  @Input() oneWayPickUpLocations: Location[] = []
  triptype: string = "oneway"
  oneWayDropLocations: Location[] = []
  roundTripPickupLocations: Location[] = []
  roundTripDropLocations: Location[] = []
  oneWayPickupLocationId: string = ''
  oneWayDropLocationId: string = ''
  roundTripPickupLocationId: string = ''
  roundTripDropLocationId: string = ''
  oneWayDate = new Date().toISOString().split('T')[0]
  oneWayTime = ''
  roundTripDate = new Date().toISOString().split('T')[0]
  roundTripTime = ''
  noOfPassenger = ''

  constructor(private httpService: HttpService, private router: Router, private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.getRoundTripLocation()
    this.oneWayTime = this.httpService.getCurrentTime()
    this.roundTripTime = this.httpService.getCurrentTime()
  }



  onSegmentChange(event: any) {
    //  this.paymentService.paymentSheet()
    this.triptype = event.detail.value
    if (event.detail.value == 'roundtrip') {
      // this.getRoundTripLocation()
    }
  }

  onSelectPicupLocation(event: any, type: string) {
    if (type == 'oneway') {
      this.oneWayPickupLocationId = event.detail.value
    } else {
      this.roundTripPickupLocationId = event.detail.value
    }
    this.getReturnLocations(event.detail.value, type)
  }

  onSelectDropLocation(event: any, type: string) {
    if (type == 'oneway') {
      this.oneWayDropLocationId = event.detail.value
    } else {
      this.roundTripDropLocationId = event.detail.value
    }
  }

  getRoundTripLocation() {
    this.httpService.getData('/getRoundTripData').subscribe(res => {
      this.roundTripPickupLocations = res['returnPickUpLocations']
    })
  }

  getReturnLocations(locationId: string, type: string) {
    this.httpService.showLoading()
    this.httpService.getData(`getLocationPairingData/${locationId}`).subscribe({
      next: res => {
        if (type == 'oneway') {
          this.oneWayDropLocations = res['dropOffLocations']
        } else {
          this.roundTripDropLocations = res['dropOffLocations']
        }
        this.httpService.dismissLoading()
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

  getVehiclesList() {
    if(this.checkDateAndTime()){
      const params = {
        passenger: this.noOfPassenger,
        bkdate: this.oneWayDate,
        bktime: this.oneWayTime,
        retdate: this.triptype == 'oneway' ? '' : this.roundTripDate,
        rettime: this.triptype == 'oneway' ? '' : this.roundTripTime,
        locFrom: Number(this.oneWayPickupLocationId),
        locTo: Number(this.oneWayDropLocationId),
        retLocFrom: this.triptype == 'oneway' ? '' : Number(this.roundTripPickupLocationId),
        retLocTo: this.triptype == 'oneway' ? '' : Number(this.roundTripDropLocationId),
        bkType: this.triptype == 'oneway' ? 'oneway' : 'return',
      }
      this.httpService.showLoading()
      this.httpService.postData('showVehiclesForBooking', params).subscribe({
        next: res => {
          this.httpService.dismissLoading()
          this.httpService.vehicleListResponse = res
          this.httpService.noOfPassenger = this.noOfPassenger
          if (res['vehicles'].length != 0) {
            this.router.navigate(['/vehicle-list']);
          } else {
            alert('No vehicle available')
          }
        },
        error: () => {
          this.httpService.dismissLoading()
        }
      })
    } 
   
  }

  isDisabled() {
    if (this.noOfPassenger.trim() == '' || this.noOfPassenger == '0') {
      return true
    }
    if (this.triptype == 'oneway') {
      if (this.oneWayDropLocationId != '') {
        return false
      }
      return true
    } else {
      if (this.oneWayDropLocationId != '' && this.roundTripDropLocationId != '') {
        return false
      }
      return true
    }
  }

  checkDateAndTime() {
    let bookingDateTime = new Date(this.oneWayDate + ' ' + this.oneWayTime);
    let currentDateTime = new Date();

    let difference = bookingDateTime.getTime() - currentDateTime.getTime();

    if (difference < 0) {
      alert('Cannot book for past Date and Time');
      return false
    }
    else {
      difference = difference / 1000;
      let hourDifference = Math.floor(difference / 60);
      if (hourDifference > 900) {
        return true
      }
      else {
        alert('Cannot book within next 15 hours');
        return false;
      }
    }
  }

}
