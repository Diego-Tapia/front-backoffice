import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setGetUsuarioById, setGetUsuarioByIdError, setGetUsuarioByIdSucces } from './get-usuarios-by-id.action';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Injectable()
export class GetUsuarioByIdEffects {
	constructor(private actions$: Actions, private usuariosService: UsuariosService) {}

	setGetUsuarioById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setGetUsuarioById),
			mergeMap((props) =>
				this.usuariosService.getUsuariosById(props.userType, props.id).pipe(
					map((usuario) => setGetUsuarioByIdSucces({ payload: usuario })),
					catchError((err) => of(setGetUsuarioByIdError({ payload: err })))
				)
			)
		)
	);
}
