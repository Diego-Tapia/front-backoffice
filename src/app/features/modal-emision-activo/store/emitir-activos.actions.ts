import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ITransaccion } from 'src/app/shared/models/transaccion.interface';

export const setEmitirActivos = createAction(
	'[Activos Component] Set Emitir Activos',
	props<{ id: string }>());

export const setEmitirActivosSucces = createAction(
	'[Activos Component] Set Emitir Activos Success',
	props<{ payload: ITransaccion }>()
);

export const setEmitirActivosError = createAction(
	'[Activos Component] Set Emitir Activos Error',
	props<{ payload: HttpErrorResponse }>());

export const setEmitirActivosClear = createAction('[Activos Component] Set Emitir Activos Clear');
