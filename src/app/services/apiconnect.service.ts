import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consent} from '../mc-consent/consent.model';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService} from './config.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ApiconnectService {

  
  //apiUrl: string; 

  constructor(private http: HttpClient, private configService: ConfigService) {
    //this.getResponse();
  }

  getResponse (url): Observable<any> {
  //   this.configService.getConfigData().subscribe((data)=>{
  //     var jsonData = JSON.parse(data._body);
      
  //     var serviceCode = jsonData.consent.api.serviceCode;
  //     var locale = jsonData.consent.api.locale;
  //     var serviceFunctionCode = jsonData.consent.api.serviceFunctionCode;
  //     var url = jsonData.consent.api.url;
  //     var completeUrl = url + `${serviceCode}/${locale}/${serviceFunctionCode}`;
  //     this.apiUrl = completeUrl;
  //     //console.log(this.apiUrl);
  //     return this.http.get(this.apiUrl)
  // });
  //   //console.log(this.apiUrl);
     return this.http.get(url);
  }
  
    /** POST: create a new consent to the database */
  createConsent (consent: Consent, url: string): Observable<Consent> {
    return this.http.post<Consent>(url, consent, httpOptions)
      .pipe(
        catchError(this.configService.handleError)
      );
  }

}
