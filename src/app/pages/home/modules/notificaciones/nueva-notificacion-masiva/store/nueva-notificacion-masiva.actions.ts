import { createAction, props } from '@ngrx/store';
import { INotificacion } from 'src/app/shared/models/notificacion.interface';

export const setNuevaNotificacion = createAction(
	'[Notificacions Component] Set Nueva Notificacion', 
	props<{ form: INotificacion }>()
);

export const setNuevaNotificacionSucces = createAction(
	'[Notificacions Component] Set Nueva Notificacion Success',
	props<{ payload: INotificacion }>()
);

export const setNuevaNotificacionError = createAction(
	'[Notificacions Component] Set Nueva Notificacion Error',
	props<{ payload: any }>()
);

export const setNuevaNotificacionClear = createAction('[Notificacions Component] Set Nueva Notificacion Clear');
