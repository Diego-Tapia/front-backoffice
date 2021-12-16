import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivosService } from 'src/app/shared/services/activos/activos.service';
import { setPutActivo, setPutActivoError, setPutActivoSucces } from './put-activo.actions';

@Injectable()
export class PutActivoEffects {
	constructor(private actions$: Actions, private activosService: ActivosService) { }

	setPutActivo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setPutActivo),
			mergeMap((props) =>
				this.activosService.changeStatus(props.id, props.status).pipe(
					map((activo) => setPutActivoSucces({ payload: activo })),
					catchError((err) => of(setPutActivoError({ payload: err })))
				)
			)
		)
	);
}
