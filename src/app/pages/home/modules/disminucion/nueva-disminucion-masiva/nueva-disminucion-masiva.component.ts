import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { IDisminucionReducersMap } from '../disminuciones.reducers.map';
import { setNuevaDisminucionMasiva, setNuevaDisminucionMasivaClear } from './store/nueva-dis-mas.action';
import { NotificationsService } from 'angular2-notifications';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/get-activos/activos.actions';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { Router } from '@angular/router';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';

@Component({
	selector: 'app-nueva-disminucion-masiva',
	templateUrl: './nueva-disminucion-masiva.component.html',
	styleUrls: ['./nueva-disminucion-masiva.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class NuevaDisminucionMasivaComponent implements OnInit, OnDestroy {
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
		private store: Store<{ disminucionReducersMap: IDisminucionReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('disminucionReducersMap', 'nuevaDisminucionMasiva').subscribe((res: IState<IResMasivo | null>) => {
				this.handleNuevaDisminucionMasiva(res);
			}),
			this.store.select('disminucionReducersMap', 'getActivos').subscribe((res: IState<IActivo[] | null>) => {
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
		if (res.error) this.noti.error('Error', 'Ocurri?? un problema listando los activos');
		if (res.success && res.response) {
			res.response.forEach(activo => {
				if(activo.emited && activo.status === 'ACTIVE')
				this.activos.push(activo)
			})
		} 
	}

	handleNuevaDisminucionMasiva(res: IState<IResMasivo | null>) {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('??xito', 'La disminuci??n masiva se ha creado con ??xito');
			this.router.navigate(['home/disminucion']);
		}
	}

	submit() {
		if (!this.firstStep.valid) return this.noti.error('Error', 'Hay errores o campos vac??os en el primer paso');
		if (!this.secondStep.valid) return this.noti.error('Error', 'Hay errores o campos vac??os en el segundo paso');
		if (!this.thirdStep.valid) return this.noti.error('Error', 'Hay errores o campos vac??os en el tercer paso');

		this.thirdStep.patchValue({ excelFile: this.file });

		const formData = new FormData();
		formData.append('excelFile', this.thirdStep.value.excelFile)
		formData.append('name', this.firstStep.value.name)
		formData.append('tokenId', this.secondStep.value.tokenId.id)
		formData.append('action', 'CREAR')

		return this.store.dispatch(setNuevaDisminucionMasiva({ form: formData }));
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivos());
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevaDisminucionMasivaClear());
		this.store.dispatch(setGetActivosClear());
	}
}
