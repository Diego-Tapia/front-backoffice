import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setNuevaDisminucion,
	setNuevaDisminucionSucces,
	setNuevaDisminucionError,
	setNuevaDisminucionClear
} from './nueva-dis.action';

export const initialState: IState<any> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetNuevaDisminucionReducer = createReducer(
	initialState,

	on(setNuevaDisminucion, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setNuevaDisminucionSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setNuevaDisminucionError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setNuevaDisminucionClear, (state) => {
		return initialState;
	})
);

export function setNuevaDisminucionReducer(state: IState<any> | undefined, action: Action) {
	return mySetNuevaDisminucionReducer(state, action);
}
