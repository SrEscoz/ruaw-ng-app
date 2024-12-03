import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicLayoutPageComponent} from './pages/layout-page/public-layout-page.component';
import {SpellsPageComponent} from './pages/spells-page/spells-page.component';

const routes: Routes = [
	{
		path: '',
		component: PublicLayoutPageComponent,
		children: [
			{path: 'spells', component: SpellsPageComponent},
			{path: '**', redirectTo: 'spells'},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PublicRoutingModule {
}
