import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  isLoading = true
  aboutus={
    heading:'',
    content:'',
    second_section_heading:'',
    second_section_point1:'',
    second_section_point2:'',
    second_section_point3:'',
    second_section_point4:'',
    second_section_point5:'',
    second_section_point6:'',
    second_section_text:'',
    about_point1:'',
    about_point2:'',
    about_point3:'',
    about_point4:'',
    about_point5:'',
    about_point6:''
  }
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.showLoading()
    this.httpService.getData('getAboutPageData').subscribe({
      next: res => {
        this.aboutus = res
        this.isLoading = false
       this.httpService.dismissLoading()
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

}
