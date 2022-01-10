import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
	setNuevoIncrementoMasivo,
	setNuevoIncrementoMasivoSuccess,
	setNuevoIncrementoMasivoError
} from './nuevo-inc-mas.action';
import { IncrementosService } from 'src/app/shared/services/incrementos/incrementos.service';

@Injectable()
export class NuevoIncrementoMasivoEffects {
	constructor(private actions$: Actions, private incrementos: IncrementosService) {}

	setNuevoIncrementoMasivo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setNuevoIncrementoMasivo),
			mergeMap((props) =>
				this.incrementos.nuevoIncrementoMasivo(props.form).pipe(
					map((res) => setNuevoIncrementoMasivoSuccess({ payload: res })),
					catchError((err) => of(setNuevoIncrementoMasivoError({ payload: err })))
				)
			)
		)
	);
}
