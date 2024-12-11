import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
	selector: 'auth-login-page',
	templateUrl: './login-page.component.html',
	styles: ``
})
export class LoginPageComponent {

	private formBuilder = inject(FormBuilder);

	public loginForm: FormGroup = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
	});

	onLogin(): void {
		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();
			this.markAllAsDirty();

			return;
		}
		console.log(this.loginForm.value);
	}

	markAllAsDirty(): void {
		Object.keys(this.loginForm.controls).forEach(controlName => {
			const control = this.loginForm.get(controlName);
			control?.markAsDirty();
		});
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

	validateField(field: string): boolean | undefined {
		return this.loginForm.get(field)?.invalid
			&& (this.loginForm.get(field)?.dirty
				|| this.loginForm.get(field)?.touched);
	}

	isValidField(field: string): boolean {
		return this.loginForm.get(field)?.errors?.['required'];
	}

	isValidPasswordFormat(): boolean {
		return this.loginForm.get('password')?.errors?.['minlength']
			|| this.loginForm.get('password')?.errors?.['passwordInvalid'];
	}
}
