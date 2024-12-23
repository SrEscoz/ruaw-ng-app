import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {SpellFiltersComponent} from './components/spells-filter/spell-filters.component';
import {SpellsPageComponent} from './pages/spells-page/spells-page.component';
import {PublicLayoutPageComponent} from './pages/layout-page/public-layout-page.component';
import {SpellLevelPipe} from './pipes/spell-level.pipe';
import {SpellCardComponent} from './components/spell-card/spell-card.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {SpellImagePipe} from './pipes/spell-image.pipe';
import {SpellDialogComponent} from './components/spell-dialog/spell-dialog.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {PublicBannerComponent} from './components/public-banner/public-banner.component';
import {ClassesPageComponent} from './pages/classes-page/classes-page.component';
import {ClassImagePipe} from './pipes/class-image.pipe';
import {ClassCardComponent} from './components/class-card/class-card.component';


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
	]
})
export class PublicModule {
}
