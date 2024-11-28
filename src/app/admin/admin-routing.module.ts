import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpellsListPageComponent} from '../spells/pages/list-page/spells-list-page.component';
import {AdminLayoutPageComponent} from './pages/layout-page/admin-layout-page.component';

const routes: Routes = [
	{
		path: '',
		component: AdminLayoutPageComponent,
		children: [
			{path: 'spells', component: SpellsListPageComponent},
			{path: '**', redirectTo: 'spells'},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {
}
