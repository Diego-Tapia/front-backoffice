import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivosByIdReducer } from '../pages/home/modules/activos/data-activos/store/activos-by-id.reducer';
import { setNuevaDisminucionMasivaReducer } from '../pages/home/modules/disminucion/nueva-disminucion-masiva/store/nueva-dis-mas.reducer';
import { setNuevoIncrementoMasivoReducer } from '../pages/home/modules/incremento/nuevo-incremento-masivo/store/nuevo-inc-mas.reducer';

import { setEmitirActivosReducer } from './modal-emision-activo/store/emitir-activos.reducer';
import { setReemitirActivosReducer } from './modal-reemision-activo/store/reemitir-activos.reducer';
import { setPutActivoReducer } from './tabla-activos/store/put-activo.reducer';


export interface IFeaturesReducersMap {
	emitirActivo: IState<any>;
	reemitirActivo: IState<any>;
	getActivosById: IState<any>;
	putActivo: IState<any>
	nuevoIncrementoMasivo: IState<any>;
	nuevaDisminucionMasiva: IState<any>;
}

export const featuresRedecuersMap: ActionReducerMap<IFeaturesReducersMap> = {
	emitirActivo: setEmitirActivosReducer,
	reemitirActivo: setReemitirActivosReducer,
	getActivosById: setGetActivosByIdReducer,
	putActivo: setPutActivoReducer,
	nuevoIncrementoMasivo: setNuevoIncrementoMasivoReducer,
	nuevaDisminucionMasiva: setNuevaDisminucionMasivaReducer,
};
