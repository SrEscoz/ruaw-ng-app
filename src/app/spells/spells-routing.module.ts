import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';
import {ListPageComponent} from './pages/list-page/list-page.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutPageComponent,
		children: [
			{path: '', pathMatch: 'full', component: ListPageComponent},
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
