import { PipeTransform, Pipe, Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ApiconnectService } from '../services/apiconnect.service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { ModalService } from '../_services';
import { EventEmitter } from 'events';
import { Observable, observable } from "rxjs";
import { element } from 'protractor';
import { EventListener } from '@angular/core/src/debug/debug_node';

interface datatype{
  data: string;
}
@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'mc-consent',
  templateUrl: './mc-consent.component.html',
  styleUrls: ['./mc-consent.component.css','../_content/modal.less'],
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
  legalList: datatype[] = [];
  legalC: string = '';
  @ViewChild('f') form: NgForm;
  
  // emitAfterDataBind: EventEmitter = new EventEmitter();
  // eventlist: EventListener = new EventListener('test', (data) => {
  //   console.log(data);
  // })


  // emitAfterDomBind = new Observable<{element:HTMLElement, url: string}>((observer)=>{
  //   observer.next();
  // });
  // // consentLink: HTMLElement;
  // // consentLinkUrl: string;


  constructor(
    private elm: ElementRef, 
    private apiService: ApiconnectService ,
    private configService: ConfigService,
    private modalService: ModalService) {
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
          //console.log(item)
          var s = item.consentUseData[0].consentData.data;
          var htmlObject = document.createElement('div');
          htmlObject.innerHTML = s;
          const consentLinks = htmlObject.getElementsByTagName("a")
          
          if(consentLinks.length > 0) {
            //console.log(consentLinks);
            for(var i = 0; i< consentLinks.length; i++) {
              
              let linkParameters = consentLinks[i].href.split('/')
              linkParameters.forEach(element => {
               
                //console.log(element)
              });
              if(serviceCode==linkParameters[7] && serviceFunctionCode == linkParameters[9] && 'legalcontent'==linkParameters[6]){
                console.log(consentLinks[i].href);
                htmlObject.querySelectorAll("a[title=\"consentLinks[i].title\"]")
                //console.log(consentLinks[i].title);
                //console.log(linkParameters[6] +linkParameters[7] +linkParameters[9])
                //console.log(consentLinks[i]);
                consentLinks[i].setAttribute("onclick","_getLeagalContent("+consentLinks[i].href+")")
                consentLinks[i].removeAttribute("href")
                //console.log(htmlObject.innerHTML);
              }
            }
          }
          //this.consentList = consentLinks;
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
  openModal(id: string) {
    //console.log(id)
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  _getLeagalContent(){
    
    //console.log('reached')
    //var completeUrl = 'https://stage.services.mastercard.com/dm/content/consentmanagement/legalcontent/mccom/en-us/mccom-sl/pn';
    var completeUrl = 'http://10.44.32.49:8088/WidgetDemo/consent/1.0.0/legalcontent/dp/en-US/dp-reg/pn';
    this.apiService.getResponse(completeUrl).subscribe(response => {
      // response.forEach(item => {
      //   this.legalList.push(item.consentUseData[0].consentData.data);
      // });

       this.legalList.push(response.consentUseData[0].consentData.data);
      // this.legalC = response.consentUseData[0].consentData.data
    })
    this.openModal('custom-modal-1');
  }
}

 

