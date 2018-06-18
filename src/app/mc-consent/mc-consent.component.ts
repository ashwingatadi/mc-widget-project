import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-consent',
  templateUrl: './mc-consent.component.html',
  styleUrls: ['./mc-consent.component.css']
})
export class McConsentComponent implements OnInit, AfterViewInit {
  @Input() callAPI: boolean = false;
  @Input() buttonIdForAPICall: string;
  @Input() apiKey: string;
  @Input() mcConsentWidth: string;
  @Input() mcConsentHeight: string;

  constructor(private elm: ElementRef, private configService: ConfigService) {
    this.callAPI = elm.nativeElement.getAttribute('callAPI');
    this.buttonIdForAPICall = elm.nativeElement.getAttribute('buttonIdForAPICall');
    this.apiKey = elm.nativeElement.getAttribute('apiKey');
    this.mcConsentWidth = elm.nativeElement.getAttribute('mcConsentWidth');
    this.mcConsentHeight = elm.nativeElement.getAttribute('mcConsentHeight');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //console.log(this.callAPI);
    if (this.callAPI) {
      var element = document.getElementById(this.buttonIdForAPICall);
      element?element.addEventListener('click', this.onSubmitClick.bind(this)):false;
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
      })
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
