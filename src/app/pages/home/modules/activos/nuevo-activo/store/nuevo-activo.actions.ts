import { createAction, props } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';

export const setNuevoActivo = createAction(
	'[Activos Component] Set Nuevo Activo',
	props<{ form: IActivo }>()
);

export const setNuevoActivoSucces = createAction(
	'[Activos Component] Set Nuevo Activo Success',
	props<{ payload: IActivo }>()
);

export const setNuevoActivoError = createAction(
	'[Activos Component] Set Nuevo Activo Error',
	props<{ payload: any }>()
);

export const setNuevoActivoClear = createAction('[Activos Component] Set Nuevo Activo Clear');
