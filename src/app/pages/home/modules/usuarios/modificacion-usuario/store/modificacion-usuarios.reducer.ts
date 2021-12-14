import { Action, createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import { setModificacionUsuarios,  setModificacionUsuariosClear,  setModificacionUsuariosError, setModificacionUsuariosSucces } from './modificacion-usuarios.action';



export const initialState: IState<IUser | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetModificacionUsuariosReducer = createReducer(
	initialState,

	on(setModificacionUsuarios, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setModificacionUsuariosSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setModificacionUsuariosError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setModificacionUsuariosClear, (state) => {
		return initialState;
	})
);

export function SetModificacionUsuariosReducer(state: IState<IUser> | undefined, action: Action) {
	return mySetModificacionUsuariosReducer(state, action);
}
