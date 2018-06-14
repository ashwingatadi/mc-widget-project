import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ConfigService } from './../services/config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'mc-signup',
  templateUrl: './mc-signup.component.html',
  styleUrls: ['./mc-signup.component.css']
})
export class McSignupComponent implements OnInit, AfterViewInit {
  useConsent:boolean; 
  configData:any; 


  constructor(private configService:ConfigService, private elm: ElementRef) {
    this.configService.getConfigData().subscribe(data => {
      //console.log(data._body);
      var dat = JSON.parse(data._body);

      this.useConsent = elm.nativeElement.getAttribute('useConsent');
      console.log(this.useConsent);


      // var consent = dat.signup.useConsent;
      // this.useConsent = consent == 1;
      // console.log(this.useConsent);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })
   }
   
ngOnInit(){
  console.log(this.useConsent);
}

ngAfterViewInit(){
  //console.log(this.useConsent);
}
  

}
