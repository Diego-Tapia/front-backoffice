import { Action, createReducer, on } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setModificarActivo,
	setModificarActivoClear,
	setModificarActivoError,
	setModificarActivoSucces
} from './modificacion-activo.actions';

export const initialState: IState<IActivo | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetModificarActivoReducer = createReducer(
	initialState,

	on(setModificarActivo, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setModificarActivoSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setModificarActivoError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setModificarActivoClear, (state) => {
		return initialState;
	})
);

export function setModificarActivoReducer(state: IState<IActivo> | undefined, action: Action) {
	return mySetModificarActivoReducer(state, action);
}
