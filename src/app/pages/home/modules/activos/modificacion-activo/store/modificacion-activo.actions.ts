import { createAction, props } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';

export const setModificarActivo = createAction(
	'[Activos Component] Set Modificar Activo',
	props<{ id: string, form: IActivo }>()
);

export const setModificarActivoSucces = createAction(
	'[Activos Component] Set Modificar Activo Success',
	props<{ payload: IActivo }>()
);

export const setModificarActivoError = createAction(
	'[Activos Component] Set Modificar Activo Error',
	props<{ payload: any }>()
);

export const setModificarActivoClear = createAction('[Activos Component] Set Modificar Activo Clear');
