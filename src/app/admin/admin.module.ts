import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutPageComponent} from './pages/layout-page/admin-layout-page.component';


@NgModule({
	declarations: [
		AdminLayoutPageComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule
	]
})
export class AdminModule {
}
