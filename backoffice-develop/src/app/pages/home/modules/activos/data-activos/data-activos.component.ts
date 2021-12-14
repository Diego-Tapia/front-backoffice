import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IState } from 'src/app/shared/models/state.interface';
import { IActivo } from 'src/app/shared/models/activo.interface';
import { IActivosReducersMap } from '../activos.reducers.map';
import { setGetActivos, setGetActivosClear } from './store/activos.actions';
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'app-data-activos',
	templateUrl: './data-activos.component.html',
	styleUrls: ['./data-activos.component.sass']
})
export class DataActivosComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	activos!: IActivo[];

	constructor(private noti: NotificationsService, private store: Store<{ activosRedecuersMap: IActivosReducersMap }>) {
		this.subscriptions.push(
			this.store.select('activosRedecuersMap', 'getActivos').subscribe((res: IState<IActivo[]>) => {
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

	handleGetActivos(res: IState<IActivo[]>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo los activos');
		if (res.success && res.response) this.activos = res.response;
	}
}
