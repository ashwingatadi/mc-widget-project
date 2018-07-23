import { Consent } from '../mc-consent/consent.model';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ApiconnectService {

  //apiUrl: string; 
  constructor(private configService: ConfigService, private http: HttpClient) { }

  getResponse(url): Observable<any> {
    return this.http.get(url);
  }

  /** POST: create a new consent to the database */
  createConsent(consent: Consent, url: string): Observable<Consent> {
    return this.http.post<Consent>(url, consent, httpOptions)
      .pipe(
      catchError(this.configService.handleError)
      );
  }

}
