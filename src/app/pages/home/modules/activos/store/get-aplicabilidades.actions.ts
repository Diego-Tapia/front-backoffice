import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IAplicabilidad } from 'src/app/shared/models/activos/aplicabilidad.interface';

export const setGetAplicabilidades = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades');

export const setGetAplicabilidadesSucces = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades Success',
	props<{ payload: IAplicabilidad[] }>()
);

export const setGetAplicabilidadesError = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades Error',
	props<{ payload: HttpErrorResponse }>());

export const setGetAplicabilidadesClear = createAction(
	'[Aplicabilidades Component] Set Get Aplicabilidades Clear');
