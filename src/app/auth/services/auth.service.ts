import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {LoginResponse, User} from '../interfaces/user.interface';
import {AuthStatus} from '../interfaces/auth-status.enum';
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from '../interfaces/token.payload';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private invalidUser = 'INVALID_USER';
	private adminRole = 'ROLE_ADMIN';

	private baseUrl = `${environment.baseUrl}/auth`;
	private http = inject(HttpClient);

	private _currentUser = signal<User | null>(null);
	private _authStatus = signal<AuthStatus>(AuthStatus.checking);


	public currentUser = computed(() => this._currentUser());
	public authStatus = computed(() => this._authStatus());

	constructor() { }

	login(email: string, password: string): Observable<boolean> {
		const url = `${this.baseUrl}/login`;
		const body = {email, password};

		return this.http.post<LoginResponse>(url, body)
			.pipe(
				tap(response => this.saveCurrentUser(response)),
				map(() => true),
				catchError(() => {
					return throwError(() => 'Error al validar las credenciales');
				})
			);

	}

	register(username: string, email: string, password: string): Observable<boolean> {
		const url = `${this.baseUrl}/register`;
		const body = {username, email, password};

		return this.http.post<LoginResponse>(url, body)
			.pipe(
				tap(response => this.saveCurrentUser(response)),
				map(() => true),
				catchError(() => {
					return throwError(() => 'Error al validar las credenciales');
				})
			);
	}

	checkStatus(): Observable<boolean> {
		const url = `${this.baseUrl}/refresh-token`;
		const token = localStorage.getItem('access_token');

		if (!token) return of(false);

		return this.http.post<LoginResponse>(url, {token})
			.pipe(
				tap(response => this.saveCurrentUser(response)),
				map(() => true),
				catchError(() => of(false))
			);
	}

	deleteToken(): void {
		localStorage.removeItem('access_token');
	}

	private saveCurrentUser(response: LoginResponse): void {
		const user = this.decodeToken(response.token);

		if (user.authorities.includes(this.adminRole))
			this._authStatus.set(AuthStatus.authenticatedAdmin);
		else
			this._authStatus.set(AuthStatus.authenticated);

		this._currentUser.set(user);
		localStorage.setItem('access_token', response.token);
	}

	private decodeToken(token: string): User {
		const decodedToken = jwtDecode<JwtPayload>(token);

		const username: string = decodedToken?.sub || this.invalidUser;
		const authorities = decodedToken.authorities?.map((auth) => auth.authority) || [];
		const createdAt: Date = decodedToken?.iat ? new Date(decodedToken.iat * 1000) : new Date(0);
		const expiresAt: Date = decodedToken?.exp ? new Date(decodedToken.exp * 1000) : new Date(0);

		return {username, createdAt, expiresAt, authorities};
	}

}
