import { createAction, props } from '@ngrx/store';
import { IFormIndividual } from 'src/app/shared/models/form-individual.interface';

export const setNuevaDisminucion = createAction(
	'[Nueva Disminucion Component] Set Nueva Disminucion ',
	props<{ form: IFormIndividual }>()
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
