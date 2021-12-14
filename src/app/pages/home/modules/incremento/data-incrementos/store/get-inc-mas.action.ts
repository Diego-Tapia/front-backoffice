import { createAction, props } from '@ngrx/store';

export const setGetIncrementosMasivos = createAction('[Incremento Masivo Component] Set Get Incremento Masivo');

export const setGetIncrementosMasivosSucces = createAction(
	'[Incremento Masivo Component] Set Get Incremento Masivo Succes',
	props<{ payload: any }>()
);

export const setGetIncrementosMasivosError = createAction(
	'[Incremento Masivo Component] Set Get Incremento Masivo Error',
	props<{ payload: any }>()
);

export const setGetIncrementosMasivosClear = createAction(
	'[Incremento Masivo Component] Set Get Incremento Masivo Clear'
);
