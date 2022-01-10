import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';

export const setGetUsuarios = createAction(
	'[Usuario Component] Set Get Usuario',
	props<{ userType: string }>());

export const setGetUsuariosSucces = createAction(
	'[Usuario Component] Set Get Usuario Success',
	props<{ payload: IUserProfile[] }>()
);

export const setGetUsuariosError = createAction(
	'[Usuario Component] Set Get Usuario Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setGetUsuariosClear = createAction('[Usuario Component] Set Get Usuario Clear');
