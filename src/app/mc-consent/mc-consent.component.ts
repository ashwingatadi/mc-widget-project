import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ApiconnectService } from '../services/apiconnect.service';
import { NgForm } from '@angular/forms';
import { NgStyle} from '@angular/common';

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
  @Input() style: string;
  customStyle: Object;
  consentList: datatype[] = [];
  @ViewChild('f') form: NgForm;

  constructor(
    private elm: ElementRef, 
    private apiService: ApiconnectService ,
    private configService: ConfigService) {
      this.callAPI = elm.nativeElement.getAttribute('callAPI');
      this.buttonIdForAPICall = elm.nativeElement.getAttribute('buttonIdForAPICall');
      this.width = elm.nativeElement.getAttribute('width');
      this.height = elm.nativeElement.getAttribute('height');
      this.style = elm.nativeElement.getAttribute('style');

      
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

    //debugger;
    if(this.style){
      //this.customStyle = JSON.parse(this.style);
      //console.log(this.customStyle);
        this.parseToObject(this.style);
        // var str = '{' + this.style + '}'; 
        // this.customStyle = Object(this.style);
        // console.log(this.customStyle);
    }
    
  }

  onSubmitClick(event) {
    console.log(this.form.value);
  }

  parseToObject(str: string){
    //console.log(str);
    let splStr: string[] = str.split(';')
    var keys = [];
    var vals = [];
    var num = 0;
    let frmtedStr: string = '';

    splStr.forEach(str => {
      console.log(str);
      if(str){
        let stlSpl = str.split(":");
        keys.push(stlSpl[0]);
        vals.push(stlSpl[1]);
        num++;
      }
      
    });

    frmtedStr = frmtedStr + "{";
    for(let i =0; i<num; i++){
      frmtedStr = frmtedStr + "\"" + keys[i].trim() + "\":\"" + vals[i].trim() + "\"";
      if(i!=num-1){
        frmtedStr = frmtedStr + ",";
      }
    }
    frmtedStr = frmtedStr + "}";
    this.customStyle = JSON.parse(frmtedStr);
    console.log(JSON.parse(frmtedStr));
  }
}

 

