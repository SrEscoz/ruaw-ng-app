import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutPageComponent} from './pages/layout-page/admin-layout-page.component';
import {AdminSpellsPageComponent} from './pages/admin-spells-page/admin-spells-page.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';


@NgModule({
	declarations: [
		AdminLayoutPageComponent,
		AdminSpellsPageComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		PrimeNgModule
	]
})
export class AdminModule {
}
