import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { SetAltaUsuariosReducer } from './alta-usuarios/store/alta-usuarios.reducer';
import { SetModificacionUsuariosReducer } from './modificacion-usuario/store/modificacion-usuarios.reducer';
import { SetGetRolesReducer } from './alta-usuarios/store/get-roles.reducer';
import { setGetUsuariosReducer } from './data-usuarios/store/get-all/get-usuarios.reducer';
import { setGetUsuarioByIdReducer } from './data-usuarios/store/get-by-id/get-usuarios-by-id.reducer';
import { setVerifyUsuarioReducer } from './data-usuarios/store/verify/verify-usuarios.reducer';


export interface IUsuariosReducersMap {
	getUsuarios: IState<any>;
	getUsuarioById: IState<any>;
	altaUsuarios: IState<any>;
	modificacionUsuario: IState<any>;
	verifyUsuario: IState<any>;
	getRoles: IState<any>;
}

export const usuariosRedecuersMap: ActionReducerMap<IUsuariosReducersMap> = {
	getUsuarios: setGetUsuariosReducer,
	getUsuarioById: setGetUsuarioByIdReducer,
	altaUsuarios: SetAltaUsuariosReducer,
	modificacionUsuario: SetModificacionUsuariosReducer,
	verifyUsuario: setVerifyUsuarioReducer,
	getRoles: SetGetRolesReducer
};
