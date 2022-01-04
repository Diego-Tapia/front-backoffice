import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IFormUser } from 'src/app/shared/models/form-user.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { setGetUsuarioById, setGetUsuarioByIdClear } from '../data-usuarios/store/get-by-id/get-usuarios-by-id.action';
import { setModificacionUsuarios, setModificacionUsuariosClear } from '../modificacion-usuario/store/modificacion-usuarios.action';
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
		private router: Router,
		private route: ActivatedRoute,
		private noti: NotificationsService,
		private store: Store<{ usuariosReducersMap: IUsuariosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('usuariosReducersMap', 'getUsuarioById').subscribe((res: IState<IUserProfile>) => {
				this.handleGetUsuarioById(res);
			}),
			this.store.select('usuariosReducersMap', 'modificarUsuario').subscribe((res: IState<IFormUser>) => {
				this.handleModificarUsuarios(res);
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
		this.store.dispatch(setModificacionUsuariosClear());
	}

	handleGetUsuarioById(res: IState<IUserProfile>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo el usuario');
		if (res.success && res.response) this.usuario = res.response;
	}

	handleModificarUsuarios(res: IState<IFormUser>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Usuario modificado con éxito');
			this.store.dispatch(setGetUsuarioById({ userType: this.userType, id: this.id }));
		}
	}

	editarUsuario(id: string | undefined) {
		if (this.usuario.rol && this.usuario.rol !== 'USER')
			this.router.navigate(['/home/usuarios/modificar/backoffice', id]);
		else this.router.navigate(['/home/usuarios/modificar/final', id]);
	}

	editarEstado(usuario: IUserProfile){
		let newStatus!: string
		(usuario.userId.status == 'ACTIVE') ? newStatus = 'INACTIVE' : newStatus = 'ACTIVE'
		this.store.dispatch(setModificacionUsuarios({id:usuario.userId.id, form: {status: newStatus}, userType:this.userType}))
	}
}
