import { enableProdMode , TRANSLATIONS,LOCALE_ID, TRANSLATIONS_FORMAT,MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare const require;
declare  var translations;

var localeData = document.getElementsByTagName("mc-consent")[0].getAttribute("locale");
if(localeData === 'en-us'){
  var  translations :any = '';
}else{
  var  translations = require(`raw-loader!./locale/messages.${localeData}.xlf`);

}
// we use the webpack raw-loader to return the content as a string

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    {provide: LOCALE_ID, useValue: localeData}
  ]
});
