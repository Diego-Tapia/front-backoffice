import { Action, createReducer, on } from '@ngrx/store';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import {
	setNuevaDisminucionMasiva,
	setNuevaDisminucionMasivaSucces,
	setNuevaDisminucionMasivaError,
	setNuevaDisminucionMasivaClear
} from './nueva-dis-mas.action';

export const initialState: IState<IResMasivo | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetNuevaDisminucionMasivaReducer = createReducer(
	initialState,

	on(setNuevaDisminucionMasiva, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setNuevaDisminucionMasivaSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setNuevaDisminucionMasivaError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setNuevaDisminucionMasivaClear, (state) => {
		return initialState;
	})
);

export function setNuevaDisminucionMasivaReducer(state: IState<IResMasivo | null> | undefined, action: Action) {
	return mySetNuevaDisminucionMasivaReducer(state, action);
}
