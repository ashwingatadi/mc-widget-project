import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiconnectService {

  //apiUrl: string; 

  constructor(private http: HttpClient) {
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
}
