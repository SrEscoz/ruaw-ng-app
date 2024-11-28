import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpellFilters, SpellResponse} from '../interfaces/spells.interface';

@Injectable({
	providedIn: 'root'
})
export class SpellsService {

	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	public getSpells(filters: SpellFilters): Observable<SpellResponse> {
		return this.http.get<SpellResponse>(`${this.baseUrl}/spells?page=${filters.pageNumber}&size=${filters.pageSize}`);
	}

	public getSchools(): Observable<string[]> {
		return this.http.get<string[]>(this.baseUrl + '/metadata/schools');
	}

	public getClasses(): Observable<string[]> {
		return this.http.get<string[]>(this.baseUrl + '/metadata/classes');
	}
}
