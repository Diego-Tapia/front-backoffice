import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DisminucionesService } from 'src/app/shared/services/disminuciones/disminuciones.service';
import {
	setNuevaDisminucionMasiva,
	setNuevaDisminucionMasivaSucces,
	setNuevaDisminucionMasivaError
} from './nueva-dis-mas.action';

@Injectable()
export class NuevaDisminucionMasivaEffects {
	constructor(private actions$: Actions, private disminucionesService: DisminucionesService) {}

	setNuevaDisminucionMasiva$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setNuevaDisminucionMasiva),
			mergeMap((props) =>
				this.disminucionesService.nuevaDisminucionMasiva(props.form).pipe(
					map((activos) => setNuevaDisminucionMasivaSucces({ payload: activos })),
					catchError((err) => of(setNuevaDisminucionMasivaError({ payload: err })))
				)
			)
		)
	);
}
