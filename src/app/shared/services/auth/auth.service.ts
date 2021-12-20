import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthResponse } from '../../models/auth-response.interface';

const STORAGE_KEY = 'localStorageData';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	anotherList = [];
	private url = environment.apiUrl;

	constructor(
		@Inject(LOCAL_STORAGE) private localStorage: StorageService,
		private router: Router,
		private http: HttpClient
	) {}

	logIn(username: string, password: string): Observable<IAuthResponse> {
		return this.http.post<IAuthResponse>(`${this.url}/admin/login`, { username, password });
	}

	logOut(): void {
		try {
			localStorage.removeItem(STORAGE_KEY);
			this.router.navigateByUrl('/auth/login');
		} catch (e) {
			console.log('Error cleaning localStorage', e);
		}
	}

	setUser(token: string, refreskToken: string, admin: any): void {
		try {
			localStorage.removeItem(STORAGE_KEY);
			const currentData = this.localStorage.get(STORAGE_KEY) || [];
			currentData.push({
				token: token,
				refreshToken: refreskToken,
				admin: admin
			});
			this.localStorage.set(STORAGE_KEY, currentData);
			this.router.navigateByUrl('/home');
		} catch (e) {
			console.log('Error to save info into localStorage', e);
		}
	}

	verificarLocalStorage(): void {
		//TODO::Verificar si el local storage tiene datos de usuario
	}

	getUserData(): IAuthResponse | null {
		const storageData: IAuthResponse[] = this.localStorage.get(STORAGE_KEY) || null;
		return storageData ? storageData[0] : null;
	}
}
