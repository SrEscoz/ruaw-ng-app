import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'public-banner',
	templateUrl: './public-banner.component.html',
	styleUrl: './public-banner.component.css'
})
export class PublicBannerComponent {

	constructor(protected router: Router) { }

	isActiveRoute(route: string): boolean {
		return this.router.isActive(route, false);
	}
}
