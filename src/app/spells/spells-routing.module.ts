import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpellsLayoutPageComponent} from './pages/layout-page/spells-layout-page.component';
import {SpellsListPageComponent} from './pages/list-page/spells-list-page.component';

const routes: Routes = [
	{
		path: '',
		component: SpellsLayoutPageComponent,
		children: [
			{path: '', pathMatch: 'full', component: SpellsListPageComponent},
			{path: '**', redirectTo: ''},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SpellsRoutingModule {
}
