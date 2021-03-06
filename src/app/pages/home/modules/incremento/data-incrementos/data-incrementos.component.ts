import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalNuevaOperacionComponent } from 'src/app/features/modal-nueva-operacion/modal-nueva-operacion.component';
import { IResIndividual } from 'src/app/shared/models/res-individual.interface';
import { IIncrementoReducersMap } from '../incremento.reducers.map';
import { setGetIncrementos, setGetIncrementosClear } from './store/get-inc.action';
import { setGetIncrementosMasivos, setGetIncrementosMasivosClear } from './store/get-inc-mas.action';
import { NotificationsService } from 'angular2-notifications';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';

@Component({
	selector: 'app-data-incrementos',
	templateUrl: './data-incrementos.component.html',
	styleUrls: ['./data-incrementos.component.sass']
})
export class DataIncrementosComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];

	individualInc!: IResIndividual[];
	massiveInc!: IResMasivo[];

	constructor(
		public dialog: MatDialog,
		private noti: NotificationsService,
		private store: Store<{ incrementoReducersMap: IIncrementoReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('incrementoReducersMap', 'getIncrementos').subscribe((res) => {
				if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo los incrementos individuales');
				if (res.success && res.response) this.individualInc = res.response
			})
		);
		this.subscriptions.push(
			this.store.select('incrementoReducersMap', 'getIncrementosMasivos').subscribe((resM) => {
				if (resM.error) this.noti.error('Error', 'Ocurrió un problema obteniendo los incrementos masivos');
				if (resM.success && resM.response) this.massiveInc = resM.response
			})
		);
	}

	ngOnInit(): void {
		// this.store.dispatch(setGetIncrementos());
		this.store.dispatch(setGetIncrementosMasivos());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setGetIncrementosClear());
		this.store.dispatch(setGetIncrementosMasivosClear());
	}

	updateValues(): void {
		this.store.dispatch(setGetIncrementosMasivos());
	}

	onCrearNuevoEvent(e: any): void {
		this.dialog.open(ModalNuevaOperacionComponent, { data: 'incremento'});
	}
}
