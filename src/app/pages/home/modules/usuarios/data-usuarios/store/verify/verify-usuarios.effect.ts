import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setVerifyUsuario, setVerifyUsuarioError, setVerifyUsuarioSucces } from './verify-usuarios.action';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Injectable()
export class VerifyUsuarioEffects {
	constructor(private actions$: Actions, private usuariosService: UsuariosService) {}

	setVerifyUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setVerifyUsuario),
			mergeMap((props) =>
				this.usuariosService.verifyUsuario(props.userIdentifier).pipe(
					map((usuario) => setVerifyUsuarioSucces({ payload: usuario })),
					catchError((err) => of(setVerifyUsuarioError({ payload: err })))
				)
			)
		)
	);
}
