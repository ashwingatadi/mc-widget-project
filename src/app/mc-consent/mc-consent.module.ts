import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McConsentComponent } from './mc-consent.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [McConsentComponent],
  exports: [
    McConsentComponent
  ]
})
export class McConsentModule { }
