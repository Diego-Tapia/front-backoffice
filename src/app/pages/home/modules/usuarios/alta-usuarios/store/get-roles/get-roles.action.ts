import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IRol } from 'src/app/shared/models/rol.interface';

export const setGetRoles = createAction('[Usuario Component] Set Get Roles');

export const setGetRolesSucces = createAction(
	'[Usuario Component] Set Get Roles Success',
	props<{ payload: IRol[] }>()
);

export const setGetRolesError = createAction(
	'[Usuario Component] Set Get Roles Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setGetRolesClear = createAction('[Usuario Component] Set Get Roles Clear');
