import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setGetActivos, setGetActivosError, setGetActivosSucces } from './activos.actions';

@Injectable()
export class GetActivosEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) {}

	setGetActivos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetActivos),
			mergeMap((props) =>
				this.activosService.getActivos().pipe(
					map((activos) => setGetActivosSucces({ payload: activos })),
					catchError((err) => of(setGetActivosError({ payload: err })))
				)
			)
		)
	);
}
