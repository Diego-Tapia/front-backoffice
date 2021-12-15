import { createAction, props } from '@ngrx/store';

export const setNuevaDisminucionMasiva = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva',
	props<{ form: FormData }>()
);

export const setNuevaDisminucionMasivaSucces = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Success',
	props<{ payload: any }>()
);

export const setNuevaDisminucionMasivaError = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Error',
	props<{ payload: any }>()
);

export const setNuevaDisminucionMasivaClear = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Clear'
);
