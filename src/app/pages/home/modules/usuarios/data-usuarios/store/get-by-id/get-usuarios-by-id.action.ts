import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';


export const setGetUsuarioById = createAction(
	'[Usuario Component] Set Get Usuario By Id',
	props<{ userType:string, id: string }>()
	);

export const setGetUsuarioByIdSucces = createAction(
	'[Usuario Component] Set Get Usuario By Id Success',
	props<{ payload: IUserProfile }>()
);

export const setGetUsuarioByIdError = createAction(
	'[Usuario Component] Set Get Usuario By Id Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setGetUsuarioByIdClear = createAction('[Usuario Component] Set Get Usuario By Id Clear');
