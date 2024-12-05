import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MinimalClass} from '../interfaces/classes.interface';

@Injectable({
	providedIn: 'root'
})
export class ClassesService {

	private baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	public getClassess(): Observable<MinimalClass[]> {
		return this.http.get<MinimalClass[]>(`${this.baseUrl}/classes`);
	}
}
