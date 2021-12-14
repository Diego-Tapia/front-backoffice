import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { setModificacionUsuarios, setModificacionUsuariosError, setModificacionUsuariosSucces } from './modificacion-usuarios.action';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Injectable()
export class ModificacionUsuariosEffects {
	constructor(private actions$: Actions, private usuariosService: UsuariosService) {}

	setModificacionUsuarios$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setModificacionUsuarios),
			mergeMap((props) =>
				this.usuariosService.modificacionUsuario(props.id, props.form).pipe(
					map((usuario) => setModificacionUsuariosSucces({ payload: usuario })),
					catchError((err) => of(setModificacionUsuariosError({ payload: err })))
				)
			)
		)
	);
}
