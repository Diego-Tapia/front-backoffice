import { createAction, props } from '@ngrx/store';

export const setGetActivos = createAction(
	'[Activos Component] Set Get Activos');

export const setGetActivosSucces = createAction(
	'[Activos Component] Set Get Activos Success',
	props<{ payload: any }>()
);

export const setGetActivosError = createAction(
	'[Activos Component] Set Get Activos Error', 
	props<{ payload: any }>());

export const setGetActivosClear = createAction(
	'[Activos Component] Set Get Activos Clear');
