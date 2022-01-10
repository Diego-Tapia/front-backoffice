import { Action, createReducer, on } from '@ngrx/store';
import { IRol } from 'src/app/shared/models/rol.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetRoles, setGetRolesClear, setGetRolesError, setGetRolesSucces } from './get-roles.action';

export const initialState: IState<IRol[] | null> = {
	response: null,
	pending: false,
	success: false,
	error: null
};

const mySetGetRolesReducer = createReducer(
	initialState,

	on(setGetRoles, (state, props) => ({
		...state,
		response: null,
		pending: true,
		success: false,
		error: null
	})),

	on(setGetRolesSucces, (state, props) => ({
		...state,
		response: props.payload,
		pending: false,
		success: true,
		error: null
	})),

	on(setGetRolesError, (state, props) => ({
		...state,
		response: null,
		pending: false,
		success: false,
		error: props.payload
	})),

	on(setGetRolesClear, (state) => {
		return initialState;
	})
);

export function SetGetRolesReducer(state: IState<IRol[] | null> | undefined, action: Action) {
	return mySetGetRolesReducer(state, action);
}
