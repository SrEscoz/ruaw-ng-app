import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AuthStatus} from '../interfaces/auth-status.enum';

export const isNotAuthGuard: CanActivateFn = () => {
	const authServie = inject(AuthService);
	const router = inject(Router);

	if (authServie.authStatus() === AuthStatus.authenticated || authServie.authStatus() === AuthStatus.authenticatedAdmin) {
		router.navigate(['/']);
		return false;
	}

	return true;
};
