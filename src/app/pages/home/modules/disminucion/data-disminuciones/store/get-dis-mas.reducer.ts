import { Action, createReducer, on, props } from '@ngrx/store';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';
import { IState } from '../../../../../../shared/models/state.interface';
import {
	setGetDisminucionesMasivas,
	setGetDisminucionesMasivasClear,
	setGetDisminucionesMasivasSuccess,
	setGetDisminucionesMasivasError
} from './get-dis-mas.action';

export const initialState: IState<IResMasivo[] | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetDisminucionesMasivasReducer = createReducer(
	initialState,

	on(setGetDisminucionesMasivas, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetDisminucionesMasivasSuccess, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),
	on(setGetDisminucionesMasivasError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),
	on(setGetDisminucionesMasivasClear, (state) => {
		return initialState;
	})
);

export function setGetDisminucionesMasivasReducer(state: IState<IResMasivo[] | null> | undefined, action: Action) {
	return mySetGetDisminucionesMasivasReducer(state, action);
}
