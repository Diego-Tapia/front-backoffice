import { createAction, props } from '@ngrx/store';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';


export const setVerifyUsuario = createAction(
	'[Usuario Component] Set Verify Usuario',
	props<{ userIdentifier: string }>()
	);

export const setVerifyUsuarioSucces = createAction(
	'[Usuario Component] Set Verify Usuario Success',
	props<{ payload: IUserProfile }>()
);

export const setVerifyUsuarioError = createAction(
	'[Usuario Component] Set Verify Usuario Error',
	props<{ payload: any }>()
);

export const setVerifyUsuarioClear = createAction('[Usuario Component] Set Verify Usuario Clear');
