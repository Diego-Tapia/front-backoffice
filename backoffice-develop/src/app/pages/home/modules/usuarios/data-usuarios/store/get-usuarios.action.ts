import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.interface';

export const setGetUsuarios = createAction(
	'[Usuario Component] Set Get Usuario',
	props<{ userType: string }>());

export const setGetUsuariosSucces = createAction(
	'[Usuario Component] Set Get Usuario Success',
	props<{ payload: IUser[] }>()
);

export const setGetUsuariosError = createAction(
	'[Usuario Component] Set Get Usuario Error',
	props<{ payload: any }>()
);

export const setGetUsuariosClear = createAction('[Usuario Component] Set Get Usuario Clear');
