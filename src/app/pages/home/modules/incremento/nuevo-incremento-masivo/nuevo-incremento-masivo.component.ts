import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IFormMasivo } from 'src/app/shared/models/form-masivo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/activos.actions';
import { IIncrementoReducersMap } from '../incremento.reducers.map';
import { setNuevoIncrementoMasivo, setNuevoIncrementoMasivoClear } from './store/nuevo-inc-mas.action';

@Component({
	selector: 'app-nuevo-incremento-masivo',
	templateUrl: './nuevo-incremento-masivo.component.html',
	styleUrls: ['./nuevo-incremento-masivo.component.sass']
})
export class NuevoIncrementoMasivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	isLinear = false;
	file: File | null = null;
	activos: IActivo[] = []
	fileName!: string;

	myForm = this._formBuilder.group({
		name: ['', [Validators.required]],
		tokenId: ['', [Validators.required]],
		excelFile: ['', [Validators.required]]
	});

	constructor(
		private _formBuilder: FormBuilder,
		private noti: NotificationsService,
		private router: Router,
		private store: Store<{ incrementoRedecuersMap: IIncrementoReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('incrementoRedecuersMap', 'nuevoIncrementoMasivo').subscribe((res) => {
				this.handleNuevoIncrementoMasivo(res);
			}),
			this.store.select('incrementoRedecuersMap', 'getActivos').subscribe((res) => {
				this.handleGetActivos(res);
			})
		);
	}

	fileSelected(event: any): void {
		if (event.target.files[0] && event.target.files[0].name) {
			this.file = event.target.files[0];
			this.fileName = event.target.files[0].name;
		}
		this.myForm.patchValue({ excelFile: this.fileName });
	}

	handleGetActivos(res: IState<IActivo[]>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema listando los activos');
		if (res.success && res.response) this.activos = res.response
	}

	handleNuevoIncrementoMasivo(res: IState<IFormMasivo>) {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.router.navigate(['home/incremento']);
			this.noti.success('Éxito', 'El incremento masivo se ha creado con éxito');
		}
	}

	submit() {
		if (!this.myForm.valid) {
			return this.noti.error('Error', 'Hay errores o campos vacíos en el formulario');
		}
		this.myForm.patchValue({ excelFile: this.file });

		const formData = new FormData();
		formData.append('excelFile', this.myForm.value.excelFile)
		formData.append('name', this.myForm.value.name)
		formData.append('tokenId', this.myForm.value.tokenId.id)
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
