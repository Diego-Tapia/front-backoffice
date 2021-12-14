import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetDisminucionesReducer } from './data-disminuciones/store/get-dis.reducer';
import { setGetDisminucionesMasivasReducer } from './data-disminuciones/store/get-dis-mas.reducer';
import { setNuevaDisminucionReducer } from './nueva-disminucion-individual/store/nueva-dis.reducer';
import { setNuevaDisminucionMasivaReducer } from './nueva-disminucion-masiva/store/nueva-dis-mas.reducer';
import { setGetActivosReducer } from '../activos/data-activos/store/activos.reducer';
export interface IDisminucionReducersMap {
	nuevaDisminucion: IState<any>;
	getDisminuciones: IState<any>;
	nuevaDisminucionMasiva: IState<any>;
	getDisminucionesMasivas: IState<any>;
	getActivos: IState<any>;
}

export const disminucionRedecuersMap: ActionReducerMap<IDisminucionReducersMap> = {
	nuevaDisminucion: setNuevaDisminucionReducer,
	getDisminuciones: setGetDisminucionesReducer,
	nuevaDisminucionMasiva: setNuevaDisminucionMasivaReducer,
	getDisminucionesMasivas: setGetDisminucionesMasivasReducer,
	getActivos: setGetActivosReducer
};
