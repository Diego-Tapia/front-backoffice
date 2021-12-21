import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { setNuevaDisminucionMasiva, setNuevaDisminucionMasivaClear } from 'src/app/pages/home/modules/disminucion/nueva-disminucion-masiva/store/nueva-dis-mas.action';
import { setNuevoIncrementoMasivo, setNuevoIncrementoMasivoClear } from 'src/app/pages/home/modules/incremento/nuevo-incremento-masivo/store/nuevo-inc-mas.action';
import { IDataMasivo } from 'src/app/shared/models/data-masivo.interface';
import { IFormMasivo } from 'src/app/shared/models/form-masivo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IFeaturesReducersMap } from '../features.reducers.map';
@Component({
	selector: 'app-tabla-masivos',
	templateUrl: './tabla-masivos.component.html',
	styleUrls: ['./tabla-masivos.component.sass']
})
export class TablaMasivosComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	displayedColumns: string[] = ['id', 'concepto', 'estado', 'creacion', 'actualizacion', 'star'];

	@Input() incrementsMasive!: IDataMasivo[];

	public dataSource: IDataMasivo[] = [];
	constructor(
		private router: Router,
		private noti: NotificationsService,
		private store: Store<{ featuresRedecuersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresRedecuersMap', 'nuevoIncrementoMasivo').subscribe((res) => {
				this.handleNuevoIncrementoMasivo(res);
			}),
			this.store.select('featuresRedecuersMap', 'nuevaDisminucionMasiva').subscribe((res) => {
				this.handleNuevaDisminucionMasiva(res);
			}),
		)
	}

	procesarMasivo(element: IDataMasivo) {
		const formData = new FormData()
		formData.append('tokenId', element.tokenId)
		formData.append('name', element.name)
		formData.append('action', 'PROCESAR')		

		if (this.router.url.includes('incremento')) {
			formData.append('massiveIncreaseId', element.id)
			this.store.dispatch(setNuevoIncrementoMasivo({form: formData}))
		}
		
		if (this.router.url.includes('disminucion')) {
			formData.append('massiveDecreaseId', element.id)
			this.store.dispatch(setNuevaDisminucionMasiva({form: formData}))
		}

		this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
			this.router.navigate([this.router.url]);
		}); 
	}
	
	cancelarMasivo(element: IDataMasivo) {
		const formData = new FormData()
		formData.append('tokenId', element.tokenId)
		formData.append('name', element.name)
		formData.append('action', 'CANCELAR')

		if (this.router.url.includes('incremento')) {
			formData.append('massiveIncreaseId', element.id)
			this.store.dispatch(setNuevoIncrementoMasivo({form: formData}))
		}
		
		if (this.router.url.includes('disminucion')) {
			formData.append('massiveDecreaseId', element.id)
			this.store.dispatch(setNuevaDisminucionMasiva({form: formData}))
		}

		this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
			this.router.navigate([this.router.url]);
		}); 
	}

	handleNuevoIncrementoMasivo(res: IState<IFormMasivo>): void {
		if(res.error) this.noti.error('Error', res.error.error.message)
		if (res.success) this.noti.success('Éxito', 'Se ha modificado el activo con éxito');
	}
	
	handleNuevaDisminucionMasiva(res: IState<IFormMasivo>): void {
		if(res.error) this.noti.error('Error', res.error.error.message)
		if (res.success) this.noti.success('Éxito', 'Se ha modificado el activo con éxito');
	}

	ngOnInit(): void {		
		this.dataSource = this.incrementsMasive;
	}

	ngOnDestroy(): void {
		this.store.dispatch(setNuevaDisminucionMasivaClear())
		this.store.dispatch(setNuevoIncrementoMasivoClear())
		this.subscriptions.forEach((subs) => subs.unsubscribe());
	}
}
