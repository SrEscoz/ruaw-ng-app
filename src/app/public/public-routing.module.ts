import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicLayoutPageComponent} from './pages/layout-page/public-layout-page.component';
import {SpellsPageComponent} from './pages/spells-page/spells-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ClassesPageComponent} from './pages/classes-page/classes-page.component';

const routes: Routes = [
	{
		path: '',
		component: PublicLayoutPageComponent,
		children: [
			{path: 'home', component: HomePageComponent},
			{path: 'spells', component: SpellsPageComponent},
			{path: 'classes', component: ClassesPageComponent},
			{path: '**', redirectTo: 'home'},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PublicRoutingModule {
}
