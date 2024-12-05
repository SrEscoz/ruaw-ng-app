import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {SpellFiltersComponent} from './spells/components/filters/spell-filters.component';
import {SpellsPageComponent} from './pages/spells-page/spells-page.component';
import {PublicLayoutPageComponent} from './pages/layout-page/public-layout-page.component';
import {SpellLevelPipe} from './pipes/spell-level.pipe';
import {SpellCardComponent} from './spells/components/card/spell-card.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {SpellImagePipe} from './pipes/spell-image.pipe';
import {SpellDialogComponent} from './spells/components/dialog/spell-dialog.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {PublicBannerComponent} from './components/banner/public-banner.component';
import {ClassesPageComponent} from './pages/classes-page/classes-page.component';
import {ClassesModule} from './classes/classes.module';
import {ClassImagePipe} from './pipes/class-image.pipe';
import {ClassCardComponent} from './classes/components/class-card/class-card.component';


@NgModule({
	declarations: [
		SpellFiltersComponent,
		SpellsPageComponent,
		PublicLayoutPageComponent,
		SpellLevelPipe,
		SpellCardComponent,
		SpellImagePipe,
		SpellDialogComponent,
		HomePageComponent,
		PublicBannerComponent,
		ClassCardComponent,
		ClassesPageComponent,
		ClassImagePipe
	],
	exports: [
		SpellImagePipe,
		SpellFiltersComponent,
		ClassImagePipe
	],
	imports: [
		CommonModule,
		PublicRoutingModule,
		PrimeNgModule,
		NgOptimizedImage,
		ClassesModule
	]
})
export class PublicModule {
}
