import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { ITransaccion } from 'src/app/shared/models/transaccion.interface';
import { setReemitirActivos, setReemitirActivosClear, setReemitirActivosError, setReemitirActivosSucces } from './reemitir-activos.actions';

export const initialState: IState<ITransaccion | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetReemitirActivosReducer = createReducer(
	initialState,

	on(setReemitirActivos, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setReemitirActivosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setReemitirActivosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setReemitirActivosClear, (state) => {
		return initialState;
	})
);

export function setReemitirActivosReducer(state: IState<ITransaccion> | undefined, action: Action) {
	return mySetReemitirActivosReducer(state, action);
}
