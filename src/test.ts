// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// to run the test uncomment only the test which is running to show in the test runner. 
// there is an issue in running the ng server with lines uncommented, revert it back after testing. 
//import './app/services/service.spec';                         // this is running
//import './app/mc-consent/mc-consent.module.spec';             // not setup 
//import './app/mc-signup/mc-signup.module.spec';               // not setup

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
// comment the context before running the test otherwise all the test will be executed. 
const context = require.context('./', true, /\.spec\.ts$/);
 //And load the modules.
context.keys().map(context);
