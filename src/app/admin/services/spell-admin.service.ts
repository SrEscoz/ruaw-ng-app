import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Spell} from '../../spells/interfaces/spells.interface';
import {catchError, Observable, of, throwError} from 'rxjs';

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

}
