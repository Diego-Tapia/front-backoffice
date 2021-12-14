import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import {
	setGetUsuarioById,
	setGetUsuarioByIdClear,
	setGetUsuarioByIdError,
	setGetUsuarioByIdSucces
} from './get-usuarios-by-id.action';

export const initialState: IState<IUser | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetUsuarioByIdReducer = createReducer(
	initialState,

	on(setGetUsuarioById, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetUsuarioByIdSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetUsuarioByIdError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetUsuarioByIdClear, (state) => {
		return initialState;
	})
);

export function setGetUsuarioByIdReducer(state: IState<IUser> | undefined, action: Action) {
	return mySetGetUsuarioByIdReducer(state, action);
}
