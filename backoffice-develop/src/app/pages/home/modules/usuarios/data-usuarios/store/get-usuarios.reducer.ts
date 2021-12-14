import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import {
	setGetUsuarios,
	setGetUsuariosClear,
	setGetUsuariosError,
	setGetUsuariosSucces
} from './get-usuarios.action';

export const initialState: IState<IUser[] | null> = {
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

export function setGetUsuariosReducer(state: IState<IUser[]> | undefined, action: Action) {
	return mySetGetUsuariosReducer(state, action);
}
