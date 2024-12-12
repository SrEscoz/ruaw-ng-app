import {HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = localStorage.getItem('access_token');
	const methodsToIntercept = ['POST', 'PUT', 'DELETE'];

	if (methodsToIntercept.includes(req.method) && token) {
		const clonedReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
		return next(clonedReq);
	}

	return next(req);
};
