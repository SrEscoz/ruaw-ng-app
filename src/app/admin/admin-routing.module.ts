import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutPageComponent} from './pages/layout-page/admin-layout-page.component';
import {AdminSpellsPageComponent} from './pages/admin-spells/spells-page/admin-spells-page.component';
import {AdminAddSpellPageComponent} from './pages/admin-spells/add-spell-page/admin-add-spell-page.component';

const routes: Routes = [
	{
		path: '',
		component: AdminLayoutPageComponent,
		children: [
			{path: 'spells', component: AdminSpellsPageComponent, data: {breadcrumb: 'Conjuros'}},
			{path: 'spells/add', component: AdminAddSpellPageComponent, data: {breadcrumb: 'Añadir Conjuro'},},
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
