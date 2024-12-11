import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthLayoutPageComponent} from './pages/layout-page/auth-layout-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
	declarations: [
		AuthLayoutPageComponent,
		LoginPageComponent,
		RegisterPageComponent
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		PrimeNgModule,
		ReactiveFormsModule
	]
})
export class AuthModule {
}
