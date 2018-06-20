import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ConfigService } from '../services/config.service';
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
  @Input() width: string;
  @Input() height: string;
  @Input() styleType: string = 'priceless';
  consentList: datatype[] = [];
  constructor(
    private elm: ElementRef, 
    private apiService: ApiconnectService ,
    private configService: ConfigService) {
      this.callAPI = elm.nativeElement.getAttribute('callAPI');
      this.buttonIdForAPICall = elm.nativeElement.getAttribute('buttonIdForAPICall');
      this.width = elm.nativeElement.getAttribute('width');
      this.height = elm.nativeElement.getAttribute('height');
      this.styleType = elm.nativeElement.getAttribute('styleType');
  }

  ngOnInit() {
    this.configService.getConfigData().subscribe(confData => {
      var jsonData = JSON.parse(confData._body);
      var serviceCode = jsonData.consent.api.serviceCode;
      var locale = jsonData.consent.api.locale;
      var serviceFunctionCode = jsonData.consent.api.serviceFunctionCode;
      var url = jsonData.consent.api.url;
      var completeUrl = url + `${serviceCode}/${locale}/${serviceFunctionCode}`;
      this.apiService.getResponse(completeUrl).subscribe(response => {
        response.forEach(item => {
          this.consentList.push(item.consentUseData[0].consentData.data);
        });
      })
    })
  }

  ngAfterViewInit() {
    if (this.callAPI) {
      var element = document.getElementById(this.buttonIdForAPICall);
      element ? element.addEventListener('click', this.onSubmitClick.bind(this)) : false;
    }

  }

  onSubmitClick(event) {
   
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
