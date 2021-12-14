import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setEmitirActivos, setEmitirActivosError, setEmitirActivosSucces } from './emitir-activos.actions';

@Injectable()
export class EmitirActivosEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) {}

	setEmitirActivos$ = createEffect(() =>
	
		this.actions$.pipe(
			ofType(setEmitirActivos),
			mergeMap((props) =>
				this.activosService.emitirActivo(props.id).pipe(
					map((transaccion) => setEmitirActivosSucces({ payload: transaccion })),
					catchError((err) => of(setEmitirActivosError({ payload: err })))
				)
			)
		)
	);
}
