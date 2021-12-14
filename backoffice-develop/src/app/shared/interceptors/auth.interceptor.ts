import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private userIsLogged = false;
	private accessToken = '';
	private refreshToken = '';
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		this.getUserData();

		if (this.hasToIntercept(request.url)) {
			request = this.addAuthenticationToken(request);
		}

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					//TODO: HANDLE EXPIRED TOKEN
					return throwError(error);
					//return next.handle(request);
				} else {
					return throwError(error);
				}
			})
		);
	}

	/**
	 * Method to determine if the request should be handled
	 */
	private hasToIntercept(url: string): boolean {
		const isLoginRequest = url.includes('login');
		const hasToInterceptUrl = !isLoginRequest;
		return this.userIsLogged && hasToInterceptUrl;
	}

	/**
	 * Method to obtain the necessary user data.
	 */
	public getUserData(): void {
		const storageData = this.authService.getUserData();
		this.accessToken = storageData ? storageData.token : '';
		this.refreshToken = storageData ? storageData.refreshToken : '';
		this.userIsLogged = storageData && storageData.token ? true : false;
	}

	/**
	 * Method to set access token in header
	 */
	private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
	}
}
