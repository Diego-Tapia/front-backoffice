import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { setGetNotificaciones, setGetNotificacionesError, setGetNotificacionesSucces } from './notificaciones.actions';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';


@Injectable()
export class GetNotificacionesEffects {
	constructor(private actions$: Actions, private notificacionesService: NotificacionesService) {}

	setGetNotificaciones$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetNotificaciones),
			mergeMap((props) =>
				this.notificacionesService.getNotificaciones().pipe(
					map((notificaciones) => setGetNotificacionesSucces({ payload: notificaciones })),
					catchError((err) => of(setGetNotificacionesError({ payload: err })))
				)
			)
		)
	);
}
