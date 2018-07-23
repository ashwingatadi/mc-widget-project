import { ApiconnectService } from '../services/apiconnect.service';
import { ConfigService } from '../services/config.service';
import { Http } from '@angular/http';
import { LoggingService } from '../services/logging.service';
import { McConsentComponent } from './mc-consent.component';
import { McConsentModule } from './mc-consent.module';
import { ModalService } from '../services/modal.service';

describe('McConsentModule', () => {
  let apiConnectService: ApiconnectService;
  let configService: ConfigService;
  let httpClientSpy: { get: jasmine.Spy };
  let loggingService: LoggingService;
  let mcConsentModule: McConsentModule;
  let mcConsentComponent: McConsentComponent;
  let modalService: ModalService;

  beforeEach(() => {
    configService = new ConfigService(<any>httpClientSpy);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    loggingService = new LoggingService();
    mcConsentModule = new McConsentModule();
    modalService = new ModalService();
  });

  it('Test the config service', () => {

    const expectedConfig: any =
      [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

    httpClientSpy.get.and.returnValue(expectedConfig);
    configService.getConfigData().subscribe(heroes => expect(heroes).toEqual(expectedConfig, 'expected heroes'),
      fail
    );

  });

  it('should create an instance', () => {
    expect(mcConsentModule).toBeTruthy();
  });
});
