import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
	selector: 'auth-login-page',
	templateUrl: './login-page.component.html',
	styles: `
        .h-90 {
            height: 90vh;
        }
	`
})
export class LoginPageComponent {

	private formBuilder = inject(FormBuilder);
	private authService = inject(AuthService);
	private messageService = inject(MessageService);
	private router = inject(Router);

	public isInvalidCredentials = false;

	public loginForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
	});

	onLogin(): void {
		this.isInvalidCredentials = false;

		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();
			this.markAllAsDirty();

			return;
		}
		const {email, password} = this.loginForm.value;

		this.authService.login(email, password)
			.subscribe({
					next: () => {
						this.showSuccessToast('¡Bienvenido de nuevo!');
						this.router.navigateByUrl('/spells');
					},
					error: () => this.isInvalidCredentials = true
				}
			);
	}

	markAllAsDirty(): void {
		Object.keys(this.loginForm.controls).forEach(controlName => {
			const control = this.loginForm.get(controlName);
			control?.markAsDirty();
		});
	}

	validateField(field: string): boolean | undefined {
		return this.loginForm.get(field)?.invalid
			&& (this.loginForm.get(field)?.dirty
				|| this.loginForm.get(field)?.touched);
	}

	isValidField(field: string): boolean {
		return this.loginForm.get(field)?.errors?.['required'];
	}

	showSuccessToast(message: string): void {
		this.messageService.add({
			summary: 'Login',
			severity: 'success',
			detail: message,
			life: 2500
		});
	}
}
