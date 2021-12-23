import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { setGetActivos, setGetActivosClear } from 'src/app/pages/home/modules/activos/data-activos/store/activos.actions';
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
export class TablaActivosComponent implements OnInit, OnDestroy, OnChanges {

	subscriptions: Subscription[] = []

	displayedColumns: string[] = ['symbol', 'shortName', 'money', 'status', 'createdAt', 'star'];

	@Output() updateValues = new EventEmitter();
	@Input() activos: IActivo[] = [];

	public dataSource = new MatTableDataSource<IActivo>();

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private noti: NotificationsService,
		private store: Store<{ featuresRedecuersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresRedecuersMap', 'putActivo').subscribe((res: IState<IActivo>) => {
				this.handlePutActivo(res);
			}),
		);
	}

	ngOnInit(): void {
		this.dataSource.data = this.activos
	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes.activos.previousValue !== changes.activos.currentValue) 
			this.dataSource.data = this.activos
	}

	ngOnDestroy(): void {
		this.store.dispatch(setPutActivoClear());
		this.store.dispatch(setGetActivosClear());
		this.subscriptions.forEach((subs) => subs.unsubscribe())
	}

	handlePutActivo(res: IState<IActivo>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) this.noti.success ('Éxito', 'Se ha modificado el activo con éxito');
	}

	modificarActivo(id: string) {
		this.router.navigate(['/home/activos/modificar/', id])
	}

	actualizarEstado(activo: IActivo) {
		if(activo.status === 'INACTIVE') this.store.dispatch(setPutActivo({ id: activo.id, status: { status: 'ACTIVE' } }))
		if(activo.status === 'ACTIVE') this.store.dispatch(setPutActivo({ id: activo.id, status: { status: 'INACTIVE' } }))
		this.store.dispatch(setGetActivos());
		this.updateValues.emit()
	}

	openEmitir(activo: IActivo) {
		if(!activo.emited) this.dialog.open(ModalEmisionActivoComponent, { data: activo })
		if(activo.emited) this.dialog.open(ModalReemisionActivoComponent, { data: activo })
	}

	openDetalle(activo: IActivo) {
		this.dialog.open(ModalDetalleActivoComponent, { data: activo.id });
	}

}
