import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ConfigService {
  configData;
  constructor(private http: Http) {}

  getConfigData(): Observable<any>
  {
    return this.http.get('appConfig.json');
  }
}
