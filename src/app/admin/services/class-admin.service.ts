import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BasicResponse} from '../../public/interfaces/spells.interface';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import {CompleteClass} from '../../public/interfaces/classes.interface';

@Injectable({
	providedIn: 'root'
})
export class ClassAdminService {

	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) {
	}

	saveClass(clazz: CompleteClass): Observable<CompleteClass | null> {
		return this.http.post<CompleteClass>(`${this.baseUrl}/classes`, clazz)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					if (err.status === 409) {
						return of(null);
					}

					return throwError(err);
				})
			);
	}

	updateClass(clazz: CompleteClass): Observable<CompleteClass | null> {
		return this.http.put<CompleteClass>(`${this.baseUrl}/classes/${clazz.id}`, clazz)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					if (err.status === 409) {
						return of(null);
					}

					return throwError(err);
				})
			);
	}

	deleteClass(id: number): Observable<boolean> {
		return this.http.delete<BasicResponse>(`${this.baseUrl}/classes/${id}`)
			.pipe(
				map(() => true),
				catchError(() => of(false))
			);
	}

}
