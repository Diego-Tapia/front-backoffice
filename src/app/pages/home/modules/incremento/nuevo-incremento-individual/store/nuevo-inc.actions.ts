import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IResIndividual } from 'src/app/shared/models/res-individual.interface';

export const setNuevoIncremento = createAction(
	'[Nuevo Incremento Component] Set Nuevo Incremento',
	props<{ form: IResIndividual }>()
);

export const setNuevoIncrementoSucces = createAction(
	'[Nuevo Incremento Component] Set Nuevo Incremento Success',
	props<{ payload: null }>()
);

export const setNuevoIncrementoError = createAction(
	'[Nuevo Incremento Component] Set Nuevo Incremento Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setNuevoIncrementoClear = createAction('[Nuevo Incremento Component] Set Nuevo Incremento Clear');
