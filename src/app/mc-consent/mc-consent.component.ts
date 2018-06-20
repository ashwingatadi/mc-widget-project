import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiconnectService } from '../services/apiconnect.service';
interface datatype{
  data: string;
}

@Component({
  selector: 'mc-consent',
  templateUrl: './mc-consent.component.html',
  styleUrls: ['./mc-consent.component.css'],
  encapsulation: ViewEncapsulation.None
  
})
export class McConsentComponent implements OnInit, AfterViewInit {
  @Input() callAPI: boolean = false;
  @Input() buttonIdForAPICall: string;
  @Input() apiKey: string;
  @Input() mcConsentWidth: string;
  @Input() mcConsentHeight: string;
  @Input() styleType: string = 'priceless';
  @Input() channel: string;
  consentList: datatype[] = [];
  constructor(private elm: ElementRef, private apiService: ApiconnectService ,private configService: ConfigService) {
    this.callAPI = elm.nativeElement.getAttribute('callAPI');
    this.buttonIdForAPICall = elm.nativeElement.getAttribute('buttonIdForAPICall');
    this.apiKey = elm.nativeElement.getAttribute('apiKey');
    this.mcConsentWidth = elm.nativeElement.getAttribute('mcConsentWidth');
    this.mcConsentHeight = elm.nativeElement.getAttribute('mcConsentHeight');
    this.styleType = elm.nativeElement.getAttribute('styleType');
  }

  ngOnInit() {

    this.apiService.getResponse().subscribe(

      data => {
       console.log(data[0].consentUseData[0].consentData);
        this.consentList.push(data[0].consentUseData[0].consentData.data);
        /*this.consentList = data;*/
        console.log(typeof this.consentList);
      /* this.consentList = data.json();
        this.consentList = Array.of(this.consentList);
        console.log(typeof this.consentList);*/

      });
  }

  ngAfterViewInit() {
    //console.log(this.callAPI);
    if (this.callAPI) {
      var element = document.getElementById(this.buttonIdForAPICall);
      element ? element.addEventListener('click', this.onSubmitClick.bind(this)) : false;
    }

  }

  onSubmitClick(event) {
    this.configService.getConfigData().subscribe(
      data => {
        var dat = JSON.parse(data._body);
        var urlOfAPI = dat.consent.api[this.apiKey];
        console.log("URL of API Call:" + urlOfAPI);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })*/
    this.apiService.getResponse().subscribe(

      data => {
        console.log(data[0].consentUseData[0].consentData);
        /*this.consentList = data;*/
        console.log(typeof this.consentList);
        /* this.consentList = data.json();
          this.consentList = Array.of(this.consentList);
          console.log(typeof this.consentList);*/

      });
  }

  showPopupForTandC(consent: string) {
    switch (consent) {
      case 'cons1':
        console.log('API Call to show Consent1 Popup');
        break;
      case 'cons2':
        console.log('API Call to show Consent2 Popup');
        break;
      case 'cons3':
        console.log('API Call to show Consent3 Popup');
        break;
      case 'cons4':
        console.log('API Call to show Consent4 Popup');
        break;
    }
    return false;
  }
}
