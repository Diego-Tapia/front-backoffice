import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IReqUser } from 'src/app/shared/models/req-user.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import { setGetUsuarioById, setGetUsuarioByIdClear } from '../data-usuarios/store/get-by-id/get-usuarios-by-id.action';
import { setEditarUsuario, setEditarUsuarioClear } from '../editar-usuario/store/editar-usuario.action';

import { IUsuariosReducersMap } from '../usuarios.reducers.map';

@Component({
	selector: 'app-detalle-usuario',
	templateUrl: './detalle-usuario.component.html',
	styleUrls: ['./detalle-usuario.component.sass']
})
export class DetalleUsuarioComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	usuario!: IUserProfile;
	id!: string;
	userType!: string;

	constructor(
		private usuariosService: UsuariosService,
		private router: Router,
		private route: ActivatedRoute,
		private noti: NotificationsService,
		private store: Store<{ usuariosReducersMap: IUsuariosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('usuariosReducersMap', 'getUsuarioById').subscribe((res: IState<IUserProfile | null>) => {
				this.handleGetUsuarioById(res);
			}),
			this.store.select('usuariosReducersMap', 'editarUsuario').subscribe((res: IState<IUserProfile | null>) => {
				this.handleEditarUsuarios(res);
			}),
			this.route.params.subscribe((params) => {
				this.id = params.id;
				this.userType = params.type;
			})
		);
	}

	ngOnInit(): void {
		this.store.dispatch(setGetUsuarioById({ userType: this.userType, id: this.id }));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe());
		this.store.dispatch(setGetUsuarioByIdClear());
		this.store.dispatch(setEditarUsuarioClear());
	}

	handleGetUsuarioById(res: IState<IUserProfile | null>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo el usuario');
		if (res.success && res.response) {
			this.usuario = this.usuariosService.setUsersDataTable(res.response);
		}
	}

	handleEditarUsuarios(res: IState<IUserProfile | null>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Usuario editado con éxito');
			this.store.dispatch(setGetUsuarioById({ userType: this.userType, id: this.id }));
		}
	}

	editarUsuario(id: string | undefined) {
		(this.userType === 'backoffice')
		? this.router.navigate(['/home/usuarios/backoffice/editar', id])
		: this.router.navigate(['/home/usuarios/final/editar', id]);
	}

	editarEstado(usuario: IUserProfile){
		let newStatus!: string
		(usuario.status == 'ACTIVE') ? newStatus = 'INACTIVE' : newStatus = 'ACTIVE'
		this.store.dispatch(setEditarUsuario({id:usuario.id, form: {status: newStatus}, userType:this.userType}))
	}
}
