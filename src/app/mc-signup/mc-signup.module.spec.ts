import { McSignupModule } from './mc-signup.module';

describe('McSignupModule', () => {
  let mcSignupModule: McSignupModule;

  beforeEach(() => {
    mcSignupModule = new McSignupModule();
  });

  it('should create an instance', () => {
    expect(mcSignupModule).toBeTruthy();
  });
});
