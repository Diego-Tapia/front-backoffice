import { Action, createReducer, on } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setEditarActivo,
	setEditarActivoClear,
	setEditarActivoError,
	setEditarActivoSucces
} from './editar-activo.actions';

export const initialState: IState<IActivo | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetEditarActivoReducer = createReducer(
	initialState,

	on(setEditarActivo, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setEditarActivoSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setEditarActivoError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setEditarActivoClear, (state) => {
		return initialState;
	})
);

export function setEditarActivoReducer(state: IState<IActivo> | undefined, action: Action) {
	return mySetEditarActivoReducer(state, action);
}
