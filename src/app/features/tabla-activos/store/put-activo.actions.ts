import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';

export const setPutActivo = createAction(
	'[Activos Component] Set Put Activo',
	props<{ id: string, status: object }>()
);

export const setPutActivoSucces = createAction(
	'[Activos Component] Set Put Activo Success',
	props<{ payload: IActivo }>()
);

export const setPutActivoError = createAction(
	'[Activos Component] Set Put Activo Error',
	props<{ payload: HttpErrorResponse }>()
);

export const setPutActivoClear = createAction('[Activos Component] Set Put Activo Clear');
