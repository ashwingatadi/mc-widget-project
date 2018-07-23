import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McLoginComponent } from './mc-login.component';
import { Routes, RouterModule } from '@angular/router';
import {McSignupModule} from '../mc-signup/mc-signup.module';

const routes: Routes = [
  {
    path: '',
    component: McLoginComponent
  },
  {
    path: 'signup',
    loadChildren: '.././mc-signup/mc-signup.module#McSignupModule'
  },
  {
    path: '**',
    component: McLoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,[RouterModule.forChild(routes)]
  ],
  exports: [RouterModule],
  declarations: [McLoginComponent]
})
export class McLoginModule { }
