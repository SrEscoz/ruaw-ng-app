import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PrimeNgModule} from './prime-ng/prime-ng.module';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {authInterceptor} from './auth/auth.interceptor';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		PrimeNgModule,
		FormsModule,
	],
	providers: [
		MessageService,
		ConfirmationService,
		provideHttpClient(withInterceptors([authInterceptor])),
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
