import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-signup',
  templateUrl: './mc-signup.component.html',
  styleUrls: ['./mc-signup.component.css']
})
export class McSignupComponent implements OnInit, AfterViewInit {
  useConsent: boolean;
  // configData: any;
  callConsentAPIOnSubmit: boolean = false;
  // buttonIdForConsentAPICall: string;
  // consentApiKey: string;


  constructor(private configService: ConfigService, private elm: ElementRef, private router: Router) {
    /*this.useConsent = elm.nativeElement.getAttribute('useConsent');
    this.callConsentAPIOnSubmit = elm.nativeElement.getAttribute('callConsentAPIOnSubmit');*/

  }

  ngOnInit() {
  
    //this.readConfigData();
  }

  ngAfterViewInit() {
  }

  Navigate(){
    this.router.navigateByUrl('/customers', { skipLocationChange: true });
  }

  Navigate2(){
    this.router.navigateByUrl('/dummy',{ skipLocationChange: true });
  }

  readConfigData() {
    this.configService.getConfigData().subscribe(
      data => {
        var dat = JSON.parse(data._body);
        console.log(dat);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })
  }
}
