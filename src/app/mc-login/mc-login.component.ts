import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-login',
  templateUrl: './mc-login.component.html',
  styleUrls: ['./mc-login.component.css']
})
export class McLoginComponent implements OnInit {

  constructor(private configService: ConfigService,private router:Router) { }

  NavigateToSignUp(){
    this.router.navigateByUrl('/signup', { skipLocationChange: true });
  }

  ngOnInit() {
    /*this.configService.getConfigData().subscribe(confData => {
      var jsonData = JSON.parse(confData._body);
      var serviceCode = jsonData.consent.inboundapi.serviceCode;
      var serviceFunctionCode = jsonData.consent.inboundapi.serviceFunctionCode;
      console.log('jsonData');
      console.log(jsonData);
      this.appConfigData = jsonData;
      //this.loadDefaultTheme = jsonData.selectTheme.loadDefaultTheme;

      this.sc = serviceCode;
      this.sfc = serviceFunctionCode;
      //this.userCategoryCode = jsonData.userCategoryCode.mandatory[]

      var url = environment.baseUrl + 'consentlanguage/';
      var completeUrl = url + `${serviceCode}/${this.locale}/${serviceFunctionCode}`;
      this.apiService.getResponse(completeUrl).subscribe(response => {
        response.forEach((item, index) => {

          // this.consentList[index] = [];
          // // var s = item.consentUseData[0].consentData.data;
          // this.consentList[index]['linkData'] = item.consentUseData[0].consentData.data;
          var apiUserCategoryCode = item.consentUseData[0].useCategory.useCategoryCode;
          // this.consentList[index]['isRequired'] = jsonData.consent.consentlanguage.userCategoryCode.mandatory.includes(apiUserCategoryCode);
          // this.consentList[index]['uuid'] = item.uuid;
          // this.consentList[index]['currentVersion'] = item.currentVersion;
          // this.consentList[index]['serviceCode'] = item.serviceCode;
          // this.consentList[index]['serviceFunctionCode'] = item.serviceFunctionCode;
          var _tmpConsentList = {
            'linkData': item.consentUseData[0].consentData.data,
            'isRequired': this.checkIsRequired(jsonData.consent.consentlanguage.userCategoryCode.mandatory,apiUserCategoryCode),
            'uuid': item.uuid,
            'currentVersion': item.currentVersion,
            'serviceCode': item.serviceCode,
            'serviceFunctionCode': item.serviceFunctionCode
          }
          //console.log(jsonData.userCategoryCode.mandatory.includes(apiUserCategoryCode));

          this.consentList.push(_tmpConsentList);
        });
      })
    })*/
  }

}
