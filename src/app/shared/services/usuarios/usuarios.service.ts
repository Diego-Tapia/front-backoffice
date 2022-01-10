import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReqUser, IUserStatus } from '../../models/req-user.interface';
import { IUserProfile } from '../../models/user-profile.interface';


@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	private url = environment.apiUrl;

	constructor(private http: HttpClient) { }

	getUsuarios(userType: string): Observable<IUserProfile[]> {
		if (userType === 'final') return this.http.get<IUserProfile[]>(`${this.url}/user`);
		else return this.http.get<IUserProfile[]>(`${this.url}/admin`);
	}

	getUsuariosById(userType: string, id: string): Observable<IUserProfile> {
		if (userType === 'final') return this.http.get<IUserProfile>(`${this.url}/user/${id}`);
		else return this.http.get<IUserProfile>(`${this.url}/admin/${id}`);
	}

	verifyUsuario(userIdentifier: string): Observable<IUserProfile> {
		return this.http.get<IUserProfile>(`${this.url}/user/verify-user/${userIdentifier}`);
	}

	altaUsuario(form: IReqUser, userType: string): Observable<IUserProfile> {
		if (userType === 'final') return this.http.post<IUserProfile>(`${this.url}/user/register`, form);
		else return this.http.post<IUserProfile>(`${this.url}/admin/register`, form);
	}

	editarUsuario(id: string, form: IReqUser | IUserStatus, userType: string): Observable<IUserProfile> {
		if (userType === 'final') return this.http.put<IUserProfile>(`${this.url}/user/${id}`, form);
		else return this.http.put<IUserProfile>(`${this.url}/admin/${id}`, form);
	}

	//UNIFICO DATOS DE USUARIOS FINALES Y ADMIN PARA MOSTRAR EN TABLA
	setUsersDataTable(usuario: IUserProfile): IUserProfile{
		let updatedUser: IUserProfile = {...usuario}
		updatedUser.fullName= updatedUser.shortName+' '+updatedUser.lastName;
		//AGREGO FULLNAME PARA FUNCIONAMIENTO DE FILTRO
		if(updatedUser.userId){
			updatedUser.clientId= updatedUser.userId.clientId;
			updatedUser.customId= updatedUser.userId.customId;
			updatedUser.status= updatedUser.userId.status;
			updatedUser.username= updatedUser.userId.username;
			updatedUser.walletId= updatedUser.userId.walletId;
		}
		return updatedUser;
	}
}
