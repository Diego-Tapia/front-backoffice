import { createAction, props } from '@ngrx/store';
import { IFormUser, IUserStatus } from 'src/app/shared/models/form-user.interface';

export const setModificacionUsuarios = createAction(
	'[Usuario Component] Set Modificacion Usuarios',
	props<{ id:string, form:IFormUser | IUserStatus, userType: string }>()
	);

export const setModificacionUsuariosSucces = createAction(
	'[Usuario Component] Set Modificacion Usuarios Success',
	props<{ payload: IFormUser }>()
);

export const setModificacionUsuariosError = createAction(
	'[Usuario Component] Set Modificacion Usuarios Error',
	props<{ payload: any }>()
);

export const setModificacionUsuariosClear = createAction('[Usuario Component] Set Modificacion Usuarios Clear');
