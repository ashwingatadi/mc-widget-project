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
  buttonIdForConsentAPICall:string;


  constructor(private configService: ConfigService, private elm: ElementRef) {
    this.useConsent = elm.nativeElement.getAttribute('useConsent');
    this.callConsentAPIOnSubmit = elm.nativeElement.getAttribute('callConsentAPIOnSubmit');
    this.buttonIdForConsentAPICall = elm.nativeElement.getAttribute('buttonIdForConsentAPICall');
    //console.log(this.useConsent);
  }

  ngOnInit() {
    //console.log(this.useConsent);
  }

  ngAfterViewInit() {
    //console.log(this.useConsent);
  }


}
