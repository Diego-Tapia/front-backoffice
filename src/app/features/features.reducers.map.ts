import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivosByIdReducer } from '../pages/home/modules/activos/data-activos/store/get-by-id/activos-by-id.reducer';
import { setNuevaDisminucionMasivaReducer } from '../pages/home/modules/disminucion/nueva-disminucion-masiva/store/nueva-dis-mas.reducer';
import { setNuevoIncrementoMasivoReducer } from '../pages/home/modules/incremento/nuevo-incremento-masivo/store/nuevo-inc-mas.reducer';
import { SetEditarUsuarioReducer } from '../pages/home/modules/usuarios/editar-usuario/store/editar-usuario.reducer';
import { IActivo } from '../shared/models/activos/activo.interface';
import { IResMasivo } from '../shared/models/res-masivo.interface';
import { ITransaccion } from '../shared/models/transaccion.interface';
import { IUserProfile } from '../shared/models/user-profile.interface';
import { setEmitirActivosReducer } from './modal-emision-activo/store/emitir-activos.reducer';
import { setReemitirActivosReducer } from './modal-reemision-activo/store/reemitir-activos.reducer';
import { setPutActivoReducer } from './tabla-activos/store/put-activo.reducer';


export interface IFeaturesReducersMap {
	emitirActivo: IState<ITransaccion | null>;
	reemitirActivo: IState<ITransaccion | null>;
	getActivosById: IState<IActivo | null>;
	putActivo: IState<IActivo | null>
	nuevoIncrementoMasivo: IState<IResMasivo | null>;
	nuevaDisminucionMasiva: IState<IResMasivo | null>;
	editarUsuario: IState<IUserProfile | null>
}

export const featuresReducersMap: ActionReducerMap<IFeaturesReducersMap> = {
	emitirActivo: setEmitirActivosReducer,
	reemitirActivo: setReemitirActivosReducer,
	getActivosById: setGetActivosByIdReducer,
	putActivo: setPutActivoReducer,
	nuevoIncrementoMasivo: setNuevoIncrementoMasivoReducer,
	nuevaDisminucionMasiva: setNuevaDisminucionMasivaReducer,
	editarUsuario: SetEditarUsuarioReducer
};
