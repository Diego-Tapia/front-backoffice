import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IResIndividual } from '../../models/res-individual.interface';
import { IResMasivo } from '../../models/res-masivo.interface';
import { ITransaccion } from '../../models/transaccion.interface';

@Injectable({
	providedIn: 'root'
})
export class IncrementosService {
	private url = environment.apiUrl;

	constructor(private http: HttpClient) { }

	nuevoIncremento(data: IResIndividual): Observable<null> {
		return this.http.post<null>(`${this.url}/increment/individual`, data);
	}

	nuevoIncrementoMasivo(data: FormData): Observable<IResMasivo> {
		return this.http.post<IResMasivo>(`${this.url}/increase/massive`, data);
	}

	getIncrementos(): Observable<any> {
		return this.http.get<any>(`${this.url}/increment/individual`);
	}

	getIncrementosMasivos(): Observable<IResMasivo[]> {
		return this.http.get<IResMasivo[]>(`${this.url}/increase/massive/by-client-id`);
	}
}
