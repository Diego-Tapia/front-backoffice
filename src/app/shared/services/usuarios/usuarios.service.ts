import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFormUser, IUserStatus } from '../../models/form-user.interface';
import { IUserProfile } from '../../models/user-profile.interface';


@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	private url = environment.apiUrl;

	constructor(private http: HttpClient) { }

	getUsuarios(userType: string): Observable<IUserProfile[]> {
		if (userType === 'finales') return this.http.get<any>(`${this.url}/user`);
		else return this.http.get<any>(`${this.url}/admin`);
	}

	getUsuariosById(userType: string, id: string): Observable<IUserProfile> {
		if (userType === 'final') return this.http.get<any>(`${this.url}/user/${id}`);
		else return this.http.get<any>(`${this.url}/admin/${id}`);
	}

	verifyUsuario(userIdentifier: string): Observable<IUserProfile> {
		return this.http.get<any>(`${this.url}/user/verify-user/${userIdentifier}`);
	}

	altaUsuario(form: IFormUser, userType: string): Observable<IFormUser> {
		if (userType === 'final') return this.http.post<any>(`${this.url}/user/register`, form);
		else return this.http.post<any>(`${this.url}/admin/register`, form);
	}

	modificacionUsuario(id: string, form: IFormUser | IUserStatus, userType: string): Observable<IFormUser> {
		if (userType === 'finales' || userType === 'final') return this.http.put<any>(`${this.url}/user/${id}`, form);
		else return this.http.put<any>(`${this.url}/admin/${id}`, form);
	}
}
