import {Component, inject} from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {ToastService} from './shared/services/toast.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'ruaw-ng-app';

	private authService = inject(AuthService);
	private toastService = inject(ToastService);

	constructor() {
		this.authService.checkStatus()
			.subscribe(result => {
				if (!result) {
					this.authService.deleteToken();
					this.toastService.showWarningToast('Sesión caducada', 'Inicia sesión de nuevo');
				}
			});
	}
}
