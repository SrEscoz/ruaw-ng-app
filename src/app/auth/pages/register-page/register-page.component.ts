import {Component, inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
	selector: 'auth-signin-page',
	templateUrl: './register-page.component.html',
	styles: ``
})
export class RegisterPageComponent {

	private formBuilder = inject(FormBuilder);

}
