import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setNuevoIncrementoMasivo,
	setNuevoIncrementoMasivoSuccess,
	setNuevoIncrementoMasivoError,
	setNuevoIncrementoMasivoClear
} from './nuevo-inc-mas.action';

export const initialState: IState<any> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetNuevoIncrementoMasivoReducer = createReducer(
	initialState,

	on(setNuevoIncrementoMasivo, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setNuevoIncrementoMasivoSuccess, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setNuevoIncrementoMasivoError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setNuevoIncrementoMasivoClear, (state) => {
		return initialState;
	})
);

export function setNuevoIncrementoMasivoReducer(state: IState<any> | undefined, action: Action) {
	return mySetNuevoIncrementoMasivoReducer(state, action);
}
