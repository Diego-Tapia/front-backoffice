import { createAction, props } from '@ngrx/store';
import { IDataIndividual } from 'src/app/shared/models/data-individual.interface';

export const setNuevoIncremento = createAction(
	'[Nuevo Incremento Component] Set Nuevo Incremento',
	props<{ form: any }>()
);

export const setNuevoIncrementoSucces = createAction(
	'[Nuevo Incremento Component] Set Nuevo Incremento Success',
	props<{ payload: any }>()
);

export const setNuevoIncrementoError = createAction(
	'[Nuevo Incremento Component] Set Nuevo Incremento Error',
	props<{ payload: any }>()
);

export const setNuevoIncrementoClear = createAction('[Nuevo Incremento Component] Set Nuevo Incremento Clear');
