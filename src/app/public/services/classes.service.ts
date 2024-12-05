import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {CompleteClass, MinimalClass} from '../interfaces/classes.interface';

@Injectable({
	providedIn: 'root'
})
export class ClassesService {

	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	public getClassess(): Observable<MinimalClass[]> {
		return this.http.get<MinimalClass[]>(`${this.baseUrl}/classes`);
	}

	public getClass(id: number): Observable<CompleteClass | null> {
		return this.http.get<CompleteClass>(`${this.baseUrl}/classes/${id}`)
			.pipe(
				catchError(() => {
					return of(null);
				})
			);
	}
}
