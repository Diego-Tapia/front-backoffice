import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { setAuth, setAuthError, setAuthSucces } from './auth.actions';

@Injectable()
export class AuthEffects {
	constructor(private actions$: Actions, private authService: AuthService) {}

	setAuth$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setAuth),
			mergeMap((props) =>
				this.authService.logIn(props.username, props.password).pipe(
					map((activos) => setAuthSucces({ payload: activos })),
					catchError((err) => of(setAuthError({ payload: err })))
				)
			)
		)
	);
}
