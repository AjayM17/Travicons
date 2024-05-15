import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-excursion-detail',
  templateUrl: './excursion-detail.page.html',
  styleUrls: ['./excursion-detail.page.scss'],
})
export class ExcursionDetailPage implements OnInit {

  base_url = environment.api
  hotel = {
    CityName:'',
    IDLocation:'',
    LocationName:'',
    pickup_timing:''
  }
  booking_date = new Date().toISOString().split('T')[0]
  kids = ''
  adults = ''
  pickup_time:string = ''
  hours:number = 0
  slug:string = ''
  excursion_picture:string = ''
  selected_segment:string = 'description'
  segment_detail:string = ''
  excursion = {
    id:'',
    title:'',
    price:'',
    max_people:'',
    min_age:'',
    description:'',
    included:'',
    bring:'',
    is_yacht:0,
    type:''
  }

  locations = []
  pickup_times = []
  constructor(private router: Router, private storageService:StorageService, private activatedRoute: ActivatedRoute, private httpService: HttpService) { 
    activatedRoute.params.subscribe( params => {
      this.slug = params['slug']
      this.getExcursionDetail()
    })
  }

  ngOnInit() {
  }

  selectSegment(segment:string){
    this.selected_segment = segment
    if(segment == 'description'){
      this.segment_detail = this.excursion['description']
    } else if(segment == 'included'){
      this.segment_detail = this.excursion['included']
    } else{
      this.segment_detail = this.excursion['bring']
    }
  }

  getExcursionDetail(){
    this.httpService.showLoading()
    this.httpService.getData(`getExcursionDetail/${this.slug}`).subscribe({
      next: res => {
        this.excursion = res['excursion']
        this.segment_detail = this.excursion['description']
        this.excursion_picture = res['excursion_pictures'][0]['path']
        this.locations = res['locations']
        this.httpService.dismissLoading()
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

  selectedLocation(event:any){
    this.pickup_times = event.detail.value['pickup_timing'].split(',')
    this.hotel = event.detail.value
    console.log(this.hotel)
  }

  selectPickupTime(event:any){
    this.pickup_time = event.detail.value
  }

  addToCart(){
    console.log(this.hotel)
    if(this.hotel.IDLocation == ''){
      alert('Please Select Hotel')
      return
    }
    if(this.pickup_time == ''){
      alert('Please Select Pickup Timing')
      return
    }
    if(this.excursion['is_yacht'] == 1){
      if(this.hours < 4){
        alert('Minimum hours allowed is 4')
        return
      }
      if(this.hours > 8){
        alert('Maximum hours allowed is 8')
        return
      }
    }
    const cartItem =  {
      price: this.excursion.price,
      excursion_id : this.excursion.id,
      excursion_title:this.excursion.title,
      type: 'excursion',
      date: this.booking_date,
      package_count: this.adults,
      kids:this.kids,
      hotel_location:this.hotel['LocationName'],
      hotel:this.hotel['IDLocation'],
      pickup_timing:this.pickup_time,
      hours:this.hours,
      is_yacht:this.excursion.is_yacht
    }
    
    this.storageService.addCartItem(cartItem).then(() => {
      this.router.navigate(['/tabs/cart']);
    })
  }
}
