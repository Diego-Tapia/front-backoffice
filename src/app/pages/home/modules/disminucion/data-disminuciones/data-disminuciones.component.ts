import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IDataIndividual } from 'src/app/shared/models/data-individual.interface';
import { IDisminucionReducersMap } from '../disminuciones.reducers.map';
import { setGetDisminucionesMasivas, setGetDisminucionesMasivasClear } from './store/get-dis-mas.action';
import { setGetDisminuciones, setGetDisminucionesClear } from './store/get-dis.action';
import { NotificationsService } from 'angular2-notifications';
import { IDataMasivo } from 'src/app/shared/models/data-masivo.interface';
import { ModalNuevaOperacionComponent } from 'src/app/features/modal-nueva-operacion/modal-nueva-operacion.component';
@Component({
	selector: 'app-data-disminuciones',
	templateUrl: './data-disminuciones.component.html',
	styleUrls: ['./data-disminuciones.component.sass']
})
export class DataDisminucionesComponent implements OnInit {
	subscriptions: Subscription[] = [];

	individualDec!: IDataIndividual[];
	massiveDec!: IDataMasivo[];

	constructor(
		public dialog: MatDialog,
		private noti: NotificationsService,
		private store: Store<{ disminucionReducersMap: IDisminucionReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('disminucionReducersMap', 'getDisminuciones').subscribe((res) => {
				if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo las disminuciones individuales');
				if (res.success && res.response) {
					this.individualDec = res.response;
				}
			})
		);
		this.subscriptions.push(
			this.store.select('disminucionReducersMap', 'getDisminucionesMasivas').subscribe((resM) => {
				if (resM.error) this.noti.error('Error', 'Ocurrió un problema obteniendo las disminuciones masivas');
				if (resM.success && resM.response) {
					this.massiveDec = resM.response;
				}
			})
		);
	}

	ngOnInit(): void {
		// this.store.dispatch(setGetDisminuciones());
		this.store.dispatch(setGetDisminucionesMasivas());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setGetDisminucionesClear());
		this.store.dispatch(setGetDisminucionesMasivasClear());
	}

	updateValues(): void {
		this.store.dispatch(setGetDisminucionesMasivas());
	}

	
	onCrearNuevoEvent(e: any): void {
		this.dialog.open(ModalNuevaOperacionComponent, { data: 'disminución'});
	}
}
