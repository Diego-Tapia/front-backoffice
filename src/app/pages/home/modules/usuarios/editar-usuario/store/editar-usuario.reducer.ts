import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { setEditarUsuario,  setEditarUsuarioClear,  setEditarUsuarioError, setEditarUsuarioSucces } from './editar-usuario.action';



export const initialState: IState<IUserProfile | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetEditarUsuarioReducer = createReducer(
	initialState,

	on(setEditarUsuario, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setEditarUsuarioSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setEditarUsuarioError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setEditarUsuarioClear, (state) => {
		return initialState;
	})
);

export function SetEditarUsuarioReducer(state: IState<IUserProfile | null> | undefined, action: Action) {
	return mySetEditarUsuarioReducer(state, action);
}
