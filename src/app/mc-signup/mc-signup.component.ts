import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ConfigService } from './../services/config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-signup',
  templateUrl: './mc-signup.component.html',
  styleUrls: ['./mc-signup.component.css']
})
export class McSignupComponent implements OnInit, AfterViewInit {
  useConsent: boolean;
  configData: any;
  callConsentAPIOnSubmit: boolean = false;
  buttonIdForConsentAPICall: string;
  consentApiKey: string;


  constructor(private configService: ConfigService, private elm: ElementRef) {
    this.useConsent = elm.nativeElement.getAttribute('useConsent');
    this.callConsentAPIOnSubmit = elm.nativeElement.getAttribute('callConsentAPIOnSubmit');
    this.buttonIdForConsentAPICall = elm.nativeElement.getAttribute('buttonIdForConsentAPICall');
    this.consentApiKey = elm.nativeElement.getAttribute('consentApiKey');
    //console.log(this.buttonIdForConsentAPICall);
  }

  ngOnInit() {
    //console.log(this.useConsent);
    this.readConfigData();
  }

  ngAfterViewInit() {
    //console.log(this.useConsent);
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
