import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IState } from 'src/app/shared/models/state.interface';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IActivosReducersMap } from '../activos.reducers.map';
import { setGetActivos, setGetActivosClear } from './store/get-activos/activos.actions';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
	selector: 'app-data-activos',
	templateUrl: './data-activos.component.html',
	styleUrls: ['./data-activos.component.sass'],
})
export class DataActivosComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	activos!: IActivo[];

	constructor(
		private router: Router,
		private noti: NotificationsService, 
		private store: Store<{ activosReducersMap: IActivosReducersMap }>) {
		this.subscriptions.push(
			this.store.select('activosReducersMap', 'getActivos').subscribe((res: IState<IActivo[] | null>) => {
				this.handleGetActivos(res);
			})
		);
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivos());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe());
		this.store.dispatch(setGetActivosClear());
	}

	onCrearNuevoEvent(e: any){
		this.router.navigate(['home/activos/nuevo']);
	}

	updateValues(): void {
		this.store.dispatch(setGetActivos());
	}
	
	handleGetActivos(res: IState<IActivo[] | null>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo los activos');
		if (res.success && res.response) this.activos = res.response
	}
}
