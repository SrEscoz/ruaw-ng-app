import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {AuthStatus} from '../../../auth/interfaces/auth-status.enum';
import {ToastService} from '../../../shared/services/toast.service';

@Component({
	selector: 'public-banner',
	templateUrl: './public-banner.component.html',
	styleUrl: './public-banner.component.css'
})
export class PublicBannerComponent {

	private authService = inject(AuthService);
	private toastService = inject(ToastService);
	protected router = inject(Router);
	protected readonly AuthStatus = AuthStatus;

	constructor() { }

	isActiveRoute(route: string): boolean {
		return this.router.isActive(route, false);
	}

	get authStatus(): AuthStatus {
		return this.authService.authStatus();
	}

	logout(): void {
		this.authService.logout();
		this.toastService.showSuccessToast('Logout', '¡Hasta la vista!');
	}
}
