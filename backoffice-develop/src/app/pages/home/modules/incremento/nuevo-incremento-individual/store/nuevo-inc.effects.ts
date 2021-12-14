import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setNuevoIncremento, setNuevoIncrementoError, setNuevoIncrementoSucces } from './nuevo-inc.actions';
import { IncrementosService } from 'src/app/shared/services/incrementos/incrementos.service';

@Injectable()
export class NuevoIncrementoEffects {
	constructor(private actions$: Actions, private incrementoService: IncrementosService) {}

	setNuevoIncremento$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setNuevoIncremento),
			mergeMap((props) =>
				this.incrementoService.nuevoIncremento(props.form).pipe(
					map((activos) => setNuevoIncrementoSucces({ payload: activos })),
					catchError((err) => of(setNuevoIncrementoError({ payload: err })))
				)
			)
		)
	);
}
