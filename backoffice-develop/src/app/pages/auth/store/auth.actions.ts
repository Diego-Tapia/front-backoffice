import { createAction, props } from '@ngrx/store';
import { IAuthResponse } from 'src/app/shared/models/auth-response.interface';

export const setAuth = createAction('[Auth Component] Set Auth', props<{ username: string; password: string }>());

export const setAuthSucces = createAction('[Auth Component] Set Auth Success', props<{ payload: IAuthResponse }>());

export const setAuthError = createAction('[Auth Component] Set Auth Error', props<{ payload: any }>());

export const setAuthClear = createAction('[Auth Component] Set Auth Clear');
