import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private externalService: ConfigService) {
    //translate.setDefaultLang('en');
  }

  

  ngOnInit() {
    this.externalService.getConfigData().subscribe(data => {
      console.log(data._body);
      var dat = JSON.parse(data._body);
      // var lang = dat.lang.value;
      // this.switchLang(lang)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

  }
}
