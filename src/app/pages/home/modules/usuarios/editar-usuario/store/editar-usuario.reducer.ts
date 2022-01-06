import { Action, createReducer, on } from '@ngrx/store';
import { IFormUser } from 'src/app/shared/models/form-user.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setEditarUsuario,  setEditarUsuarioClear,  setEditarUsuarioError, setEditarUsuarioSucces } from './editar-usuario.action';



export const initialState: IState<IFormUser | null> = {
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

export function SetEditarUsuarioReducer(state: IState<IFormUser> | undefined, action: Action) {
	return mySetEditarUsuarioReducer(state, action);
}
