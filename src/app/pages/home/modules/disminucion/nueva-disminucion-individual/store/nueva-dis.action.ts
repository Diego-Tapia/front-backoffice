import { createAction, props } from '@ngrx/store';
import { IDisminucionIndividual } from 'src/app/shared/models/dec-individual.interface';

export const setNuevaDisminucion = createAction(
	'[Nueva Disminucion Component] Set Nueva Disminucion ',
	props<{ form: IDisminucionIndividual }>()
);

export const setNuevaDisminucionSucces = createAction(
	'[Nueva Disminucion Component] Set Nueva Disminucion Success',
	props<{ payload: any }>()
);

export const setNuevaDisminucionError = createAction(
	'[Nueva Disminucion Component] Set Nueva Disminucion Error',
	props<{ payload: any }>()
);

export const setNuevaDisminucionClear = createAction('[Nueva Disminucion Component] Set Nueva Disminucion Clear');
