import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IReqIndividual } from '../../models/req-individual.interface';
import { ITransaccion } from '../../models/transaccion.interface';
import { IResMasivo } from '../../models/res-masivo.interface';

@Injectable({
	providedIn: 'root'
})
export class DisminucionesService {
	private url = environment.apiUrl;

	constructor(private http: HttpClient) { }

	nuevaDisminucion(data: IReqIndividual): Observable<null> {
		return this.http.post<null>(`${this.url}/decrement/individual`, data);
	}

	nuevaDisminucionMasiva(data: FormData): Observable<IResMasivo> {
		return this.http.post<IResMasivo>(`${this.url}/decrease/massive`, data);
	}

	getDisminuciones(): Observable<any> {
		return this.http.get<any>(`${this.url}/decrement/individual`);
	}

	getDisminucionesMasivas(): Observable<IResMasivo[]> {
		return this.http.get<IResMasivo[]>(`${this.url}/decrease/massive/by-client-id`);
	}
}
