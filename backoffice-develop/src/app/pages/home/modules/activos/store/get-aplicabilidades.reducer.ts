import { Action, createReducer, on } from '@ngrx/store';
import { IAplicabilidad } from 'src/app/shared/models/aplicabilidad.interface';

import { IState } from 'src/app/shared/models/state.interface';
import { setGetAplicabilidades, setGetAplicabilidadesClear, setGetAplicabilidadesError, setGetAplicabilidadesSucces } from './get-aplicabilidades.actions';

export const initialState: IState<IAplicabilidad[] | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetAplicabilidadesReducer = createReducer(
	initialState,

	on(setGetAplicabilidades, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetAplicabilidadesSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetAplicabilidadesError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetAplicabilidadesClear, (state) => {
		return initialState;
	})
);

export function setGetAplicabilidadesReducer(state: IState<IAplicabilidad[]> | undefined, action: Action) {
	return mySetGetAplicabilidadesReducer(state, action);
}
