import { McConsentModule } from './mc-consent.module';

describe('McConsentModule', () => {
  let mcConsentModule: McConsentModule;

  beforeEach(() => {
    mcConsentModule = new McConsentModule();
  });

  it('should create an instance', () => {
    expect(mcConsentModule).toBeTruthy();
  });
});
