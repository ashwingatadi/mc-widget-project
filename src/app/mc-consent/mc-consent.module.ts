import { ApiconnectService } from '../services/apiconnect.service';
import { ConfigService } from '../services/config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoggingService } from '../services/logging.service';
import { McConsentComponent } from './mc-consent.component';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../services/modal.service';
import { NgModule } from '@angular/core';
import { SafePipe } from './safe-html.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

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
        ApiconnectService,
        ConfigService,
        LoggingService,
        ModalService
    ],
    exports: [
        McConsentComponent
    ]
})
export class McConsentModule { }

