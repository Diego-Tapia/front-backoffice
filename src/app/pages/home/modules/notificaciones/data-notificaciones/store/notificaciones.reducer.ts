import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetNotificaciones, setGetNotificacionesClear, setGetNotificacionesError, setGetNotificacionesSucces } from './notificaciones.actions';

export const initialState: IState<any> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetNotificacionesReducer = createReducer(
	initialState,

	on(setGetNotificaciones, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetNotificacionesSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetNotificacionesError, (state, props) => ({
		...state,
		response: null,
		peding: false,
		success: false,
		error: props.payload
	})),

	on(setGetNotificacionesClear, (state) => {
		return initialState;
	})
);

export function setGetNotificacionesReducer(state: IState<any> | undefined, action: Action) {
	return mySetGetNotificacionesReducer(state, action);
}
