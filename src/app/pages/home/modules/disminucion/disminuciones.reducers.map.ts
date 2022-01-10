import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetDisminucionesReducer } from './data-disminuciones/store/get-dis.reducer';
import { setGetDisminucionesMasivasReducer } from './data-disminuciones/store/get-dis-mas.reducer';
import { setNuevaDisminucionReducer } from './nueva-disminucion-individual/store/nueva-dis.reducer';
import { setNuevaDisminucionMasivaReducer } from './nueva-disminucion-masiva/store/nueva-dis-mas.reducer';
import { setGetActivosReducer } from '../activos/data-activos/store/get-activos/activos.reducer';
import { setVerifyUsuarioReducer } from '../usuarios/data-usuarios/store/verify/verify-usuarios.reducer';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
export interface IDisminucionReducersMap {
	nuevaDisminucion: IState<null>;
	getDisminuciones: IState<any>;
	nuevaDisminucionMasiva: IState<IResMasivo | null>;
	getDisminucionesMasivas: IState<IResMasivo[] | null>;
	getActivos: IState<IActivo[] | null>;
	verifyUsuario: IState<IUserProfile | null>;
}

export const disminucionReducersMap: ActionReducerMap<IDisminucionReducersMap> = {
	nuevaDisminucion: setNuevaDisminucionReducer,
	getDisminuciones: setGetDisminucionesReducer,
	nuevaDisminucionMasiva: setNuevaDisminucionMasivaReducer,
	getDisminucionesMasivas: setGetDisminucionesMasivasReducer,
	getActivos: setGetActivosReducer,
	verifyUsuario: setVerifyUsuarioReducer
};
