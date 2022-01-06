import { createAction, props } from '@ngrx/store';
import { IFormUser, IUserStatus } from 'src/app/shared/models/form-user.interface';

export const setEditarUsuario = createAction(
	'[Usuario Component] Set Editar Usuario',
	props<{ id:string, form:IFormUser | IUserStatus, userType: string }>()
	);

export const setEditarUsuarioSucces = createAction(
	'[Usuario Component] Set Editar Usuario Success',
	props<{ payload: IFormUser }>()
);

export const setEditarUsuarioError = createAction(
	'[Usuario Component] Set Editar Usuario Error',
	props<{ payload: any }>()
);

export const setEditarUsuarioClear = createAction('[Usuario Component] Set Editar Usuario Clear');
