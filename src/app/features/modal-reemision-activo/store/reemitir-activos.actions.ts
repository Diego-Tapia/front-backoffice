import { createAction, props } from '@ngrx/store';
import { IReemisionActivo } from 'src/app/shared/models/activos/reemision-activo.interface';
import { ITransaccion } from 'src/app/shared/models/transaccion.interface';

export const setReemitirActivos = createAction(
	'[Activos Component] Set Reemitir Activos',
	props<{ form: IReemisionActivo }>());

export const setReemitirActivosSucces = createAction(
	'[Activos Component] Set Reemitir Activos Success',
	props<{ payload: ITransaccion }>()
);

export const setReemitirActivosError = createAction(
	'[Activos Component] Set Reemitir Activos Error',
	props<{ payload: any }>());

export const setReemitirActivosClear = createAction(
	'[Activos Component] Set Reemitir Activos Clear');
