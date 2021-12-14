import { createAction, props } from '@ngrx/store';
import { IIncrementoIndividual } from 'src/app/shared/models/incremento-individual.interface';

export const setNuevaDisminucionMasiva = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva',
	props<{ form: IIncrementoIndividual }>()
);

export const setNuevaDisminucionMasivaSucces = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Success',
	props<{ payload: any }>()
);

export const setNuevaDisminucionMasivaError = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Error',
	props<{ payload: any }>()
);

export const setNuevaDisminucionMasivaClear = createAction(
	'[Nueva Disminucion Masiva Component] Set Nueva Disminucion Masiva Clear'
);
