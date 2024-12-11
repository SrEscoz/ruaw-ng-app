import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import { AuthLayoutPageComponent } from './pages/layout-page/auth-layout-page.component';


@NgModule({
	declarations: [
    AuthLayoutPageComponent
  ],
	imports: [
		CommonModule,
		AuthRoutingModule
	]
})
export class AuthModule {
}
