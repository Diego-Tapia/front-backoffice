import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetUsuariosReducer } from './data-usuarios/store/get-all/get-usuarios.reducer';
import { setGetUsuarioByIdReducer } from './data-usuarios/store/get-by-id/get-usuarios-by-id.reducer';
import { setVerifyUsuarioReducer } from './data-usuarios/store/verify/verify-usuarios.reducer';
import { SetAltaUsuariosReducer } from './alta-usuarios/store/alta-usuario/alta-usuarios.reducer';
import { SetGetRolesReducer } from './alta-usuarios/store/get-roles/get-roles.reducer';
import { SetEditarUsuarioReducer } from './editar-usuario/store/editar-usuario.reducer';


export interface IUsuariosReducersMap {
	getUsuarios: IState<any>;
	getUsuarioById: IState<any>;
	altaUsuarios: IState<any>;
	editarUsuario: IState<any>;
	verifyUsuario: IState<any>;
	getRoles: IState<any>;
}

export const usuariosReducersMap: ActionReducerMap<IUsuariosReducersMap> = {
	getUsuarios: setGetUsuariosReducer,
	getUsuarioById: setGetUsuarioByIdReducer,
	altaUsuarios: SetAltaUsuariosReducer,
	editarUsuario: SetEditarUsuarioReducer,
	verifyUsuario: setVerifyUsuarioReducer,
	getRoles: SetGetRolesReducer
};
