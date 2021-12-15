import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IDisminucionIndividual } from '../../models/dec-individual.interface';
import { ITransaccion } from '../../models/transaccion.interface';

@Injectable({
	providedIn: 'root'
})
export class DisminucionesService {
	private url = environment.apiUrl;

	constructor(private http: HttpClient) { }

	nuevaDisminucion(data: IDisminucionIndividual): Observable<ITransaccion> {
		return this.http.post<ITransaccion>(`${this.url}/decrement/individual`, data);
	}

	nuevaDisminucionMasiva(data: any): Observable<any> {
		return this.http.post<any>(`${this.url}/decrease/massive`, data);
	}

	getDisminuciones(): Observable<any> {
		return this.http.get<any>(`${this.url}/decrement/individual`);
	}

	getDisminucionesMasivas(): Observable<any> {
		return this.http.get<any>(`${this.url}/decrease/massive`);
	}
}
