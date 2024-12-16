import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
	selector: 'auth-signin-page',
	templateUrl: './register-page.component.html',
	styles: `
        .h-90 {
            height: 90vh;
        }
	`
})
export class RegisterPageComponent {

	private formBuilder = inject(FormBuilder);
	private authService = inject(AuthService);
	private messageService = inject(MessageService);
	private router = inject(Router);

	public isInvalidParams = false;

	public registerForm: FormGroup = this.formBuilder.group({
		username: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
	});

	onRegister(): void {
		if (!this.registerForm.valid) {
			this.registerForm.markAllAsTouched();
			this.markAllAsDirty();

			return;
		}

		const {username, email, password} = this.registerForm.value;

		this.authService.register(username, email, password)
			.subscribe({
					next: () => {
						this.showSuccessToast('¡Registro completado!');
						this.router.navigateByUrl('/spells');
					},
					error: () => this.isInvalidParams = true
				}
			);
	}

	markAllAsDirty(): void {
		Object.keys(this.registerForm.controls).forEach(controlName => {
			const control = this.registerForm.get(controlName);
			control?.markAsDirty();
		});
	}

	validateField(field: string): boolean | undefined {
		return this.registerForm.get(field)?.invalid
			&& (this.registerForm.get(field)?.dirty
				|| this.registerForm.get(field)?.touched);
	}

	isValidPasswordFormat(): boolean {
		return this.registerForm.get('password')?.errors?.['minlength']
			|| this.registerForm.get('password')?.errors?.['passwordInvalid'];
	}

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

	isValidField(field: string): boolean {
		return this.registerForm.get(field)?.errors?.['required'];
	}

	isValidEmail(): boolean {
		console.log(this.registerForm.get('email'));

		return this.registerForm.get('email')?.errors?.['email'];
	}

	showSuccessToast(message: string): void {
		this.messageService.add({
			summary: 'Registro',
			severity: 'success',
			detail: message,
			life: 2500
		});
	}
}
