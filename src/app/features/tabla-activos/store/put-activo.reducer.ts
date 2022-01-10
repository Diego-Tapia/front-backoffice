import { Action, createReducer, on } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setPutActivo,
	setPutActivoClear,
	setPutActivoError,
	setPutActivoSucces
} from './put-activo.actions';

export const initialState: IState<IActivo | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetPutActivoReducer = createReducer(
	initialState,

	on(setPutActivo, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setPutActivoSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setPutActivoError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setPutActivoClear, (state) => {
		return initialState;
	})
);

export function setPutActivoReducer(state: IState<IActivo | null> | undefined, action: Action) {
	return mySetPutActivoReducer(state, action);
}
