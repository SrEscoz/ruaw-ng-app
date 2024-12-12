import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AuthStatus} from '../interfaces/auth-status.enum';

export const isAdminGuard: CanActivateFn = (route, state) => {
	const authServie = inject(AuthService);
	const router = inject(Router);

	if (authServie.authStatus() === AuthStatus.authenticatedAdmin)
		return true;

	localStorage.setItem('path', state.url);
	router.navigate(['/auth/login']);
	return false;
};
