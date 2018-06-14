import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McConsentComponent } from './mc-consent.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [McConsentComponent],
  exports: [
    McConsentComponent
  ]
})
export class McConsentModule { }
