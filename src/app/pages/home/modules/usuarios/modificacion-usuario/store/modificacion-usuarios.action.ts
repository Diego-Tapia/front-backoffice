import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.interface';

export const setModificacionUsuarios = createAction(
	'[Usuario Component] Set Modificacion Usuarios',
	props<{ id:string, form:IUser }>()
	);

export const setModificacionUsuariosSucces = createAction(
	'[Usuario Component] Set Modificacion Usuarios Success',
	props<{ payload: IUser }>()
);

export const setModificacionUsuariosError = createAction(
	'[Usuario Component] Set Modificacion Usuarios Error',
	props<{ payload: any }>()
);

export const setModificacionUsuariosClear = createAction('[Usuario Component] Set Modificacion Usuarios Clear');
