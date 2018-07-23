import { ApiconnectService } from '../services/apiconnect.service';
import { ConfigService } from '../services/config.service';
import { Consent } from './consent.model';
import { EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoggingService } from '../services/logging.service';
import { ModalService } from '../services/modal.service';
import { NgForm } from '@angular/forms';
import { RenderStyleService } from '../services/renderstyle.service';
import { Renderer2, PipeTransform, Pipe, Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation, ViewChild, AfterViewChecked, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface datatype {
  data: string;
}

@Component({
  selector: 'mc-consent',
  templateUrl: './mc-consent.component.html',
  styleUrls: ['./mc-consent.component.css', '../modal/modal.component.less'],
  encapsulation: ViewEncapsulation.None

})
export class McConsentComponent implements OnInit, AfterViewInit {
  private listenerAdded: boolean = false;
   callAPI: boolean = false;
   buttonIdForAPICall: string;
   userIdForCreateConsent: string;
   frmName: string;
   width: string;
   height: string;
   mastercardtheme;
  @Output() bindEvent: EventEmitter<{ aTag: any }> = new EventEmitter();
  locale: string;
  filter: boolean = false;
  private sc: string;
  private sfc: string;
  private userCategoryCode: string;
  consentElement: HTMLElement;
  private appConfigData: Object = {};
  url: string;
  customStyle: Object;
  @Input() data;
  public widgetstylenew;
  private widgetclasses;
  private widgetstyles;
  private widgetclassesSplited: String[];
  private widgetstylesSplited: String[];
  consentList: any = [];
  _jsonObj: any[] = [];
  legalList: datatype[] = [];
  legalC: string = '';
  public userSelectedConsent: any[][] = [[]];
  stingAlert: string = "";
  private isParentFormSubmitted: boolean = false;
  public loadDefaultTheme;
  public loadDefaultThemeConfigured;
  @ViewChild('f') form: NgForm;
  public consentErr = false;
  private mastercardtheme1;

  constructor(
    private elm: ElementRef,
    private apiService: ApiconnectService,
    private modalService: ModalService,
    private renderer: Renderer2,
    private configService: ConfigService,
    private LoggingService: LoggingService,
    private translate: TranslateService,
    private  renderstyleservice : RenderStyleService) {


    this.callAPI = elm.nativeElement.getAttribute('call-api');
    this.buttonIdForAPICall = elm.nativeElement.getAttribute('button-id');
    this.userIdForCreateConsent = elm.nativeElement.getAttribute('username-id');
    this.width = elm.nativeElement.getAttribute('width');
    this.height = elm.nativeElement.getAttribute('height');
    this.locale = elm.nativeElement.getAttribute('locale');

    this.loadDefaultThemeConfigured = elm.nativeElement.getAttribute('default-theme');
    this.widgetclasses = elm.nativeElement.getAttribute('widget-class');
    this.widgetstyles = elm.nativeElement.getAttribute('widget-style');
    if (this.loadDefaultThemeConfigured === 'true') {
      this.widgetclasses = '';
      this.widgetstyles = '';
    }

    this.frmName = elm.nativeElement.getAttribute('form-name');

  }

  appendStyle = function (content) {
    const style = this.renderer.createElement('style');
    const text = this.renderer.createText(content);
    this.renderer.appendChild(style, text);
    this.renderer.appendChild(this.elm.nativeElement, style);
  }

  ngOnInit() {
    this.configService.getConfigData().subscribe(confData => {
      var jsonData = JSON.parse(confData._body);
      var serviceCode = jsonData.consent.inboundapi.serviceCode;
      var serviceFunctionCode = jsonData.consent.inboundapi.serviceFunctionCode;
      this.appConfigData = jsonData;
      //this.loadDefaultTheme = jsonData.selectTheme.loadDefaultTheme;

      this.sc = serviceCode;
      this.sfc = serviceFunctionCode;


      var url = environment.baseUrl + 'consentlanguage/';
      var completeUrl = url + `${serviceCode}/${this.locale}/${serviceFunctionCode}`;
      this.apiService.getResponse(completeUrl).subscribe(response => {
        response.forEach((item, index) => {

          var apiUserCategoryCode = item.consentUseData[0].useCategory.useCategoryCode;

          var _tmpConsentList = {
            'linkData': item.consentUseData[0].consentData.data,
            'isRequired': this.checkIsRequired(jsonData.consent.consentlanguage.userCategoryCode.mandatory, apiUserCategoryCode, index, response.length - 1),
            'uuid': item.uuid,
            'currentVersion': item.currentVersion,
            'serviceCode': item.serviceCode,
            'serviceFunctionCode': item.serviceFunctionCode
          }
          this.consentList.push(_tmpConsentList);

        });
        // Keep isRequired on top 
        this.consentList.sort(this.compare)
      },
        err => { },
        () => {
          if(this.consentList.length > 1) {
            // capturing read only consent meta data forcefuly...
            this.onFilterChange(true, this.consentList[this.consentList.length - 1], this.consentList.length - 1);
          }
        });
    });

  }

  compare(a, b) {
    //return (a.isRequired === b.isRequired)? 0 : a? 1 : -1;
    if (a.isRequired > b.isRequired)
      return -1;
    if (a.isRequired < b.isRequired)
      return 1;
    return 0;
  }
  checkIsRequired(data, param, index: number, tempLen: number) {
    if (index === tempLen) {
      // for the last consent 
      return false;
    }
    if (data.indexOf(param) === -1) {
      return false;
    } else {
      return true;
    }
  }


  onBindEvent(eData) {
    //debugger;
  }

  ngAfterViewInit() {
    if (this.callAPI) {
      var element = document.getElementById(this.buttonIdForAPICall);
      element ? element.addEventListener('click', this.onSubmitClick.bind(this)) : false;
    }
  }



  ngAfterContentChecked() {
    this.widgetstylenew = this.renderstyleservice.renderStyle(this.elm.nativeElement,this.widgetclasses,this.widgetstyles,this.renderer);
    var anchors = this.elm.nativeElement.getElementsByTagName('a');
    //console.log(anchors);
    if (anchors.length > 0 && !this.listenerAdded) {
      this.listenerAdded = true;
      for (var i = 0; i < anchors.length; i++) {
        let href: string = anchors[i].href;
        //let urlArr: string[] = href.substring(href.indexOf('legalcontent'), href.length).split('/');
        var anchor = anchors[i];
        //console.log(anchor);
        // if (urlArr[0].toLowerCase() == 'legalcontent' && urlArr[1].toLowerCase() == this.sc && urlArr[3].toLowerCase() == this.sfc) {
        //   anchors[i].removeAttribute("href");
        //   anchors[i].addEventListener('click', this.anchorevent.bind(this, href));
        // }

        if (href != undefined) {
          var _consentLink = this.appConfigData["consent"].legalContent[href];
          if (_consentLink && _consentLink["isOverlay"] == true) {
            // open in overlay
            // remove href and target 
            anchor.addEventListener('click', this.anchorevent.bind(this, href));
            (anchor.hasAttribute("href")) ? anchor.setAttribute("href", "javascript:void(0)") : '';
            (anchor.hasAttribute("target")) ? anchor.removeAttribute("target") : '';
            //this.LoggingService.printLog('open in overlay');

          } else {
            // open in tab
            // check _target is already set or not
            (!anchor.hasAttribute("target")) ? anchor.setAttribute("target", "_blank") : '';

            //this.LoggingService.printLog('open in tab');
          }
        }
      }
    }

    if ((this.widgetclasses === '' || this.widgetclasses === null || this.widgetclasses === undefined) && (this.widgetstyles === '' || this.widgetstyles === null || this.widgetstyles === undefined)) {
      this.loadDefaultTheme = true;
    }
    // we have to use the href property of the anchor to manipulate the click event.
  }

  anchorevent = function (url: string) {

    //var completeUrl = url;
    // this.apiService.getResponse(completeUrl).subscribe(response => {
    //   this.legalList.push(response.consentUseData[0].consentData.data);
    // })

    var iframeSrc = document.getElementById("ifrOverlay");
    // set Iframe URL
    iframeSrc.setAttribute("src", url);
    this.openModal('custom-modal-1');

  }
  callValid(index: number) {
    var frmName = (<HTMLInputElement>document.getElementById(this.frmName));
    if (frmName.checkValidity()) {
      if (!this.form.valid) {
        if (this.isParentFormSubmitted === true) {
          var currConsent = 'consent' + index;
          if (this.form.controls[currConsent].status === 'INVALID' && this.consentErr != false) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }
  onSubmitClick(event) {

    this.isParentFormSubmitted = true;
    var frmName = (<HTMLInputElement>document.getElementById(this.frmName));
    if (frmName.checkValidity()) {
      this.consentErr = false;
      if (!this.form.valid) {
        this.consentErr = true;
        event.preventDefault();
        event.stopPropagation();

      } else {

        var _createConsentQueryString = {};
        this.stingAlert = '';
        _createConsentQueryString["consentData"] = [];
        this.userSelectedConsent.forEach((item, index) => {

          this.stingAlert = this.stingAlert + "<br>Consent UUID: " + item["uuid"] +
            "<br> Version: " + item["currentVersion"] +
            "<br> Service code: " + item["serviceCode"] +
            "<br> Service function code: " + item["serviceFunctionCode"] +
            "<br> -------------------------------------------";
          _createConsentQueryString["consentData"].push(item);
          if (item["legalConsentMeta"]) {

            item["legalConsentMeta"].forEach((item) => {
              item.isRequired = false;
              item.linkData = "";

              this.stingAlert = this.stingAlert + "<br>Legal content UUID: " + item["uuid"] +
                "<br> Version: " + item["currentVersion"] +
                "<br> Service code: " + item["serviceCode"] +
                "<br> Service function code: " + item["serviceFunctionCode"] +
                "<br> -------------------------------------------";
              _createConsentQueryString["consentData"].push(item);
            });

          }

        });

        const userIdForCreateConsent = <HTMLInputElement>document.getElementById(this.userIdForCreateConsent);
        _createConsentQueryString["programId"] = this.appConfigData["programId"];
        _createConsentQueryString["tenantId"] = this.appConfigData["tenantId"];
        _createConsentQueryString["recordId"] = "0000";
        _createConsentQueryString["userId"] = userIdForCreateConsent.value;
        this.stingAlert = "<br> Email: " + userIdForCreateConsent.value + this.stingAlert;

        this.openModal('custom-modal-2');
        this.LoggingService.printLog(_createConsentQueryString);
        this.apiService.createConsent(<Consent>_createConsentQueryString, this.appConfigData["consent"].createConsent)
          .subscribe(createConsentResponse => {

            this.LoggingService.printLog(createConsentResponse);
          }, error => {

          }, () => {

            this.LoggingService.printLog("create consent api call complete");
            //document.forms[this.frmName].submit();
          });
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  focusOutFunction(event: any) {
    var frmName = (<HTMLInputElement>document.getElementById(this.frmName));
    if (frmName.checkValidity()) {
      this.consentErr = false;
      if (!this.form.valid) {
        this.consentErr = true;
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  onFilterChange(eve: boolean, data: any[], index: number) {
    this.consentErr = false;
    this.filter = !this.filter;
    if (eve == false) {
      delete this.userSelectedConsent[index];
      //this.LoggingService.printLog("pop action");

    } else {
      this.userSelectedConsent[index] = [];
      this._jsonObj = [];
      const _consentText = data['linkData'];
      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = _consentText;
      const consentLinks = htmlObject.getElementsByTagName("a")
      if (consentLinks.length > 0) {
        for (var i = 0; i < consentLinks.length; i++) {
          let linkParameters = consentLinks[i].href;
          if (linkParameters != undefined) {

            if (this.appConfigData["consent"].legalContent[linkParameters]) {
              //var _consentLink = this.appConfigData["consent"].legalContent[linkParameters];
              var _legalContentLink = environment.baseUrl + 'legalcontent/';
              var serviceCode = this.appConfigData["consent"].legalContent[linkParameters].sc;
              var serviceFunctionCode = this.appConfigData["consent"].legalContent[linkParameters].sfc;
              var useCategoryCode = this.appConfigData["consent"].legalContent[linkParameters].sfc;
              var completeUrl = _legalContentLink + `${serviceCode}/${this.locale}/${serviceFunctionCode}/${useCategoryCode}`;
              this.apiService.getResponse(completeUrl).subscribe(response => {

                this._jsonObj.push({
                  "uuid": response.uuid,
                  "currentVersion": response.currentVersion,
                  "serviceCode": response.serviceCode,
                  "serviceFunctionCode": response.serviceFunctionCode
                });
                data['legalConsentMeta'] = this._jsonObj;
              });
            }

          }
        }
      }
      this.userSelectedConsent[index] = data;
      //this.LoggingService.printLog(this.userSelectedConsent);
    }
  }

/*
  parseToObject(str: string) {
    str = str.replace(/[{()}]/g, '');

    let splStr: string[] = str.split(';');
    var keys = [];
    var vals = [];
    var num = 0;
    let frmtedStr: string = '';

    splStr.forEach(str => {
      if (str) {
        let stlSpl = str.split(":");
        keys.push(stlSpl[0]);
        vals.push(stlSpl[1]);
        num++;
      }
    });

    frmtedStr = frmtedStr + "{";
    for (let i = 0; i < num; i++) {
      frmtedStr = frmtedStr + "\"" + keys[i].trim() + "\":\"" + vals[i].trim() + "\"";
      if (i != num - 1) {
        frmtedStr = frmtedStr + ",";
      }
    }
    frmtedStr = frmtedStr + "}";
    this.customStyle = JSON.parse(frmtedStr);
    return this.customStyle;
  }
*/

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}



