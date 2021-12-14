import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setAltaUsuarios, setAltaUsuariosError, setAltaUsuariosSucces } from './alta-usuarios.action';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Injectable()
export class AltaUsuariosEffects {
	constructor(private actions$: Actions, private usuariosService: UsuariosService) {}

	setAltaUsuarios$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setAltaUsuarios),
			mergeMap((props) =>
				this.usuariosService.altaUsuario(props.form).pipe(
					map((usuario) => setAltaUsuariosSucces({ payload: usuario })),
					catchError((err) => of(setAltaUsuariosError({ payload: err })))
				)
			)
		)
	);
}
