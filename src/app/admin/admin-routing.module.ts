import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutPageComponent} from './pages/layout-page/admin-layout-page.component';
import {AdminSpellsPageComponent} from './pages/admin-spells-page/admin-spells-page.component';

const routes: Routes = [
	{
		path: '',
		component: AdminLayoutPageComponent,
		children: [
			{path: 'spells', component: AdminSpellsPageComponent},
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
