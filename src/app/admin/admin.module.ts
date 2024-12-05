import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutPageComponent} from './pages/layout-page/admin-layout-page.component';
import {AdminSpellsPageComponent} from './pages/admin-spells/spells-page/admin-spells-page.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {AdminAddSpellPageComponent} from './pages/admin-spells/add-spell-page/admin-add-spell-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PublicModule} from '../public/public.module';
import {AdminBannerComponent} from './components/banner/admin-banner-componen.component';
import {AdminClassPageComponent} from './pages/admin-classes/admin-class-page/admin-class-page.component';
import {AdminAddClassPageComponent} from './pages/admin-classes/add-class-page/admin-add-class-page.component';


@NgModule({
	declarations: [
		AdminLayoutPageComponent,
		AdminSpellsPageComponent,
		AdminAddSpellPageComponent,
		AdminAddSpellPageComponent,
		AdminAddClassPageComponent,

		AdminBannerComponent,
		AdminClassPageComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		PrimeNgModule,
		ReactiveFormsModule,
		PublicModule,
	]
})
export class AdminModule {
}
