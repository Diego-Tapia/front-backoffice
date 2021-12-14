import { Action, createReducer, on } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivos, setGetActivosClear, setGetActivosError, setGetActivosSucces } from './activos.actions';

export const initialState: IState<IActivo[] | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetActivosReducer = createReducer(
	initialState,

	on(setGetActivos, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetActivosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetActivosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetActivosClear, (state) => {
		return initialState;
	})
);

export function setGetActivosReducer(state: IState<IActivo[]> | undefined, action: Action) {
	return mySetGetActivosReducer(state, action);
}
