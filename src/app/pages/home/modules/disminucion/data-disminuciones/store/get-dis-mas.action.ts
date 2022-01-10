import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';

export const setGetDisminucionesMasivas = createAction('[Disminucion Masiva Component] Set Get Disminucion Masiva');

export const setGetDisminucionesMasivasSuccess = createAction(
	'[Disminucion Masiva Component] Set Get Disminucion Masiva Success',
	props<{ payload: IResMasivo[] }>()
);

export const setGetDisminucionesMasivasError = createAction(
	'[Disminucion Masiva Component] Set Get Disminucion Masiva Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setGetDisminucionesMasivasClear = createAction(
	'[Disminucion Masiva Component] Set Get Disminucion Masiva Clear'
);
