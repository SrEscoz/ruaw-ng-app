import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: 'spells',
		loadChildren: () => import ('./spells/spells.module').then(m => m.SpellsModule)
	},
	{
		path: 'admin',
		loadChildren: () => import ('./admin/admin.module').then(m => m.AdminModule)
	},
	{
		path: '**',
		redirectTo: 'spells'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
