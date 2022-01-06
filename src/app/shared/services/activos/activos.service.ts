import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActivo } from '../../models/activos/activo.interface';

import { IReemisionActivo } from '../../models/activos/reemision-activo.interface';
import { ITransaccion } from '../../models/transaccion.interface';

@Injectable({
	providedIn: 'root'
})
export class ActivosService {
	private url = environment.apiUrl;
	constructor(private http: HttpClient) { }

	getActivos(): Observable<IActivo> {
		return this.http.get<IActivo>(`${this.url}/token`)
	}

	getActivosById(id: string): Observable<IActivo> {
		return this.http.get<IActivo>(`${this.url}/token/${id}`)
	}

	nuevoActivo(activo: IActivo): Observable<IActivo> {
		return this.http.post<IActivo>(`${this.url}/token`, activo);
	}

	editarActivo(id: string, activo: IActivo): Observable<IActivo> {
		return this.http.put<IActivo>(`${this.url}/token/${id}`, activo);
	}

	changeStatus(id: string, status: object): Observable<IActivo> {
		return this.http.put<IActivo>(`${this.url}/token/${id}`, status);
	}

	emitirActivo(id: string): Observable<ITransaccion> {
		return this.http.post<ITransaccion>(`${this.url}/token/${id}/emit`, {});
	}

	reemitirActivo(form: IReemisionActivo): Observable<ITransaccion> {
		return this.http.post<ITransaccion>(`${this.url}/token/${form.id}/reemit`, { amount: form.amount });
	}
}
