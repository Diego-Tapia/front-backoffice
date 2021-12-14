import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setModificarActivo, setModificarActivoError, setModificarActivoSucces } from './modificacion-activo.actions';

@Injectable()
export class ModificarActivoEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) {}

	setModificarActivo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setModificarActivo),
			mergeMap((props) =>
				this.activosService.modificarActivo(props.id, props.form).pipe(
					map((activo) => setModificarActivoSucces({ payload: activo })),
					catchError((err) => of(setModificarActivoError({ payload: err })))
				)
			)
		)
	);
}
