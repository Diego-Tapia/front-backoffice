import { Action, createReducer, on } from '@ngrx/store';
import { IAuthResponse } from 'src/app/shared/models/auth-response.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setAuth, setAuthClear, setAuthError, setAuthSucces } from './auth.actions';

export const initialState: IState<IAuthResponse | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetAuthReducer = createReducer(
	initialState,

	on(setAuth, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setAuthSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setAuthError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setAuthClear, (state) => {
		return initialState;
	})
);

export function setAuthReducer(state: IState<IAuthResponse | null> | undefined, action: Action) {
	return mySetAuthReducer(state, action);
}
