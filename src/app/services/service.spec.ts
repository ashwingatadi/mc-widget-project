import { ApiconnectService } from '../services/apiconnect.service';
import { ConfigService } from '../services/config.service';
import { Http } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

type Data = {
    [name: string]: any;
};


describe('McConsentModule', () => {
  let configService:ConfigService; 
  let httpServiceSpy: jasmine.SpyObj<Http>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let jsonData: any = 'default value of json data'

 

  const httpGetObj = jasmine.createSpyObj('Http', ['get']);


  beforeEach(() => {
    TestBed.configureTestingModule(
        { 
            providers: [ConfigService,{ provide: Http, useValue: httpGetObj }],
            imports: [ HttpClientTestingModule ]
        }
    );

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    console.log(httpClient); 
    console.log('before the call')

    

  });               // end of before each 


  it('Test - Config Service', () => {
    
    configService = TestBed.get(ConfigService);
    httpServiceSpy = TestBed.get(Http);
    
    
    httpClient.get<Data>('http://localhost/HelloApp/testconfig.json').subscribe(
        data => {console.log(data);},
        err => {console.log("Error occured." + err)}
    ); 
   
    
    
    console.log('after the call')
    console.log(jsonData); 
    const expectedValue = 'test data';
    const actualValue = 'test data';
    //const expectedValue =  '{"consent":{"inboundapi":{"serviceCode":"pc","serviceFunctionCode":"pc-reg"},"consentlanguage":{"userCategoryCode":{"mandatory": ["em", "tc", "tu"]}},"legalContent":{"version":"1.0","https://www.priceless.com/privacy": "http://10.44.21.6:8088/WidgetDemo/consent/1.0.0/legalcontent/pc/en-US/pc-reg/pn","https://www.priceless.com/terms/en_us?languageId=1": "http://10.44.21.6:8088/WidgetDemo/consent/1.0.0/legalcontent/dp/en-US/dp-reg/pn"}}}'; 
    
    httpServiceSpy.get.and.returnValue(expectedValue);
    

    expect(configService.getConfigData())
    .toBe(actualValue, 'service returned stub value');

    // this is the test data, should always work to begin with. 
    //expect('real value').toBe('real value');
  });               // end of it     
  
  it('Test Dummy Service', () => {
    //configService = TestBed.get(ConfigService);
    expect('real value').toBe('real value');
  });   

});                 // end of describe 

