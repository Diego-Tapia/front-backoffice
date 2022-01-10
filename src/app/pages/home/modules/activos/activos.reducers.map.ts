import { ActionReducerMap } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { setNuevoActivoReducer } from './nuevo-activo/store/nuevo-activo.reducer';
import { setGetActivosReducer } from './data-activos/store/get-activos/activos.reducer';
import { setGetActivosByIdReducer } from './data-activos/store/get-by-id/activos-by-id.reducer';
import { setGetAplicabilidadesReducer } from './store/get-aplicabilidades.reducer';
import { setEditarActivoReducer } from './editar-activo/store/editar-activo.reducer';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IAplicabilidad } from 'src/app/shared/models/activos/aplicabilidad.interface';

export interface IActivosReducersMap {
	getActivos: IState<IActivo[] | null>;
	getActivosById: IState<IActivo | null>;
	nuevoActivo: IState<IActivo | null>;
	editarActivo: IState<IActivo | null>;
	getAplicabilidades: IState<IAplicabilidad[] | null>;
}

export const activosReducersMap: ActionReducerMap<IActivosReducersMap> = {
	getActivos: setGetActivosReducer,
	getActivosById: setGetActivosByIdReducer,
	nuevoActivo: setNuevoActivoReducer,
	editarActivo: setEditarActivoReducer,
	getAplicabilidades: setGetAplicabilidadesReducer
};
