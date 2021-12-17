import { Action, createReducer, on } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setNuevoActivo,
	setNuevoActivoClear,
	setNuevoActivoError,
	setNuevoActivoSucces
} from './nuevo-activo.actions';

export const initialState: IState<IActivo | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetNuevoActivoReducer = createReducer(
	initialState,

	on(setNuevoActivo, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setNuevoActivoSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setNuevoActivoError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setNuevoActivoClear, (state) => {
		return initialState;
	})
);

export function setNuevoActivoReducer(state: IState<IActivo> | undefined, action: Action) {
	return mySetNuevoActivoReducer(state, action);
}
