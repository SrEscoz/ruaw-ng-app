import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
	selector: 'auth-login-page',
	templateUrl: './login-page.component.html',
	styles: ``
})
export class LoginPageComponent {

	private formBuilder = inject(FormBuilder);
	private authService = inject(AuthService);
	private messageService = inject(MessageService);
	private router = inject(Router);

	public isInvalidCredentials = false;

	public loginForm: FormGroup = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required],
	});

	onLogin(): void {
		this.isInvalidCredentials = false;

		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();
			this.markAllAsDirty();

			return;
		}
		const {username, password} = this.loginForm.value;

		this.authService.login(username, password)
			.subscribe({
					next: () => {
						this.showWarningToast('¡Bienvenido de nuevo!');
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

	// TODO esto no va aquí xd
	passwordValidator() {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;

			if (!value) {
				return null;
			}

			const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
			const valid = passwordRegex.test(value);
			return valid ? null : {passwordInvalid: true};
		};
	}

	validateField(field: string): boolean | undefined {
		return this.loginForm.get(field)?.invalid
			&& (this.loginForm.get(field)?.dirty
				|| this.loginForm.get(field)?.touched);
	}

	isValidField(field: string): boolean {
		return this.loginForm.get(field)?.errors?.['required'];
	}

	// TODO esto no va aquí xd
	isValidPasswordFormat(): boolean {
		return this.loginForm.get('password')?.errors?.['minlength']
			|| this.loginForm.get('password')?.errors?.['passwordInvalid'];
	}

	showWarningToast(message: string): void {
		this.messageService.add({
			summary: 'Login',
			severity: 'success',
			detail: message,
			life: 2500
		});
	}
}
