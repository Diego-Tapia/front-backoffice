import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { setGetActivosById, setGetActivosByIdClear } from 'src/app/pages/home/modules/activos/data-activos/store/get-by-id/activos-by-id.actions';
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
	styleUrls: ['./tabla-activos.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class TablaActivosComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

	private subscriptions: Subscription[] = [];
	public pageSize: number[] = [5];
	public dataSource = new MatTableDataSource<IActivo>();
	public displayedColumns: string[] = ['symbol', 'description', 'shortName', 'status', 'createdAt', 'star'];

	@Output() updateValues = new EventEmitter();
	@Input() activos: IActivo[] = [];
	
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private noti: NotificationsService,
		private store: Store<{ featuresReducersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresReducersMap', 'putActivo').subscribe((res: IState<IActivo | null>) => {
				this.handlePutActivo(res);
			}),
			this.store.select('featuresReducersMap', 'getActivosById').subscribe((res: IState<IActivo | null>) => {
				this.handleGetActivosById(res);
			})
		);
	}

	ngOnInit(): void {
		this.dataSource.data = this.activos
	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes.activos.previousValue != changes.activos.currentValue) {	
			this.dataSource = new MatTableDataSource(this.activos)
			this.dataSource.paginator = this.paginator;
		}
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
		this.store.dispatch(setPutActivoClear());
		this.store.dispatch(setGetActivosByIdClear());
		this.subscriptions.forEach((subs) => subs.unsubscribe())
	}

	handleGetActivosById(res: IState<IActivo | null>): void {
		if (res.error) this.noti.error('Error', 'Error obteniendo los detalles del activo')
		if (res.success && res.response) {
			this.dialog.open(ModalDetalleActivoComponent, { data: res.response });
		} 
	}

	handlePutActivo(res: IState<IActivo | null>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success){
			this.noti.success ('Éxito', 'Se ha editado el activo con éxito');
			this.updateValues.emit()
		} 
	}

	applyFilter(event: any){
		this.dataSource.filter = event.target.value.trim().toLowerCase();
	}

	editarActivo(id: string) {
		this.router.navigate(['/home/activos/editar/', id])
	}

	actualizarEstado(activo: IActivo) {	
		let newStatus!: string
		(activo.status == 'ACTIVE') ? newStatus = 'INACTIVE' : newStatus = 'ACTIVE'	
		this.store.dispatch(setPutActivo({ id: activo.id, status: { status: newStatus } }))
	}

	openEmitir(activo: IActivo) {
		(!activo.emited) 
		? this.dialog.open(ModalEmisionActivoComponent, { data: activo })
		: this.dialog.open(ModalReemisionActivoComponent, { data: activo })
	}

	openDetalle(activo: IActivo) {
		this.store.dispatch(setGetActivosById({ id: activo.id }));
	}

}
