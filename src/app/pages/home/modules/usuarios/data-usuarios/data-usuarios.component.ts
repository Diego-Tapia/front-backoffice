import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { ModalAltaUsuarioComponent } from 'src/app/features/modal-alta-usuario/modal-alta-usuario.component';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';
import { setGetUsuarios, setGetUsuariosClear } from './store/get-all/get-usuarios.action';

@Component({
	selector: 'app-data-usuarios',
	templateUrl: './data-usuarios.component.html',
	styleUrls: ['./data-usuarios.component.sass']
})
export class DataUsuariosComponent implements OnInit {
	subscriptions: Subscription[] = [];
	usuariosFinales!: IUserProfile[];
	usuariosBackoffice!: IUserProfile[];
	selectedIndex!: number;
	isBackoffice: boolean = false;
	userType!: string;
	isLoading: boolean = true;

	constructor(
		public route: ActivatedRoute,
		private location: Location,
		public dialog: MatDialog,
		private noti: NotificationsService,
		private store: Store<{ usuariosReducersMap: IUsuariosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('usuariosReducersMap', 'getUsuarios').subscribe((res: IState<IUserProfile[]>) => {
				this.handleGetUsuarios(res);
			}),
			this.route.params.subscribe((params) => (this.userType = params.type))
		);
	}

	ngOnInit(): void {
		if (this.userType === 'backoffice') {
			this.selectedIndex = 1;
			this.isBackoffice = true;
		}
		this.store.dispatch(setGetUsuarios({ userType: this.userType }));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe());
		this.store.dispatch(setGetUsuariosClear());
	}

	updateValues(): void {
		this.store.dispatch(setGetUsuarios({ userType: this.userType }));
	}

	handleGetUsuarios(res: IState<IUserProfile[]>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo los usuarios');
		if (res.success && res.response) {
			if (!this.isBackoffice) this.usuariosFinales = res.response;
			else this.usuariosBackoffice = res.response;
		}
	}

	onCrearNuevoEvent(e: any): void {
		this.dialog.open(ModalAltaUsuarioComponent);
	}

	tabChanged(tabChangeEvent: MatTabChangeEvent): void {
		if (tabChangeEvent.index === 0) {
			this.isBackoffice = false;
			this.store.dispatch(setGetUsuarios({ userType: 'final' }));
			this.location.replaceState('/home/usuarios/final');
		}
		if (tabChangeEvent.index === 1) {
			this.isBackoffice = true;
			this.store.dispatch(setGetUsuarios({ userType: 'backoffice' }));
			this.location.replaceState('/home/usuarios/backoffice');
		}
	}
}
