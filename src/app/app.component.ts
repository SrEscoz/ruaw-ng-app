import {Component, inject} from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {MessageService} from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'ruaw-ng-app';

	private authService = inject(AuthService);
	private messageService = inject(MessageService);

	constructor() {
		this.authService.checkStatus()
			.subscribe(result => {
				if (!result) {
					this.authService.deleteToken();
				}
			});
	}
}
