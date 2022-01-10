import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IReqIndividual } from 'src/app/shared/models/req-individual.interface';

export const setNuevaDisminucion = createAction(
	'[Nueva Disminucion Component] Set Nueva Disminucion ',
	props<{ form: IReqIndividual }>()
);

export const setNuevaDisminucionSucces = createAction(
	'[Nueva Disminucion Component] Set Nueva Disminucion Success',
	props<{ payload: null }>()
);

export const setNuevaDisminucionError = createAction(
	'[Nueva Disminucion Component] Set Nueva Disminucion Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setNuevaDisminucionClear = createAction('[Nueva Disminucion Component] Set Nueva Disminucion Clear');
