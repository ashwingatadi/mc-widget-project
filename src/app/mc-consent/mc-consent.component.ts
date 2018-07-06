import { Renderer2, PipeTransform, Pipe, Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation, ViewChild, AfterViewChecked, Output } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ApiconnectService } from '../services/apiconnect.service';
import { NgForm } from '@angular/forms';

import { ModalService } from '../services/modal.service';
import { EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';



interface datatype{
  data: string;
}
// @Pipe({ name: 'safeHtml'})
// export class SafeHtmlPipe implements PipeTransform  {
//   constructor(private sanitized: DomSanitizer) {}
//   transform(value) {
//     return this.sanitized.bypassSecurityTrustHtml(value);
//   }
// }
@Component({
  selector: 'mc-consent',
  templateUrl: './mc-consent.component.html',
  styleUrls: ['./mc-consent.component.css','../modal/modal.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class McConsentComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private listenerAdded: boolean = false;
  @Input() callAPI: boolean = false;
  @Input() buttonIdForAPICall: string;
  @Input() frmName: string;
  @Input() width: string;
  @Input() height: string;
  @Input() mastercardtheme;
  @Output() bindEvent: EventEmitter<{aTag: any}>= new EventEmitter();
  locale: string;
  filter : boolean = false;
  private sc: string;
  private sfc: string;
  private userCategoryCode: string;


  private checkAfterInitFlag: boolean = false;
  consentElement: HTMLElement;

  url: string;
  //public defaultLocale: string = 'en-US';
  customStyle: Object;
  @Input() data;
  public widgetstylenew;
  private widgetclasses;
  private widgetstyles;
  private widgetclassesSplited: String[];
  private widgetstylesSplited: String[];
  consentList: any[][] = [[]];
  legalList: datatype[] = [];
  legalC: string = '';
  public loadDefaultTheme;
  public loadDefaultThemeConfigured;
  @ViewChild('f') form: NgForm;
  public consentErr = false;
  private mastercardtheme1;


  constructor(
    private elm: ElementRef,
    private apiService: ApiconnectService ,
    private modalService: ModalService,
    private renderer: Renderer2,
    private configService: ConfigService) {

      this.callAPI = elm.nativeElement.getAttribute('call-api');
      this.buttonIdForAPICall = elm.nativeElement.getAttribute('button-id');
      this.width = elm.nativeElement.getAttribute('width');
      this.height = elm.nativeElement.getAttribute('height');
      this.locale = elm.nativeElement.getAttribute('locale');

      this.loadDefaultThemeConfigured = elm.nativeElement.getAttribute('default-theme');
      this.widgetclasses = elm.nativeElement.getAttribute('widget-class');
      this.widgetstyles = elm.nativeElement.getAttribute('widget-style');
      if(this.loadDefaultThemeConfigured === 'true'){
        this.widgetclasses = '';
        this.widgetstyles = '';
      }else{}
    /*if(this.loadDefaultTheme === 'true'){
      this.widgetclasses = '';
      this.widgetstyles = '';
      this.renderer.setAttribute(elm.nativeElement, 'defaultTheme', 'true');
    }else{
      this.widgetclasses = elm.nativeElement.getAttribute('widget-class');
      this.widgetstyles = elm.nativeElement.getAttribute('widget-style');
    }*/
      this.frmName = elm.nativeElement.getAttribute('form-name');
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
    /*var myObj = { "styles":"#WidgetComponent{background:blue;color:white} div#WidgetComponent label{color:pink}"};

    if(this.mastercardtheme1 === 'true'){
      var mastercarddefaultstyle = myObj.styles;
      this.appendStyle(mastercarddefaultstyle);
    }else{
    }*/
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
      var serviceCode = jsonData.consent.serviceCode;
      var serviceFunctionCode = jsonData.consent.serviceFunctionCode;
      //this.loadDefaultTheme = jsonData.selectTheme.loadDefaultTheme;

      this.sc = serviceCode;
      this.sfc = serviceFunctionCode;
      //this.userCategoryCode = jsonData.userCategoryCode.mandatory[]

      var url = environment.baseUrl + 'consentlanguage/';
      var completeUrl = url + `${serviceCode}/${this.locale}/${serviceFunctionCode}`;
      this.apiService.getResponse(completeUrl).subscribe(response => {
        response.forEach((item, index) => {
          
          this.consentList[index] = [];
          // var s = item.consentUseData[0].consentData.data;
           this.consentList[index]['linkData'] = item.consentUseData[0].consentData.data;
           var apiUserCategoryCode = item.consentUseData[0].useCategory.useCategoryCode;
           this.consentList[index]['isRequired'] = jsonData.userCategoryCode.mandatory.includes(apiUserCategoryCode);
          //console.log(jsonData.userCategoryCode.mandatory.includes(apiUserCategoryCode));
          
          //this.consentList.push(htmlObject.innerHTML.toString());
        });
      })
    }) 
    console.log(this.consentList);
  }

  onBindEvent(eData){
    //debugger;
    //console.log(eData);
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
      this.widgetclassesSplited = this.widgetclasses.split(',');
    }

    if(this.widgetstyles === '' || this.widgetstyles === null || this.widgetstyles === undefined) { }
    else { // validation check for attributes in component definition
      this.widgetstylesSplited = this.widgetstyles.split(',');
      
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
          var popupElementClass = document.querySelector("div[model-dentifier='identifymodal']");
          if(popupElementClass){
            this.renderer.addClass(popupElementClass, elemClass);
          }else{

          }
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
              var popupElementStyle = document.querySelector("div[model-dentifier='identifymodal']");
              if(popupElementStyle){
                this.renderer.setProperty(popupElementStyle,'style',elemStyle);
              }else{

              }
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
    var anchors = this.elm.nativeElement.getElementsByTagName('a');
    //console.log(anchors);
    if(anchors.length >0 && !this.listenerAdded)
      {
        this.listenerAdded = true;
        for(var i=0;i<anchors.length; i++){
            let href:string = anchors[i].href;;
            let urlArr: string[] = href.substring(href.indexOf('legalcontent'), href.length).split('/');
            console.log(anchors[i].href);
            if(urlArr[0].toLowerCase() == 'legalcontent' && urlArr[1].toLowerCase() == this.sc &&  urlArr[3].toLowerCase() == this.sfc){
              anchors[i].removeAttribute("href");
              //anchors[i].setAttribute("required","true");
              anchors[i].addEventListener('click',this.anchorevent.bind(this, href));  
            }
          }
        }

    if((this.widgetclasses === '' || this.widgetclasses === null || this.widgetclasses === undefined) && (this.widgetstyles === '' || this.widgetstyles === null || this.widgetstyles === undefined)){
      this.loadDefaultTheme = true;
    }else{}
          // we have to use the href property of the anchor to manipulate the click event.
  }
 
  anchorevent = function(url: string) {
        
        var completeUrl = url;
        this.apiService.getResponse(completeUrl).subscribe(response => {
         this.legalList.push(response.consentUseData[0].consentData.data);
        })
        this.openModal('custom-modal-1');
        
   
}
  onSubmitClick(event) {
    //console.log(this.form.value);
    //console.log(this.frmName); //return false;
    //var frmName = document.forms[1];//.getElementById(this.frmName);
    
    var frmName = (<HTMLInputElement>document.getElementById(this.frmName));
    //var frmName = document.forms[this.frmName];
    
    console.log(frmName);
    console.log(frmName.checkValidity() + " checking checkValidity");
    if(frmName.checkValidity()) {
      this.consentErr = false;
      //console.log(this.form);
      //document.getElementById("errorConcent").style.color = "black";
      if(!this.form.valid) {
        //document.getElementById("")
        this.consentErr = true;
        //document.getElementById("errorConcent").style.color = "red";
        event.preventDefault();
        event.stopPropagation();
         
       } 
     }
  }
  focusOutFunction(event: any){
    console.log('focusout');
    //this.onSubmitClick(event);
    var frmName = (<HTMLInputElement>document.getElementById(this.frmName));
    console.log(frmName.checkValidity() + " checkValidity")
    if(frmName.checkValidity()) {

      this.consentErr = false;
      //document.getElementById("errorConcent").style.color = "black";
      if(!this.form.valid) {
        //document.getElementById("")
        this.consentErr = true;
        //document.getElementById("errorConcent").style.color = "red";
        event.preventDefault();
        event.stopPropagation();
         
       } 
     }
    
  }
  onFilterChange(eve: any) {
    console.log('checkboxclick');
    this.consentErr = false;
    // this.filter = !this.filter;
    // if(this.filter == false) {
    //document.getElementById("errorConcent").style.color = "black";

   // }
    //this.onSubmitClick(event);
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

  ngAfterViewChecked(){
    // if(this.checkAfterInitFlag){
    //   //debugger;
      
    //   this.consentElement.removeAttribute('href');
    //   this.consentElement.addEventListener('click', this._getLeagalContent.bind(this, this.url));
    //   console.log(this.consentElement);
    //   this.checkAfterInitFlag = false;
    // }

    if(this.checkAfterInitFlag){
      //debugger;
      
      this.consentElement.removeAttribute('href');
      this.consentElement.addEventListener('click', this._getLeagalContent.bind(this, this.url));
      //console.log(this.consentElement);
      this.checkAfterInitFlag = false;
    }
    
  }

  _getLeagalContent(url: string){
    console.log(url);
    //console.log('reached')
    //var completeUrl = 'https://stage.services.mastercard.com/dm/content/consentmanagement/legalcontent/mccom/en-us/mccom-sl/pn';
    var completeUrl = 'http://10.44.32.49:8088/WidgetDemo/consent/1.0.0/legalcontent/dp/en-US/dp-reg/pn';//url; 
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



