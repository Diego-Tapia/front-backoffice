import { ActionReducerMap } from '@ngrx/store';
import { INotificacion } from 'src/app/shared/models/notificacion.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetNotificacionesReducer } from './data-notificaciones/store/notificaciones.reducer';
import { setNuevaNotificacionReducer } from './nueva-notificacion-masiva/store/nueva-notificacion-masiva.reducer';

export interface INotificacionesReducersMap {
	getNotificaciones: IState<any>;
	nuevaNotificacion: IState<any>
	// getNotificacionesById: IState<any>;
}

export const notificacionesRedecuersMap: ActionReducerMap<INotificacionesReducersMap> = {
	getNotificaciones: setGetNotificacionesReducer,
	nuevaNotificacion: setNuevaNotificacionReducer,
};
