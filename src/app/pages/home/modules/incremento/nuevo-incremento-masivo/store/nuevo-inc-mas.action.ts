import { createAction, props } from '@ngrx/store';
import { IIncrementoIndividual } from '../../../../../../shared/models/incremento-individual-tabla.interface';

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
	props<{ payload: any }>()
);

export const setNuevoIncrementoMasivoClear = createAction(
	'[Nuevo Incremento Masivo Component] Set Nuevo Incremento Masivo Clear'
);
