import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {SpellFiltersComponent} from './components/spells/filters/spell-filters.component';
import {SpellsPageComponent} from './pages/spells-page/spells-page.component';
import {PublicLayoutPageComponent} from './pages/layout-page/public-layout-page.component';
import {SpellLevelPipe} from './pipes/spell-level.pipe';
import {SpellCardComponent} from './components/spells/card/spell-card.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {SpellImagePipe} from './pipes/spell-image.pipe';
import {SpellDialogComponent} from './components/spells/dialog/spell-dialog.component';


@NgModule({
	declarations: [
		SpellFiltersComponent,
		SpellsPageComponent,
		PublicLayoutPageComponent,
		SpellLevelPipe,
		SpellCardComponent,
		SpellImagePipe,
		SpellDialogComponent
	],
	exports: [
		SpellImagePipe,
		SpellFiltersComponent
	],
	imports: [
		CommonModule,
		PublicRoutingModule,
		PrimeNgModule,
		NgOptimizedImage
	]
})
export class PublicModule {
}
