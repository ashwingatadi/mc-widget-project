import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McConsentComponent } from './mc-consent.component';
import {FormsModule} from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../services/modal.service';
import { LoggingService } from '../services/logging.service';
import {SafePipe} from './safe-html.pipe';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http); }



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  declarations: [
    McConsentComponent,
    ModalComponent,
    SafePipe
  ],
  providers: [
      ModalService,
      LoggingService
  ],
  exports: [
    McConsentComponent
  ]
})
export class McConsentModule { }
