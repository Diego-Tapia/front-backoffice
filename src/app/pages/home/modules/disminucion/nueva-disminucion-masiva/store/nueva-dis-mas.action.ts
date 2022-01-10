import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';

export const setNuevaDisminucionMasiva = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva',
	props<{ form: FormData }>()
);

export const setNuevaDisminucionMasivaSucces = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Success',
	props<{ payload: IResMasivo }>()
);

export const setNuevaDisminucionMasivaError = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setNuevaDisminucionMasivaClear = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Clear'
);
