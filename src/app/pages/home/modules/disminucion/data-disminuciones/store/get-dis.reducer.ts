import { Action, createReducer, on, props } from '@ngrx/store';
import { IState } from '../../../../../../shared/models/state.interface';
import {
	setGetDisminuciones,
	setGetDisminucionesClear,
	setGetDisminucionesSuccess,
	setGetDisminucionesError
} from './get-dis.action';

export const initialState: IState<any> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetDisminucionesReducer = createReducer(
	initialState,

	on(setGetDisminuciones, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetDisminucionesSuccess, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),
	on(setGetDisminucionesError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),
	on(setGetDisminucionesClear, (state) => {
		return initialState;
	})
);

export function setGetDisminucionesReducer(state: IState<any> | undefined, action: Action) {
	return mySetGetDisminucionesReducer(state, action);
}
