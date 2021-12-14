import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IncrementosService } from 'src/app/shared/services/incrementos/incrementos.service';
import {
	setGetIncrementosMasivos,
	setGetIncrementosMasivosSucces,
	setGetIncrementosMasivosError
} from './get-inc-mas.action';

@Injectable()
export class GetIncrementosMasivosEffects {
	constructor(private action$: Actions, private incrementosService: IncrementosService) {}

	setGetIncrementosMasivos$ = createEffect(() =>
		this.action$.pipe(
			ofType(setGetIncrementosMasivos),
			mergeMap((props) =>
				this.incrementosService.getIncrementosMasivos().pipe(
					map((incrementoMasivo) => setGetIncrementosMasivosSucces({ payload: incrementoMasivo })),
					catchError((err) => of(setGetIncrementosMasivosError({ payload: err })))
				)
			)
		)
	);
}
