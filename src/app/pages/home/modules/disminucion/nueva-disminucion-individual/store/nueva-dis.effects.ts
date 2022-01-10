import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DisminucionesService } from 'src/app/shared/services/disminuciones/disminuciones.service';
import { setNuevaDisminucion, setNuevaDisminucionSucces, setNuevaDisminucionError } from './nueva-dis.action';

@Injectable()
export class NuevaDisminucionEffects {
	constructor(private actions$: Actions, private disminucionService: DisminucionesService) {}

	setNuevaDisminucion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setNuevaDisminucion),
			mergeMap((props) =>
				this.disminucionService.nuevaDisminucion(props.form).pipe(
					map((res) => setNuevaDisminucionSucces({ payload: res })),
					catchError((err) => of(setNuevaDisminucionError({ payload: err })))
				)
			)
		)
	);
}
