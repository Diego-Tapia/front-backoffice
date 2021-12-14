import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { setGetAplicabilidades, setGetAplicabilidadesError, setGetAplicabilidadesSucces } from './get-aplicabilidades.actions';
import { AplicabilidadesService } from 'src/app/shared/services/aplicabilidades/aplicabilidades.service';

@Injectable()
export class GetAplicabilidadesEffects {
	constructor(private actions$: Actions, private aplicabilidadesService: AplicabilidadesService) { }

	setGetAplicabilidades$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetAplicabilidades),
			mergeMap((props) =>
				this.aplicabilidadesService.getAplicabilidades().pipe(
					map((aplicabilidades) => setGetAplicabilidadesSucces({ payload: aplicabilidades })),
					catchError((err) => of(setGetAplicabilidadesError({ payload: err })))
				)
			)
		)
	);
}
