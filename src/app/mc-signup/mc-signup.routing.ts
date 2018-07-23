/*

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { McLoginComponent } from '../mc-login/mc-login.component';
import { McSignupComponent } from './mc-signup.component';
//import {McLoginModule} from '../mc-login/mc-login.module';

const routes: Routes = [
  { path: 'login', component: McLoginComponent  },
  {path: 'signup', component: McLoginComponent},
  {
    path: 'customers',
    loadChildren: './mc-login/mc-login.module#McLoginModule'
  }
];

export const McSignupRouting: ModuleWithProviders = RouterModule.forRoot(routes);


/!*
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { McSignupComponent } from './mc-signup.component';

const routes: Routes = [
  {
    path: '',
    component: McSignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class McSignupRouting { }
*!/
*/
