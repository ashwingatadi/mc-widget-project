import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McSignupComponent } from './mc-signup.component';
import { McConsentModule } from '../mc-consent/mc-consent.module';

@NgModule({
  imports: [
    CommonModule,
    McConsentModule
  ],
  declarations: [McSignupComponent],
  exports: [
    McSignupComponent
  ]
})
export class McSignupModule { }
