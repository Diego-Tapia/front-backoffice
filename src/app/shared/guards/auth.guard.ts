import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanLoad {
	constructor(private authService: AuthService, private router: Router) {}
	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const storageData = this.authService.getUserData();	
		if (!storageData) {
			this.router.navigateByUrl('/auth/login');
			return false;
		}
		return true;
	}
}
