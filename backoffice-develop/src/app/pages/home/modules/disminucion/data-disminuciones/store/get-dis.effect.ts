import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DisminucionesService } from 'src/app/shared/services/disminuciones/disminuciones.service';
import { setGetDisminuciones, setGetDisminucionesSuccess, setGetDisminucionesError } from './get-dis.action';

@Injectable()
export class GetDisminucionesEffects {
	constructor(private actions$: Actions, private disminucionesService: DisminucionesService) {}

	setGetDisminuciones$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetDisminuciones),
			mergeMap((props) =>
				this.disminucionesService.getDisminuciones().pipe(
					map((disminucion) => setGetDisminucionesSuccess({ payload: disminucion })),
					catchError((err) => of(setGetDisminucionesError({ payload: err })))
				)
			)
		)
	);
}
