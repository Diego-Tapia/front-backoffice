import { createAction, props } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';

export const setGetActivosById = createAction(
	'[Activos Component] Set Get Activos By Id',
	props<{ id: string }>()
);

export const setGetActivosByIdSucces = createAction(
	'[Activos Component] Set Get Activos By Id Success',
	props<{ payload: IActivo }>()
);

export const setGetActivosByIdError = createAction(
	'[Activos Component] Set Get Activos By Id Error',
	props<{ payload: any }>());

export const setGetActivosByIdClear = createAction(
	'[Activos Component] Set Get Activos By Id Clear'
);
