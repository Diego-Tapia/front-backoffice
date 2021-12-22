import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { ITransaccion } from 'src/app/shared/models/transaccion.interface';
import { IFeaturesReducersMap } from '../features.reducers.map';
import { setEmitirActivos, setEmitirActivosClear } from './store/emitir-activos.actions';

@Component({
	selector: 'app-modal-emision-activo',
	templateUrl: './modal-emision-activo.component.html',
	styleUrls: ['./modal-emision-activo.component.sass']
})
export class ModalEmisionActivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IActivo,
		private noti: NotificationsService,
		private dialogRef: MatDialogRef<ModalEmisionActivoComponent>,
		private store: Store<{ featuresRedecuersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresRedecuersMap', 'emitirActivo').subscribe((res: IState<ITransaccion>) => {
				this.handleEmitirActivo(res);
			})
		);
	}

	emitirActivo() {
		this.store.dispatch(setEmitirActivos({ id: this.data.id }));
	}

	handleEmitirActivo(res: IState<ITransaccion>): void {
		if (res.error) {
			this.noti.error('Error', res.error.error.message);
			this.dialogRef.close();
		}
		if (res.success) {
			this.noti.success('Éxito', 'Se ha emitido el activo con éxito');
			this.dialogRef.close();
		}
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setEmitirActivosClear());
	}
}
