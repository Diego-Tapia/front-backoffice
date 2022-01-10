import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { setNuevaDisminucionMasiva, setNuevaDisminucionMasivaClear } from 'src/app/pages/home/modules/disminucion/nueva-disminucion-masiva/store/nueva-dis-mas.action';
import { setNuevoIncrementoMasivo, setNuevoIncrementoMasivoClear } from 'src/app/pages/home/modules/incremento/nuevo-incremento-masivo/store/nuevo-inc-mas.action';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IFeaturesReducersMap } from '../features.reducers.map';
@Component({
	selector: 'app-tabla-masivos',
	templateUrl: './tabla-masivos.component.html',
	styleUrls: ['./tabla-masivos.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class TablaMasivosComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
	private subscriptions: Subscription[] = [];
	public pageSize:number[] = [5]
	displayedColumns: string[] = ['id', 'concepto', 'estado', 'creacion', 'actualizacion', 'star'];
	public dataSource = new MatTableDataSource<IResMasivo>();
	
	@Input() massive!: IResMasivo[];
	@Output() updateValues = new EventEmitter();

	
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private router: Router,
		private noti: NotificationsService,
		private store: Store<{ featuresReducersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresReducersMap', 'nuevoIncrementoMasivo').subscribe((res: IState<IResMasivo | null>) => {
				this.handleNuevoIncrementoMasivo(res);
			}),
			this.store.select('featuresReducersMap', 'nuevaDisminucionMasiva').subscribe((res: IState<IResMasivo | null>) => {
				this.handleNuevaDisminucionMasiva(res);
			}),
		)
	}

	procesarMasivo(element: IResMasivo) {
		const formData = new FormData();
		formData.append('tokenId', element.tokenId);
		formData.append('name', element.name);
		formData.append('action', 'PROCESAR');

		if (this.router.url.includes('incremento')) {
			formData.append('massiveIncreaseId', element.id);
			this.store.dispatch(setNuevoIncrementoMasivo({form: formData}));
		}
		
		if (this.router.url.includes('disminucion')) {
			formData.append('massiveDecreaseId', element.id);
			this.store.dispatch(setNuevaDisminucionMasiva({form: formData}));
		}
	}
	
	cancelarMasivo(element: IResMasivo) {
		const formData = new FormData();
		formData.append('tokenId', element.tokenId);
		formData.append('name', element.name);
		formData.append('action', 'CANCELAR');

		if (this.router.url.includes('incremento')) {
			formData.append('massiveIncreaseId', element.id);
			this.store.dispatch(setNuevoIncrementoMasivo({form: formData}));
		}
		
		if (this.router.url.includes('disminucion')) {
			formData.append('massiveDecreaseId', element.id);
			this.store.dispatch(setNuevaDisminucionMasiva({form: formData}));
		}
	}

	handleNuevoIncrementoMasivo(res: IState<IResMasivo | null>): void {
		if(res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Se ha editado el estado del incremento con éxito');
			this.updateValues.emit();
		} 
	}
	
	handleNuevaDisminucionMasiva(res: IState<IResMasivo | null>): void {
		if(res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Se ha editado el estado de la disminución con éxito');
			this.updateValues.emit();
		} 
	}

	applyFilter(event: any){
		this.dataSource.filter = event.target.value.trim().toLowerCase();
	}

	ngOnInit(): void {		
		this.dataSource = new MatTableDataSource(this.massive);
	}

	ngOnDestroy(): void {
		this.store.dispatch(setNuevaDisminucionMasivaClear());
		this.store.dispatch(setNuevoIncrementoMasivoClear());
		this.subscriptions.forEach((subs) => subs.unsubscribe());
	}

	ngOnChanges(changes: SimpleChanges) {		
		if(changes.massive.previousValue != changes.massive.currentValue) {	
			this.dataSource = new MatTableDataSource(this.massive);
			this.dataSource.paginator = this.paginator;
		}
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}
}
