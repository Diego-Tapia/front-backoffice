import { Action, createReducer, on } from '@ngrx/store';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { IState } from 'src/app/shared/models/state.interface';

import {
	setGetUsuarios,
	setGetUsuariosClear,
	setGetUsuariosError,
	setGetUsuariosSucces
} from './get-usuarios.action';

export const initialState: IState<IUserProfile[] | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetUsuariosReducer = createReducer(
	initialState,

	on(setGetUsuarios, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetUsuariosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetUsuariosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetUsuariosClear, (state) => {
		return initialState;
	})
);

export function setGetUsuariosReducer(state: IState<IUserProfile[]> | undefined, action: Action) {
	return mySetGetUsuariosReducer(state, action);
}
