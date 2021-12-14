import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setReemitirActivos, setReemitirActivosError, setReemitirActivosSucces } from './reemitir-activos.actions';

@Injectable()
export class ReemitirActivosEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) {}

	setReemitirActivos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setReemitirActivos),
			mergeMap((props) =>
				this.activosService.reemitirActivo(props.form).pipe(
					map((transaccion) => setReemitirActivosSucces({ payload: transaccion })),
					catchError((err) => of(setReemitirActivosError({ payload: err })))
				)
			)
		)
	);
}
