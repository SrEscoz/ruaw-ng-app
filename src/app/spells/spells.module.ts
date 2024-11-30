import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {SpellsRoutingModule} from './spells-routing.module';
import {SpellFiltersComponent} from './components/filters/spell-filters.component';
import {SpellsListPageComponent} from './pages/list-page/spells-list-page.component';
import {SpellsLayoutPageComponent} from './pages/layout-page/spells-layout-page.component';
import {SpellLevelPipe} from './pipes/spell-level.pipe';
import {SpellCardComponent} from './components/card/spell-card.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {SpellImagePipe} from './pipes/spell-image.pipe';
import {SpellDialogComponent} from './components/dialog/spell-dialog.component';


@NgModule({
	declarations: [
		SpellFiltersComponent,
		SpellsListPageComponent,
		SpellsLayoutPageComponent,
		SpellLevelPipe,
		SpellCardComponent,
		SpellImagePipe,
		SpellDialogComponent
	],
	exports: [
		SpellImagePipe
	],
	imports: [
		CommonModule,
		SpellsRoutingModule,
		PrimeNgModule,
		NgOptimizedImage
	]
})
export class SpellsModule {
}
