import { createAction, props } from '@ngrx/store';

export const setGetNotificaciones = createAction('[Notificaciones Component] Set Get Notificaciones');

export const setGetNotificacionesSucces = createAction(
	'[Notificaciones Component] Set Get Notificaciones Success',
	props<{ payload: any }>()
);

export const setGetNotificacionesError = createAction(
	'[Notificaciones Component] Set Get Notificaciones Error', 
	props<{ payload: any }>()
);

export const setGetNotificacionesClear = createAction(
	'[Notificaciones Component] Set Get Notificaciones Clear');
