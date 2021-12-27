import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import {
	setVerifyUsuario,
	setVerifyUsuarioClear,
	setVerifyUsuarioError,
	setVerifyUsuarioSucces
} from './verify-usuarios.action';

export const initialState: IState<IUserProfile | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetVerifyUsuarioReducer = createReducer(
	initialState,

	on(setVerifyUsuario, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setVerifyUsuarioSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setVerifyUsuarioError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setVerifyUsuarioClear, (state) => {
		return initialState;
	})
);

export function setVerifyUsuarioReducer(state: IState<IUserProfile> | undefined, action: Action) {
	return mySetVerifyUsuarioReducer(state, action);
}
