import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'admin-banner',
	templateUrl: './admin-banner-componen.component.html',
	styleUrl: './admin-banner-componen.component.css'
})
export class AdminBannerComponent {

	constructor(protected router: Router) { }

	isActiveRoute(route: string): boolean {
		return this.router.isActive(route, false);
	}
}
