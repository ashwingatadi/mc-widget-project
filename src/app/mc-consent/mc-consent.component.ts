import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-consent',
  templateUrl: './mc-consent.component.html',
  styleUrls: ['./mc-consent.component.css']
})
export class McConsentComponent implements OnInit, AfterViewInit {
  callAPI: boolean = false;
  buttonIdForAPICall: string;

  constructor(private elm: ElementRef, private configService: ConfigService) {
    this.callAPI = elm.nativeElement.getAttribute('callAPI');
    this.buttonIdForAPICall = elm.nativeElement.getAttribute('buttonIdForAPICall');
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.callAPI) {
      var element = document.getElementById(this.buttonIdForAPICall);
      element.addEventListener('click', this.onSubmitClick.bind(this));
    }

  }

  onSubmitClick(event) {
    console.log('This is the event triggered outside');
    // console.log(event);
  }

  readConfigData(){
    this.configService.getConfigData().subscribe(
      data => {
        var dat = JSON.parse(data._body);
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
