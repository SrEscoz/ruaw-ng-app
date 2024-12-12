import {Component, computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
	selector: 'public-banner',
	templateUrl: './public-banner.component.html',
	styleUrl: './public-banner.component.css'
})
export class PublicBannerComponent {

	private authService = inject(AuthService);
	protected router = inject(Router);

	public user = computed(() => this.authService.currentUser);
	public authStatus = computed(() => this.authService.authStatus);

	constructor() { }

	isActiveRoute(route: string): boolean {
		return this.router.isActive(route, false);
	}
}
