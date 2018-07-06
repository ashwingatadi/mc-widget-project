import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McConsentComponent } from './mc-consent.component';
import {FormsModule} from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../services/modal.service';
import {SafePipe} from './safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    McConsentComponent,
    ModalComponent,
    SafePipe
  ],
  providers: [
      ModalService
  ],
  exports: [
    McConsentComponent
  ]
})
export class McConsentModule { }
