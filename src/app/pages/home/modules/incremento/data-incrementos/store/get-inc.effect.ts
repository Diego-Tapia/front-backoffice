import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IncrementosService } from 'src/app/shared/services/incrementos/incrementos.service';
import { setGetIncrementos, setGetIncrementosError, setGetIncrementosSucces } from './get-inc.action';

@Injectable()
export class GetIncrementosEffects {
	constructor(private actions$: Actions, private incrementoService: IncrementosService) {}

	setGetIncrementos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetIncrementos),
			mergeMap((props) =>
				this.incrementoService.getIncrementos().pipe(
					map((incremento) => setGetIncrementosSucces({ payload: incremento })),
					catchError((err) => of(setGetIncrementosError({ payload: err })))
				)
			)
		)
	);
}
