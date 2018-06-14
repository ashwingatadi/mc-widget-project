import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {createCustomElement} from '@angular/elements'


import { McSignupComponent } from './mc-signup/mc-signup.component';
import { ConfigService } from './services/config.service';
import { McConsentModule } from './mc-consent/mc-consent.module';
import { McSignupModule } from './mc-signup/mc-signup.module';
import { AppComponent } from './app.component';
import { McConsentComponent } from './mc-consent/mc-consent.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    McConsentModule,
    McSignupModule,
  ],
  providers: [ConfigService],
  bootstrap: []
  ,
  entryComponents: [McSignupComponent, McConsentComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {
    const registerElement = createCustomElement(McSignupComponent, { injector });
    customElements.define('mc-signup', registerElement);

    const consentElement = createCustomElement(McConsentComponent, { injector });
    customElements.define('mc-consent', consentElement);
  }

  ngDoBootstrap() { }
}

