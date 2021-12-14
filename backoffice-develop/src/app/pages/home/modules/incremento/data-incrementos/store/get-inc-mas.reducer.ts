import { Action, createReducer, on, props } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setGetIncrementosMasivos,
	setGetIncrementosMasivosSucces,
	setGetIncrementosMasivosError,
	setGetIncrementosMasivosClear
} from './get-inc-mas.action';

export const initialState: IState<any> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetIncrementosMasivosReducer = createReducer(
	initialState,

	on(setGetIncrementosMasivos, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetIncrementosMasivosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetIncrementosMasivosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetIncrementosMasivosClear, (status) => {
		return initialState;
	})
);

export function setGetIncrementosMasivosReducer(state: IState<any> | undefined, action: Action) {
	return mySetGetIncrementosMasivosReducer(state, action);
}
