import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IIncrementoIndividual } from '../../models/incremento-individual-tabla.interface';
import { ITransaccion } from '../../models/transaccion.interface';

@Injectable({
	providedIn: 'root'
})
export class IncrementosService {
	private url = environment.apiUrl;

	constructor(private http: HttpClient) { }

	nuevoIncremento(data: IIncrementoIndividual): Observable<ITransaccion> {
		return this.http.post<ITransaccion>(`${this.url}/increment/individual`, data);
	}

	nuevoIncrementoMasivo(data: any): Observable<any> {
		return this.http.post<any>(`${this.url}/increase/massive`, data);
	}

	getIncrementos(): Observable<any> {
		return this.http.get<any>(`${this.url}/increment/individual`);
	}

	getIncrementosMasivos(): Observable<any> {
		return this.http.get<any>(`${this.url}/increase/massive/by-client-id`);
	}
}
