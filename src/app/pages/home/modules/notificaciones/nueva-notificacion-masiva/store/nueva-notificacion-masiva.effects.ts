import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setNuevaNotificacion, setNuevaNotificacionError, setNuevaNotificacionSucces } from './nueva-notificacion-masiva.actions';
import { NotificacionesService } from 'src/app/shared/services/notificaciones/notificaciones.service';

@Injectable()
export class NuevaNotificacionEffects {
	constructor(private actions$: Actions, private notificacionesService: NotificacionesService) {}

	setNuevaNotificacion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setNuevaNotificacion),
			mergeMap((props) =>
				this.notificacionesService.nuevaNotificacionMasiva(props.form).pipe(
					map((notificacion) => setNuevaNotificacionSucces({ payload: notificacion })),
					catchError((err) => of(setNuevaNotificacionError({ payload: err })))
				)
			)
		)
	);
}
