import { Action, createReducer, on } from '@ngrx/store';
import { INotificacion } from 'src/app/shared/models/notificacion.interface';

import { IState } from 'src/app/shared/models/state.interface';
import {
	setNuevaNotificacion,
	setNuevaNotificacionClear,
	setNuevaNotificacionError,
	setNuevaNotificacionSucces
} from './nueva-notificacion-masiva.actions';

export const initialState: IState<INotificacion | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetNuevaNotificacionReducer = createReducer(
	initialState,

	on(setNuevaNotificacion, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setNuevaNotificacionSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setNuevaNotificacionError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setNuevaNotificacionClear, (state) => {
		return initialState;
	})
);

export function setNuevaNotificacionReducer(state: IState<INotificacion> | undefined, action: Action) {
	return mySetNuevaNotificacionReducer(state, action);
}
