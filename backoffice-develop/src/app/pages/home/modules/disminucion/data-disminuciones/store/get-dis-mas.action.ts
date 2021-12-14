import { createAction, props } from '@ngrx/store';

export const setGetDisminucionesMasivas = createAction('[Disminucion Masiva Component] Set Get Disminucion Masiva');

export const setGetDisminucionesMasivasSuccess = createAction(
	'[Disminucion Masiva Component] Set Get Disminucion Masiva Success',
	props<{ payload: any }>()
);

export const setGetDisminucionesMasivasError = createAction(
	'[Disminucion Masiva Component] Set Get Disminucion Masiva Error',
	props<{ payload: any }>()
);

export const setGetDisminucionesMasivasClear = createAction(
	'[Disminucion Masiva Component] Set Get Disminucion Masiva Clear'
);
