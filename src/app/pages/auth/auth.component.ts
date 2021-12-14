import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IAuthResponse } from 'src/app/shared/models/auth-response.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { setAuth, setAuthClear } from './store/auth.actions';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {
	loginForm = new FormBuilder().group({
		username: ['', [Validators.required]],
		password: ['', Validators.required]
	});
	subscriptions: Subscription[] = [];
	constructor(
		private authService: AuthService,
		private store: Store<{ setAuthReducer: IState<IAuthResponse> }>,
		private noti: NotificationsService
	) {
		this.subscriptions.push(
			this.store.select('setAuthReducer').subscribe((res: IState<IAuthResponse | null>) => {
				this.handleLogin(res);
			})
		);
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.store.dispatch(setAuthClear());
	}

	get username(): string {
		return this.loginForm.get('username')?.value;
	}

	get password(): string {
		return this.loginForm.get('password')?.value;
	}

	onLogin(): void {
		if (this.loginForm.valid) {
			this.store.dispatch(setAuth({ username: this.username, password: this.password }));
		}
	}

	handleLogin(res: IState<IAuthResponse | null>): void {
		if (res.success && res.response) {
			this.authService.setUser(res.response.token, res.response.refreshToken, res.response.user);
		} else if (res.error) {
			this.noti.error('Error login', res.error.error?.message || '');
		}
	}
}
