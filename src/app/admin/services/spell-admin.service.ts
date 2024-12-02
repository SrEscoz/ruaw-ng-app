import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BasicResponse, Spell} from '../../spells/interfaces/spells.interface';
import {catchError, map, Observable, of, throwError} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SpellAdminService {

	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) {
	}

	saveSpell(spell: Spell): Observable<Spell | null> {
		return this.http.post<Spell>(`${this.baseUrl}/spells`, spell)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					if (err.status === 409) {
						return of(null);
					}

					return throwError(err);
				})
			);
	}

	updateSpell(spell: Spell): Observable<Spell | null> {
		return this.http.put<Spell>(`${this.baseUrl}/spells/${spell.id}`, spell)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					if (err.status === 409) {
						return of(null);
					}

					return throwError(err);
				})
			);
	}

	deleteSpell(id: number): Observable<boolean> {
		return this.http.delete<BasicResponse>(`${this.baseUrl}/spells/${id}`)
			.pipe(
				map(() => true),
				catchError(() => of(false))
			);
	}

}
