import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.interface';

export const setGetUsuarioById = createAction(
	'[Usuario Component] Set Get Usuario By Id',
	props<{ userType:string, id: string }>()
	);

export const setGetUsuarioByIdSucces = createAction(
	'[Usuario Component] Set Get Usuario By Id Success',
	props<{ payload: IUser }>()
);

export const setGetUsuarioByIdError = createAction(
	'[Usuario Component] Set Get Usuario By Id Error',
	props<{ payload: any }>()
);

export const setGetUsuarioByIdClear = createAction('[Usuario Component] Set Get Usuario By Id Clear');
