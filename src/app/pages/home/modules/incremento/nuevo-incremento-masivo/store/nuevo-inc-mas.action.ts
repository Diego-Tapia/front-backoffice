import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const setNuevoIncrementoMasivo = createAction(
	'[Nuevo Incremento Masivo Component] Set Nuevo Incremento Masivo',
	props<{ form: FormData }>()
);

export const setNuevoIncrementoMasivoSuccess = createAction(
	'[Nuevo Incremento Masivo Component] Set Nuevo Incremento Masivo Success',
	props<{ payload: any }>()
);

export const setNuevoIncrementoMasivoError = createAction(
	'[Nuevo Incremento Masivo Component] Set Nuevo Incremento Masivo Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setNuevoIncrementoMasivoClear = createAction(
	'[Nuevo Incremento Masivo Component] Set Nuevo Incremento Masivo Clear'
);
