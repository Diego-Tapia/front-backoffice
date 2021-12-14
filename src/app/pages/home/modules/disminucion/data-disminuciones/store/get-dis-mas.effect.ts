import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DisminucionesService } from 'src/app/shared/services/disminuciones/disminuciones.service';
import {
	setGetDisminucionesMasivas,
	setGetDisminucionesMasivasSuccess,
	setGetDisminucionesMasivasError
} from './get-dis-mas.action';

@Injectable()
export class GetDisminucionesMasivasEffects {
	constructor(private actions$: Actions, private disminucionesService: DisminucionesService) {}

	setGetDisminucionesMasivas$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetDisminucionesMasivas),
			mergeMap((props) =>
				this.disminucionesService.getDisminucionesMasivas().pipe(
					map((disminucion) => setGetDisminucionesMasivasSuccess({ payload: disminucion })),
					catchError((err) => of(setGetDisminucionesMasivasError({ payload: err })))
				)
			)
		)
	);
}
