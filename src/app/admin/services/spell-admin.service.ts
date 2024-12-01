import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Spell} from '../../spells/interfaces/spells.interface';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SpellAdminService {

	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) {
	}

	saveSpell(spell: Spell): Observable<Spell> {
		return this.http.post<Spell>(`${this.baseUrl}/spells`, spell);
	}

}
