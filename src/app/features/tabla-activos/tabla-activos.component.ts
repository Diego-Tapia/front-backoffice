import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IFeaturesReducersMap } from '../features.reducers.map';
import { ModalDetalleActivoComponent } from '../modal-detalle-activo/modal-detalle-activo.component';
import { ModalEmisionActivoComponent } from '../modal-emision-activo/modal-emision-activo.component';
import { ModalReemisionActivoComponent } from '../modal-reemision-activo/modal-reemision-activo.component';
import { setPutActivo, setPutActivoClear } from './store/put-activo.actions';
;

@Component({
	selector: 'app-tabla-activos',
	templateUrl: './tabla-activos.component.html',
	styleUrls: ['./tabla-activos.component.sass']
})
export class TablaActivosComponent implements OnInit, OnDestroy {

	subscriptions: Subscription[] = []

	displayedColumns: string[] = ['symbol', 'shortName', 'money', 'status', 'createdAt', 'star'];

	@Input() activos!: IActivo[]

	public dataSource: IActivo[] = [];

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private noti: NotificationsService,
		private store: Store<{ featuresRedecuersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresRedecuersMap', 'putActivo').subscribe((res: IState<IActivo>) => {
				this.handlePutActivo(res);
			})
		);
	}

	ngOnInit(): void {
		this.dataSource = this.activos
	}

	ngOnDestroy(): void {
		this.store.dispatch(setPutActivoClear());
		this.subscriptions.forEach((subs) => subs.unsubscribe());
	}

	modificarActivo(id: string) {
		this.router.navigate(['/home/activos/modificar/', id])
	}

	activarActivo(activo: IActivo) {
		this.store.dispatch(setPutActivo({ id: activo.id, status: { status: 'ACTIVE' } }))
	}

	openEmitir(activo: IActivo) {
		this.dialog.open(ModalEmisionActivoComponent, { data: activo })
	}

	openReemitir(activo: IActivo) {
		this.dialog.open(ModalReemisionActivoComponent, { data: activo })
	}

	openDetalle(activo: IActivo) {
		this.dialog.open(ModalDetalleActivoComponent, { data: activo.id });
	}

	handlePutActivo(res: IState<IActivo>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) this.noti.success('Éxito', 'Se ha activado el activo con éxito');
	}
}
