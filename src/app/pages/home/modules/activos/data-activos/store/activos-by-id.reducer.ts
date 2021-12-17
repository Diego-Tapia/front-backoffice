import { Action, createReducer, on } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivosById, setGetActivosByIdClear, setGetActivosByIdError, setGetActivosByIdSucces } from './activos-by-id.actions';

export const initialState: IState<IActivo | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetActivosByIdReducer = createReducer(
	initialState,

	on(setGetActivosById, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetActivosByIdSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetActivosByIdError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetActivosByIdClear, (state) => {
		return initialState;
	})
);

export function setGetActivosByIdReducer(state: IState<IActivo> | undefined, action: Action) {
	return mySetGetActivosByIdReducer(state, action);
}
