import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IState } from 'src/app/shared/models/state.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import { setGetUsuarioById, setGetUsuarioByIdClear } from '../data-usuarios/store/get-usuarios-by-id.action';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';

@Component({
	selector: 'app-detalle-usuario',
	templateUrl: './detalle-usuario.component.html',
	styleUrls: ['./detalle-usuario.component.sass']
})
export class DetalleUsuarioComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	usuario!: IUser;
	id!: string;
	userType!: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private noti: NotificationsService,
		private store: Store<{ usuariosRedecuersMap: IUsuariosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('usuariosRedecuersMap', 'getUsuarioById').subscribe((res: IState<IUser>) => {
				this.handleGetUsuarioById(res);
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
	}

	handleGetUsuarioById(res: IState<IUser>): void {
		console.log(res.response);

		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo el usuario');
		if (res.success && res.response) this.usuario = res.response;
	}

	modificar(id: string | undefined) {
		if (this.usuario.rol && this.usuario.rol !== 'USER')
			this.router.navigate(['/home/usuarios/modificar/backoffice', id]);
		else this.router.navigate(['/home/usuarios/modificar/final', id]);
	}
}
