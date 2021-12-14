import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { SetAltaUsuariosReducer } from './alta-usuarios/store/alta-usuarios.reducer';
import { setGetUsuariosReducer } from './data-usuarios/store/get-usuarios.reducer';
import { setGetUsuarioByIdReducer } from './data-usuarios/store/get-usuarios-by-id.reducer';
import { SetModificacionUsuariosReducer } from './modificacion-usuario/store/modificacion-usuarios.reducer';


export interface IUsuariosReducersMap {
	getUsuarios: IState<any>;
	getUsuarioById: IState<any>;
	altaUsuarios: IState<any>;
	modificacionUsuario: IState<any>;
	

}

export const usuariosRedecuersMap: ActionReducerMap<IUsuariosReducersMap> = {
	getUsuarios: setGetUsuariosReducer,
	getUsuarioById: setGetUsuarioByIdReducer,
	altaUsuarios: SetAltaUsuariosReducer,
	modificacionUsuario: SetModificacionUsuariosReducer
};
