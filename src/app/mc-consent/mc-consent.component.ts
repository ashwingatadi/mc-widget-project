import { Renderer2, PipeTransform, Pipe, Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation, ViewChild } from '@angular/core';
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
  @Input() mastercardtheme;

  customStyle: Object;
  @Input() data;
  public widgetstylenew;
  private widgetclasses;
  private widgetstyles;
  private widgetclassesSplited: String[];
  private widgetstylesSplited: String[];
  consentList: datatype[] = [];
  legalList: datatype[] = [];
  legalC: string = '';
  @ViewChild('f') form: NgForm;

  private mastercardtheme1;


  constructor(
    private elm: ElementRef,
    private apiService: ApiconnectService ,
    private modalService: ModalService,
    private renderer: Renderer2,
    private configService: ConfigService) {

      this.callAPI = elm.nativeElement.getAttribute('callAPI');
      this.buttonIdForAPICall = elm.nativeElement.getAttribute('buttonIdForAPICall');
      this.width = elm.nativeElement.getAttribute('width');
      this.height = elm.nativeElement.getAttribute('height');
      this.widgetclasses = elm.nativeElement.getAttribute('widgetclasses');
      this.widgetstyles = elm.nativeElement.getAttribute('widgetstyles');
      this.mastercardtheme1 = elm.nativeElement.getAttribute('mastercardtheme');
    /*if (this.widgetstyle !== null || this.widgetstyle !== undefined || this.widgetstyle !== '') {
      console.log(this.widgetstyle);
      console.log(' type of this.widgetstyle');
      console.log(typeof this.widgetstyle);
      this.widgetstyleObj = '{' + this.widgetstyle + '}';
      this.widgetstylenew = JSON.parse(this.widgetstyleObj);
      console.log('this.widgetstylenew');
      console.log(this.widgetstylenew);
      console.log(typeof this.widgetstylenew);
    } else {
    }*/
    var myObj = { "styles":"#WidgetComponent{background:blue;color:white} div#WidgetComponent label{color:pink}"};

    if(this.mastercardtheme1 === 'true'){
      var mastercarddefaultstyle = myObj.styles;
      this.appendStyle(mastercarddefaultstyle);
    }else{
    }
  }

  appendStyle = function (content) {
    /*var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(content));
    this.elm.nativeElement.appendChild(style);*/
    const style = this.renderer.createElement('style');
    const text = this.renderer.createText(content);
    this.renderer.appendChild(style, text);
    this.renderer.appendChild(this.elm.nativeElement, style);
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
  }

  renderStyle(){
    var selectedElemDivAll = this.elm.nativeElement.getElementsByTagName('div');
    var selectedElemDiv = selectedElemDivAll[0];

    if(this.widgetclasses === '' || this.widgetclasses === null || this.widgetclasses === undefined){ }
    else { // validation check for attributes in component definition
      this.widgetclassesSplited = this.widgetclasses.split(' ');
    }

    if(this.widgetstyles === '' || this.widgetstyles === null || this.widgetstyles === undefined) { }
    else { // validation check for attributes in component definition
      this.widgetstylesSplited = this.widgetstyles.split(' ');
    }

    //  Class for individual component elements
    if(this.widgetclassesSplited !== undefined) { // parent block validation
      for (var i = 0; i < this.widgetclassesSplited.length; i++) {

        var idx = this.widgetclassesSplited[i].indexOf('.');
        var element = this.widgetclassesSplited[i].substring(0, idx);
        var elemClass = this.widgetclassesSplited[i].substring(idx + 1, this.widgetclassesSplited[i].length);

        //var currentWidget = document.getElementById('WidgetComponent');  // get component html
        if (element !== 'div') {  // code for non divs
          //var selectedElemNonDiv = currentWidget.querySelectorAll(element);
          var selectedElemNonDiv = this.elm.nativeElement.getElementsByTagName(element);
          if (selectedElemNonDiv.length === 1) { // if only 1 elem
             this.renderer.addClass(selectedElemNonDiv['0'], elemClass);
            //selectedElemNonDiv['0'].classList.add(elemClass);
          }
          else {
            for (var j = 0; j < selectedElemNonDiv.length; j++) {
              // for loop
              var currIdx = selectedElemNonDiv[j];
              this.renderer.addClass(currIdx, elemClass);
              //currIdx.classList.add(elemClass);
            }
          }
        } else { // add class to div parent  element
          this.renderer.addClass(selectedElemDiv, elemClass);
          //selectedElemDiv.classList.add(elemClass);
        }
      }  // for loop end
    } // parent block validation check end

    // Inline style for individual or entire component
    if(this.widgetstyles === '' || this.widgetstyles === null || this.widgetstyles === undefined){ } // validation check for attributes in component definition
    else {
      if(this.widgetstyles.charAt(0) === '{'){
        this.widgetstylenew = this.parseToObject(this.widgetstyles);
      }
      else {
        for (var l = 0; l < this.widgetstylesSplited.length; l++) {
          var idx = this.widgetstylesSplited[l].indexOf('.');

          var element = this.widgetstylesSplited[l].substring(0, idx);
          var elemStyle = this.widgetstylesSplited[l].substring(idx + 1, this.widgetstylesSplited[l].length);
          elemStyle = elemStyle.replace(/[{()}]/g, '');
          //refactor style
          var elemStyleSpilted = elemStyle.split(';');

          if(element.indexOf('#') === -1){
            var currentWidget = document.getElementById('WidgetComponent'); // get component html
            if (element !== 'div') {  // code for non divs
              var selectedElemNonDiv = this.elm.nativeElement.getElementsByTagName(element); // select non
              //var selectedElemNonDiv = currentWidget.querySelectorAll(element);
              if (selectedElemNonDiv.length === 1) { // if only 1 elem
                elemStyleSpilted.forEach(item => {
                  var colunIdx = item.indexOf(':');
                  var stylepop  = item.substring(0, colunIdx); //beforecolun
                  var styleval = item.substring(colunIdx + 1, item.length); //aftercolun
                  this.renderer.setStyle(selectedElemNonDiv['0'], stylepop , styleval );
                });
                //this.renderer.setProperty(selectedElemNonDiv['0'], 'style', elemStyle);
                //selectedElemNonDiv['0'].setAttribute("style", elemStyle);
              } else {
                for (var m = 0; m < selectedElemNonDiv.length; m++) {
                  // for loop
                  var currIdx = selectedElemNonDiv[m];

                  elemStyleSpilted.forEach(item => {
                    var colunIdx = item.indexOf(':');
                    var stylepop  = item.substring(0, colunIdx); //beforecolun
                    var styleval = item.substring(colunIdx + 1, item.length); //aftercolun
                    this.renderer.setStyle(currIdx, stylepop , styleval );
                  });
                  //this.renderer.setProperty(currIdx, 'style', elemStyle);
                  //currIdx.setAttribute("style",elemStyle);
                }
              }
            } else if(element === 'div') { // add style to parent div
              this.renderer.setProperty(selectedElemDiv, 'style', elemStyle);
              //selectedElemDiv.setAttribute("style",elemStyle)
            }
          }else{
            var hashIdx = element.indexOf('#');
            var beforeHashElem = element.substring(0, hashIdx);
            var afterHashElemIdentifier = element.substring(hashIdx + 1, element.length);

            var catchIdentifier = '' + beforeHashElem + '[identifier=' + afterHashElemIdentifier + ']' ;

            var elemFromDom = document.querySelectorAll(catchIdentifier);

            if(elemFromDom.length === 1){
              elemStyleSpilted.forEach(item => {
                var colunIdx = item.indexOf(':');
                var stylepop  = item.substring(0, colunIdx); //beforecolun
                var styleval = item.substring(colunIdx + 1, item.length); //aftercolun
                this.renderer.setStyle(elemFromDom['0'], stylepop , styleval );
              });
              //this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
              //this.renderer.setProperty(elemFromDom['0'], 'style', elemStyle);
            }else{
              for(var e=0;e<elemFromDom.length;e++){
                  elemStyleSpilted.forEach(itemy => {
                  var colunIdx = itemy.indexOf(':');
                  var stylepop  = itemy.substring(0, colunIdx); //beforecolun
                  var styleval = itemy.substring(colunIdx + 1, itemy.length); //aftercolun
                  this.renderer.setStyle(elemFromDom[e], stylepop , styleval );
                });
              }
            }
          }
        } // end of foor loop
      } // end of 2nd else  loop
    } // end of 1st main else  loop

  }

  ngAfterContentChecked(){
    this.renderStyle();
    // alert('ngAfterContentChecked');
  }
  onSubmitClick(event) {
    console.log(this.form.value);
  }

  parseToObject(str: string){
    str = str.replace(/[{()}]/g, '');

    let splStr: string[] = str.split(';');
    var keys = [];
    var vals = [];
    var num = 0;
    let frmtedStr: string = '';

    splStr.forEach(str => {
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
    return this.customStyle;
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



