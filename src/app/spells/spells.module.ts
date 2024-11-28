import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {SpellsRoutingModule} from './spells-routing.module';
import {SpellFiltersComponent} from './components/filters/spell-filters.component';
import {ListPageComponent} from './pages/list-page/list-page.component';
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';
import {SpellLevelPipe} from './pipes/spell-level.pipe';
import {SpellCardComponent} from './components/card/spell-card.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';


@NgModule({
	declarations: [
		SpellFiltersComponent,
		ListPageComponent,
		LayoutPageComponent,
		SpellLevelPipe,
		SpellCardComponent
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
