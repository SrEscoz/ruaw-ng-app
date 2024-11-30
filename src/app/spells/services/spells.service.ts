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
		let params: any = {
			page: filters.pageNumber,
			size: filters.pageSize
		};

		if (filters.name) {
			params.name = filters.name;
		}

		if (filters.school) {
			params.school = filters.school;
		}

		if (filters.level) {
			params.level = filters.level;
		}

		if (filters.class) {
			params.className = filters.class;
		}

		return this.http.get<SpellResponse>(`${this.baseUrl}/spells`, {params});
	}

	public getSchools(): Observable<string[]> {
		return this.http.get<string[]>(this.baseUrl + '/metadata/schools');
	}

	public getClasses(): Observable<string[]> {
		return this.http.get<string[]>(this.baseUrl + '/metadata/classes');
	}

	public getSourceBooks(): Observable<string[]> {
		return this.http.get<string[]>(this.baseUrl + '/metadata/sources');
	}
}
