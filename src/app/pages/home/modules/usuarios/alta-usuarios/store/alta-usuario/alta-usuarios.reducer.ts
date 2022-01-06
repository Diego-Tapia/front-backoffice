import { Action, createReducer, on } from '@ngrx/store';
import { IFormUser } from 'src/app/shared/models/form-user.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setAltaUsuarios,  setAltaUsuariosClear,  setAltaUsuariosError, setAltaUsuariosSucces } from './alta-usuarios.action';



export const initialState: IState<IFormUser | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetAltaUsuariosReducer = createReducer(
	initialState,

	on(setAltaUsuarios, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setAltaUsuariosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setAltaUsuariosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setAltaUsuariosClear, (state) => {
		return initialState;
	})
);

export function SetAltaUsuariosReducer(state: IState<IFormUser> | undefined, action: Action) {
	return mySetAltaUsuariosReducer(state, action);
}
