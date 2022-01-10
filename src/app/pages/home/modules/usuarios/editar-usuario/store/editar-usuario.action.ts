import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IReqUser, IUserStatus } from 'src/app/shared/models/req-user.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';

export const setEditarUsuario = createAction(
	'[Usuario Component] Set Editar Usuario',
	props<{ id:string, form:IReqUser | IUserStatus, userType: string }>()
	);

export const setEditarUsuarioSucces = createAction(
	'[Usuario Component] Set Editar Usuario Success',
	props<{ payload: IUserProfile }>()
);

export const setEditarUsuarioError = createAction(
	'[Usuario Component] Set Editar Usuario Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setEditarUsuarioClear = createAction('[Usuario Component] Set Editar Usuario Clear');
