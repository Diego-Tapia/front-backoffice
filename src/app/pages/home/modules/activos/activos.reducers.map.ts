import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setNuevoActivoReducer } from './nuevo-activo/store/nuevo-activo.reducer';
import { setGetActivosReducer } from './data-activos/store/activos.reducer';
import { setGetActivosByIdReducer } from './data-activos/store/activos-by-id.reducer';
import { setGetAplicabilidadesReducer } from './store/get-aplicabilidades.reducer';
import { setEditarActivoReducer } from './editar-activo/store/editar-activo.reducer';

export interface IActivosReducersMap {
	getActivos: IState<any>;
	getActivosById: IState<any>;
	nuevoActivo: IState<any>;
	editarActivo: IState<any>;
	getAplicabilidades: IState<any>;
}

export const activosReducersMap: ActionReducerMap<IActivosReducersMap> = {
	getActivos: setGetActivosReducer,
	getActivosById: setGetActivosByIdReducer,
	nuevoActivo: setNuevoActivoReducer,
	editarActivo: setEditarActivoReducer,
	getAplicabilidades: setGetAplicabilidadesReducer
};
