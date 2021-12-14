import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevaOperacionDisminucionComponent } from 'src/app/features/modal-nueva-operacion-disminucion/modal-nueva-operacion-disminucion.component';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IIncrementoIndividual } from 'src/app/shared/models/incremento-individual.interface';
import { IDisminucionReducersMap } from '../disminuciones.reducers.map';
import { setGetDisminucionesMasivas, setGetDisminucionesMasivasClear } from './store/get-dis-mas.action';
import { setGetDisminuciones, setGetDisminucionesClear } from './store/get-dis.action';
import { NotificationsService } from 'angular2-notifications';
@Component({
	selector: 'app-data-disminuciones',
	templateUrl: './data-disminuciones.component.html',
	styleUrls: ['./data-disminuciones.component.sass']
})
export class DataDisminucionesComponent implements OnInit {
	subscriptions: Subscription[] = [];

	incrementsIndividual!: IIncrementoIndividual[];
	incrementsMasive!: IIncrementoIndividual[];

	constructor(
		public dialog: MatDialog,
		private noti: NotificationsService,
		private store: Store<{ disminucionRedecuersMap: IDisminucionReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('disminucionRedecuersMap', 'getDisminuciones').subscribe((res) => {
				if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo las disminiciones individuales');
				if (res.success && res.response) {
					this.incrementsIndividual = res.response;
				}
			})
		);
		this.subscriptions.push(
			this.store.select('disminucionRedecuersMap', 'getDisminucionesMasivas').subscribe((resM) => {
				if (resM.error) this.noti.error('Error', 'Ocurrió un problema obteniendo las disminiciones masivas');
				if (resM.success && resM.response) {
					this.incrementsMasive = resM.response;
				}
			})
		);
	}
	ngOnInit(): void {
		this.store.dispatch(setGetDisminuciones());
		this.store.dispatch(setGetDisminucionesMasivas());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setGetDisminucionesClear());
		this.store.dispatch(setGetDisminucionesMasivasClear());
	}

	onCrearNuevoEvent(e: any): void {
		this.dialog.open(ModalNuevaOperacionDisminucionComponent);
	}
}
