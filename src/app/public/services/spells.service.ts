import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Spell, SpellFilters, SpellResponse} from '../interfaces/spells.interface';

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

		if (filters.sort) {
			params.sort = filters.sort;
		}

		return this.http.get<SpellResponse>(`${this.baseUrl}/spells`, {params});
	}

	public getSpell(id: number): Observable<Spell | null> {
		return this.http.get<Spell>(`${this.baseUrl}/spells/${id}`)
			.pipe(
				catchError(() => {
					return of(null);
				})
			);
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
