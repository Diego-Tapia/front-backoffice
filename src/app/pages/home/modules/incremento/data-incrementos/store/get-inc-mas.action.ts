import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';

export const setGetIncrementosMasivos = createAction('[Incremento Masivo Component] Set Get Incremento Masivo');

export const setGetIncrementosMasivosSucces = createAction(
	'[Incremento Masivo Component] Set Get Incremento Masivo Succes',
	props<{ payload: IResMasivo[] }>()
);

export const setGetIncrementosMasivosError = createAction(
	'[Incremento Masivo Component] Set Get Incremento Masivo Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setGetIncrementosMasivosClear = createAction(
	'[Incremento Masivo Component] Set Get Incremento Masivo Clear'
);
