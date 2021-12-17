import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import {
	setGetActivosById,
	setGetActivosByIdClear
} from 'src/app/pages/home/modules/activos/data-activos/store/activos-by-id.actions';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IFeaturesReducersMap } from '../features.reducers.map';

@Component({
	selector: 'app-modal-detalle-activo',
	templateUrl: './modal-detalle-activo.component.html',
	styleUrls: ['./modal-detalle-activo.component.sass']
})
export class ModalDetalleActivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	public activo!: IActivo;
	public isLoading: boolean = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: string,
		private dialogRef: MatDialogRef<ModalDetalleActivoComponent>,
		private noti: NotificationsService,
		private store: Store<{ featuresRedecuersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresRedecuersMap', 'getActivosById').subscribe((res: IState<IActivo>) => {
				this.handleGetActivosById(res);
			})
		);
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivosById({ id: this.data }));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setGetActivosByIdClear());
	}

	handleGetActivosById(res: IState<IActivo>): void {
		if (res.error) {
			this.noti.error('Error', 'Error obteniendo los detalles del activo');
			this.dialogRef.close();
		}
		if (res.success && res.response) {
			this.activo = res.response;
			this.isLoading = false;
		}
	}
}
