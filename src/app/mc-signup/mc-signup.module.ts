import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McSignupComponent } from './mc-signup.component';

import {Routes, RouterModule , Router} from '@angular/router';
import { McConsentModule } from '../mc-consent/mc-consent.module';

import { McRegisterComponent } from './mc-register/mc-register.component';
import { McSignupDefaultComponent } from './mc-signup-default/mc-signup-default.component';
import { McSignupDonateComponent } from './mc-signup-donate/mc-signup-donate.component';
import { McSignupPhoneComponent } from './mc-signup-phone/mc-signup-phone.component';

const routes: Routes = [
  {
    path: 'dummy',
    component: McSignupComponent
  },
  {
    path: 'login',
    loadChildren: '.././mc-login/mc-login.module#McLoginModule'
  },
  {
    path: '**',
    component: McRegisterComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes),McConsentModule,CommonModule], // Using our own custom preloader
  declarations: [McSignupComponent, McRegisterComponent, McSignupDefaultComponent, McSignupDonateComponent, McSignupPhoneComponent],
  exports: [
    McSignupComponent,
    RouterModule
  ]
})
export class McSignupModule { }
