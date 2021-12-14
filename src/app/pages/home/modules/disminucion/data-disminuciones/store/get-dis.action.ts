import { createAction, props } from '@ngrx/store';

export const setGetDisminuciones = createAction('[Disminucion Component] Set Get Disminucion');

export const setGetDisminucionesSuccess = createAction(
	'[Disminucion Component] Set Get Disminucion Success',
	props<{ payload: any }>()
);

export const setGetDisminucionesError = createAction(
	'[Disminucion Component] Set Get Disminucion Error',
	props<{ payload: any }>()
);

export const setGetDisminucionesClear = createAction('[Disminucion Component] Set Get Disminucion Clear');
