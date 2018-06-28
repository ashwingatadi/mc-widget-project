import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McConsentComponent } from './mc-consent.component';
import {FormsModule} from '@angular/forms';
import { ModalComponent } from '../_directives';
import { ModalService } from '../_services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    McConsentComponent,
    ModalComponent
  ],
  providers: [
      ModalService
  ],
  exports: [
    McConsentComponent
  ]
})
export class McConsentModule { }
