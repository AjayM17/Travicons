import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contact={
    email:'',
    form_heading:'',
    form_text:'',
    heading:'',
    phone:''
  }

  isLoading = true
  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    message: new FormControl(''),
  })
  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.showLoading()
    this.httpService.getData('getContactPageData').subscribe({
      next: res => {
       this.contact = res
       this.isLoading = false
       this.httpService.dismissLoading()
      },
      error: () => {
        this.httpService.dismissLoading()
      }
    })
  }

  submitForm(){
    if(this.contactForm.valid){
      const param = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        phone: this.contactForm.get('phone')?.value,
        message: this.contactForm.get('message')?.value
      }
      this.httpService.showLoading()
      this.httpService.postData('submitContactForm', param).subscribe({
        next: res => {
          this.router.navigate(['/tabs/home'],{replaceUrl:true});
          alert(res['msg'])
          this.httpService.dismissLoading()
        },
        error: () => {
          this.httpService.dismissLoading()
        }
      })
    } else {
      alert('All fields are required')
    }
  }
}
