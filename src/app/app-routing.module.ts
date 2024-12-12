import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {isAdminGuard} from './auth/guards/is-admin.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},
	{
		path: 'admin',
		canActivate: [isAdminGuard],
		loadChildren: () => import ('./admin/admin.module').then(m => m.AdminModule)
	},
	{
		path: '',
		loadChildren: () => import ('./public/public.module').then(m => m.PublicModule)
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
