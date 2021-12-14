import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setGetActivosById, setGetActivosByIdError, setGetActivosByIdSucces } from './activos-by-id.actions';

@Injectable()
export class GetActivosByIdEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) {}

	setGetActivosById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetActivosById),
			mergeMap((props) =>
				this.activosService.getActivosById(props.id).pipe(
					map((activos) => setGetActivosByIdSucces({ payload: activos })),
					catchError((err) => of(setGetActivosByIdError({ payload: err })))
				)
			)
		)
	);
}
