import { McLoginModule } from './mc-login.module';

describe('McLoginModule', () => {
  let mcLoginModule: McLoginModule;

  beforeEach(() => {
    mcLoginModule = new McLoginModule();
  });

  it('should create an instance', () => {
    expect(mcLoginModule).toBeTruthy();
  });
});
