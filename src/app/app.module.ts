import { ApiconnectService } from './services/apiconnect.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ConfigService } from './services/config.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { McConsentModule } from './mc-consent/mc-consent.module';
import { McSignupModule } from './mc-signup/mc-signup.module';
import { McConsentComponent } from './mc-consent/mc-consent.component';
import { McLoginComponent } from './mc-login/mc-login.component';
import { McLoginModule } from './mc-login/mc-login.module';
import { McSignupComponent } from './mc-signup/mc-signup.component';
import { NgModule, Injector } from '@angular/core';
import { RenderStyleService } from './services/renderstyle.service';
import { RouterModule} from '@angular/router';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    McConsentModule
     ],
  providers: [ApiconnectService, ConfigService, RenderStyleService],
  bootstrap: [],
  entryComponents: [McConsentComponent ,AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {

    const consentElement = createCustomElement(McConsentComponent, { injector });
    customElements.define('mc-consent', consentElement);

    /*const signupElement = createCustomElement(McLoginComponent, { injector });
    customElements.define('mc-login', signupElement);*/

    const approotElement = createCustomElement(AppComponent, { injector });
    customElements.define('app-root', approotElement);
  }

  ngDoBootstrap() { }
}

