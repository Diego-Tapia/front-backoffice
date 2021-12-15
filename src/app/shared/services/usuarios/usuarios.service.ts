import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../models/user.interface';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	private url = environment.apiUrl;

	constructor(private http: HttpClient) { }

	getUsuarios(userType: string): Observable<IUser[]> {
		if (userType === 'finales') return this.http.get<any>(`${this.url}/user/by-client-id`);
		else return this.http.get<any>(`${this.url}/admin`);
	}

	getUsuariosById(userType: string, id: string): Observable<IUser> {
		if (userType === 'final') return this.http.get<any>(`${this.url}/user/${id}`);
		else return this.http.get<any>(`${this.url}/admin/${id}`);
	}

	altaUsuario(form: IUser, userType: string): Observable<IUser> {
		if (userType === 'final') return this.http.post<any>(`${this.url}/user/register`, form);
		else return this.http.post<any>(`${this.url}/admin/register`, form);
	}

	modificacionUsuario(id: string, form: IUser): Observable<IUser> {
		if (!form.rol) return this.http.put<any>(`${this.url}/user/${id}`, form);
		else return this.http.put<any>(`${this.url}/admin/${id}`, form);
	}
}
