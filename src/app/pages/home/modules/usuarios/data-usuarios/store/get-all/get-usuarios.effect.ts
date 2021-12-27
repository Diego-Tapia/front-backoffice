import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setGetUsuarios, setGetUsuariosError, setGetUsuariosSucces } from './get-usuarios.action';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Injectable()
export class GetUsuariosEffects {
	constructor(private actions$: Actions, private usuariosService: UsuariosService) {}

	setGetUsuarios$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetUsuarios),
			mergeMap((props) =>
				this.usuariosService.getUsuarios(props.userType).pipe(
					map((usuario) => setGetUsuariosSucces({ payload: usuario })),
					catchError((err) => of(setGetUsuariosError({ payload: err })))
				)
			)
		)
	);
}
