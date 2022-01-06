import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setEditarActivo, setEditarActivoError, setEditarActivoSucces } from './editar-activo.actions';

@Injectable()
export class EditarActivoEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) { }

	setEditarActivo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setEditarActivo),
			mergeMap((props) =>
				this.activosService.editarActivo(props.id, props.form).pipe(
					map((activo) => setEditarActivoSucces({ payload: activo })),
					catchError((err) => of(setEditarActivoError({ payload: err })))
				)
			)
		)
	);
}
