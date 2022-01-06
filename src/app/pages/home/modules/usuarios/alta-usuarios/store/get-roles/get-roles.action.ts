import { createAction, props } from '@ngrx/store';

export const setGetRoles = createAction('[Usuario Component] Set Get Roles');

export const setGetRolesSucces = createAction(
	'[Usuario Component] Set Get Roles Success',
	props<{ payload: any }>()
);

export const setGetRolesError = createAction(
	'[Usuario Component] Set Get Roles Error',
	props<{ payload: any }>()
);

export const setGetRolesClear = createAction('[Usuario Component] Set Get Roles Clear');
