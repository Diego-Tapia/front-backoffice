import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { ITransaccion } from 'src/app/shared/models/transaccion.interface';
import { setEmitirActivos, setEmitirActivosClear, setEmitirActivosError, setEmitirActivosSucces } from './emitir-activos.actions';

export const initialState: IState<ITransaccion | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetEmitirActivosReducer = createReducer(
	initialState,

	on(setEmitirActivos, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setEmitirActivosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setEmitirActivosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setEmitirActivosClear, (state) => {
		return initialState;
	})
);

export function setEmitirActivosReducer(state: IState<ITransaccion | null> | undefined, action: Action) {
	return mySetEmitirActivosReducer(state, action);
}
