import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	private messageService = inject(MessageService);

	showSuccessToast(title: string, message: string): void {
		this.messageService.add({
			summary: title,
			severity: 'success',
			detail: message,
			life: 2500
		});
	}

	showWarningToast(title: string, message: string): void {
		this.messageService.add({
			summary: title,
			severity: 'warn',
			detail: message,
			life: 3000
		});
	}

	showErrorToast(title: string, message: string): void {
		this.messageService.add({
			summary: title,
			severity: 'error',
			detail: message,
			life: 3000
		});
	}
}
