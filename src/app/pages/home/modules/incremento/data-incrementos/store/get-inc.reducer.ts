import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setGetIncrementos,
	setGetIncrementosClear,
	setGetIncrementosError,
	setGetIncrementosSucces
} from './get-inc.action';

export const initialState: IState<any> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetIncrementosReducer = createReducer(
	initialState,

	on(setGetIncrementos, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetIncrementosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetIncrementosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetIncrementosClear, (state) => {
		return initialState;
	})
);

export function setGetIncrementosReducer(state: IState<any> | undefined, action: Action) {
	return mySetGetIncrementosReducer(state, action);
}
