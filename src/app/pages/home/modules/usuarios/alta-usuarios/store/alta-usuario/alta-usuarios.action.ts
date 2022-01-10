import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IReqUser } from 'src/app/shared/models/req-user.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';

export const setAltaUsuarios = createAction(
	'[Usuario Component] Set Alta Usuarios',
	props<{ form: IReqUser, userType: string }>()
);

export const setAltaUsuariosSucces = createAction(
	'[Usuario Component] Set Alta Usuarios Success',
	props<{ payload: IUserProfile }>()
);

export const setAltaUsuariosError = createAction(
	'[Usuario Component] Set Alta Usuarios Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setAltaUsuariosClear = createAction('[Usuario Component] Set Alta Usuarios Clear');
