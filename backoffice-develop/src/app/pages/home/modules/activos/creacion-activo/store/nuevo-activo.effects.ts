import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setNuevoActivo, setNuevoActivoError, setNuevoActivoSucces } from './nuevo-activo.actions';

@Injectable()
export class NuevoActivoEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) {}

	setNuevoActivo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setNuevoActivo),
			mergeMap((props) =>
				this.activosService.nuevoActivo(props.form).pipe(
					map((activo) => setNuevoActivoSucces({ payload: activo })),
					catchError((err) => of(setNuevoActivoError({ payload: err })))
				)
			)
		)
	);
}
