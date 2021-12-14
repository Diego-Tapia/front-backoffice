import { createAction, props } from '@ngrx/store';

export const setGetIncrementos = createAction('[Incremento Component] Set Get Incremento');

export const setGetIncrementosSucces = createAction(
	'[Incremento Component] Set Get Incremento Success',
	props<{ payload: any }>()
);

export const setGetIncrementosError = createAction(
	'[Incremento Component] Set Get Incremento Error',
	props<{ payload: any }>()
);

export const setGetIncrementosClear = createAction('[Incremento Component] Set Get Incremento Clear');
