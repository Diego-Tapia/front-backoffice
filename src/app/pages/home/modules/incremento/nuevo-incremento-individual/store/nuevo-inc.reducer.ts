import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setNuevoIncremento,
	setNuevoIncrementoClear,
	setNuevoIncrementoError,
	setNuevoIncrementoSucces
} from './nuevo-inc.actions';

export const initialState: IState<any> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetNuevoIncrementoReducer = createReducer(
	initialState,

	on(setNuevoIncremento, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setNuevoIncrementoSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setNuevoIncrementoError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setNuevoIncrementoClear, (state) => {
		return initialState;
	})
);

export function setNuevoIncrementoReducer(state: IState<any> | undefined, action: Action) {
	return mySetNuevoIncrementoReducer(state, action);
}
