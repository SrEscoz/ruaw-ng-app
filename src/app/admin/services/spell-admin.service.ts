import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpellFilters, SpellResponse} from '../../spells/interfaces/spells.interface';

@Injectable({
	providedIn: 'root'
})
export class SpellAdminService {

	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) {
	}

	public getSpells(filters: SpellFilters): Observable<SpellResponse> {
		return this.http.get<SpellResponse>(`${this.baseUrl}/spells`);
	}
}
