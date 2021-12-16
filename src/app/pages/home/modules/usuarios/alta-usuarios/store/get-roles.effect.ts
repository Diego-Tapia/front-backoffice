import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setGetRoles, setGetRolesError, setGetRolesSucces } from './get-roles.action';
import { RolesService } from 'src/app/shared/services/roles/roles.service';

@Injectable()
export class GetRolesEffects {
	constructor(private actions$: Actions, private rolesService: RolesService) { }

	setGetRoles$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetRoles),
			mergeMap((props) =>
				this.rolesService.getRoles().pipe(
					map((usuario) => setGetRolesSucces({ payload: usuario })),
					catchError((err) => of(setGetRolesError({ payload: err })))
				)
			)
		)
	);
}
