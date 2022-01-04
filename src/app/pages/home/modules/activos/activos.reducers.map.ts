import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setNuevoActivoReducer } from './creacion-activo/store/nuevo-activo.reducer';
import { setGetActivosReducer } from './data-activos/store/activos.reducer';
import { setGetActivosByIdReducer } from './data-activos/store/activos-by-id.reducer';
import { setModificarActivoReducer } from './modificacion-activo/store/modificacion-activo.reducer';
import { setGetAplicabilidadesReducer } from './store/get-aplicabilidades.reducer';

export interface IActivosReducersMap {
	getActivos: IState<any>;
	getActivosById: IState<any>;
	nuevoActivo: IState<any>;
	modificarActivo: IState<any>;
	getAplicabilidades: IState<any>;
}

export const activosReducersMap: ActionReducerMap<IActivosReducersMap> = {
	getActivos: setGetActivosReducer,
	getActivosById: setGetActivosByIdReducer,
	nuevoActivo: setNuevoActivoReducer,
	modificarActivo: setModificarActivoReducer,
	getAplicabilidades: setGetAplicabilidadesReducer
};
