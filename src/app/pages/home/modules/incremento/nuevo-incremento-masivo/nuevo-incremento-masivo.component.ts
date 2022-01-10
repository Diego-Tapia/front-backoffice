import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IReqMasivo } from 'src/app/shared/models/req-masivo.interface';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/get-activos/activos.actions';
import { IIncrementoReducersMap } from '../incremento.reducers.map';
import { setNuevoIncrementoMasivo, setNuevoIncrementoMasivoClear } from './store/nuevo-inc-mas.action';

@Component({
	selector: 'app-nuevo-incremento-masivo',
	templateUrl: './nuevo-incremento-masivo.component.html',
	styleUrls: ['./nuevo-incremento-masivo.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class NuevoIncrementoMasivoComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	public isLinear = true;
	public file: File | null = null;
	public activos: IActivo[] = []
	public fileName!: string;

	firstStep = this.formBuilder.group({
		name: ['', [Validators.required]],
	})
	
	secondStep = this.formBuilder.group({
		tokenId: ['', [Validators.required]],
	})

	thirdStep = this.formBuilder.group({
		excelFile: [''],
		validated: ['', Validators.required]
		
	})

	constructor(
		private formBuilder: FormBuilder,
		private noti: NotificationsService,
		private router: Router,
		private store: Store<{ incrementoReducersMap: IIncrementoReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('incrementoReducersMap', 'nuevoIncrementoMasivo').subscribe((res: IState<IResMasivo | null>) => {
				this.handleNuevoIncrementoMasivo(res);
			}),
			this.store.select('incrementoReducersMap', 'getActivos').subscribe((res: IState<IActivo[] | null>) => {
				this.handleGetActivos(res);
			})
		);
	}

	fileSelected(event: any): void {
		if (event.target.files[0] && event.target.files[0].name) {
			this.file = event.target.files[0];
			this.fileName = event.target.files[0].name;
		}
		this.thirdStep.patchValue({ 
			excelFile: this.fileName,
			validated: true
		});
	}

	handleGetActivos(res: IState<IActivo[] | null>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema listando los activos');
		if (res.success && res.response) {
			res.response.forEach(activo => {
				if(activo.emited && activo.status === 'ACTIVE')
				this.activos.push(activo)
			})
		}
	}

	handleNuevoIncrementoMasivo(res: IState<IResMasivo | null>) {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'El incremento masivo se ha creado con éxito');
			this.router.navigate(['home/incremento']);
		}
	}

	submit() {
		if (!this.firstStep.valid) return this.noti.error('Error', 'Hay errores o campos vacíos en el primer paso');
		if (!this.secondStep.valid) return this.noti.error('Error', 'Hay errores o campos vacíos en el segundo paso');
		if (!this.thirdStep.valid) return this.noti.error('Error', 'Hay errores o campos vacíos en el tercer paso');

		this.thirdStep.patchValue({ excelFile: this.file });

		const formData = new FormData();
		formData.append('excelFile', this.thirdStep.value.excelFile)
		formData.append('name', this.firstStep.value.name)
		formData.append('tokenId', this.secondStep.value.tokenId.id)
		formData.append('action', 'CREAR')

		return this.store.dispatch(setNuevoIncrementoMasivo({ form: formData }));
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivos());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevoIncrementoMasivoClear());
		this.store.dispatch(setGetActivosClear());
	}

}
