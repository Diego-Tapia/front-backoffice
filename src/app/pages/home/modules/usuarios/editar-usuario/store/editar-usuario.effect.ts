import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setEditarUsuario, setEditarUsuarioError, setEditarUsuarioSucces } from './editar-usuario.action';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Injectable()
export class EditarUsuarioEffects {
	constructor(private actions$: Actions, private usuariosService: UsuariosService) {}

	setEditarUsuario$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setEditarUsuario),
			mergeMap((props) =>
				this.usuariosService.editarUsuario(props.id, props.form, props.userType).pipe(
					map((usuario) => setEditarUsuarioSucces({ payload: usuario })),
					catchError((err) => of(setEditarUsuarioError({ payload: err })))
				)
			)
		)
	);
}
