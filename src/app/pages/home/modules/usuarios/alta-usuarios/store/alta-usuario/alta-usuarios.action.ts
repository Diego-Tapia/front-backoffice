import { createAction, props } from '@ngrx/store';
import { IFormUser } from 'src/app/shared/models/form-user.interface';

export const setAltaUsuarios = createAction(
	'[Usuario Component] Set Alta Usuarios',
	props<{ form: IFormUser, userType: string }>()
);

export const setAltaUsuariosSucces = createAction(
	'[Usuario Component] Set Alta Usuarios Success',
	props<{ payload: IFormUser }>()
);

export const setAltaUsuariosError = createAction(
	'[Usuario Component] Set Alta Usuarios Error',
	props<{ payload: any }>()
);

export const setAltaUsuariosClear = createAction('[Usuario Component] Set Alta Usuarios Clear');
