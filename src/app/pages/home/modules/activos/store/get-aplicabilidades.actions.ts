import { createAction, props } from '@ngrx/store';

export const setGetAplicabilidades = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades');

export const setGetAplicabilidadesSucces = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades Success',
	props<{ payload: any }>()
);

export const setGetAplicabilidadesError = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades Error',
	props<{ payload: any }>());

export const setGetAplicabilidadesClear = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades Clear');
