import { createAction, props } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';

export const setEditarActivo = createAction(
	'[Activos Component] Set Editar Activo',
	props<{ id: string, form: IActivo }>()
);

export const setEditarActivoSucces = createAction(
	'[Activos Component] Set Editar Activo Success',
	props<{ payload: IActivo }>()
);

export const setEditarActivoError = createAction(
	'[Activos Component] Set Editar Activo Error',
	props<{ payload: any }>()
);

export const setEditarActivoClear = createAction('[Activos Component] Set Editar Activo Clear');
