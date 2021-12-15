import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.interface';

export const setAltaUsuarios = createAction(
	'[Usuario Component] Set Alta Usuarios',
	props<{ form: IUser, userType: string }>()
);

export const setAltaUsuariosSucces = createAction(
	'[Usuario Component] Set Alta Usuarios Success',
	props<{ payload: IUser }>()
);

export const setAltaUsuariosError = createAction(
	'[Usuario Component] Set Alta Usuarios Error',
	props<{ payload: any }>()
);

export const setAltaUsuariosClear = createAction('[Usuario Component] Set Alta Usuarios Clear');
