import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activo.interface';
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
		file: ['', [Validators.required]],
		action: ['CREAR']
	});

	constructor(
		private _formBuilder: FormBuilder,
		private noti: NotificationsService,
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
		this.myForm.patchValue({ file: this.fileName });
	}

	handleGetActivos(res: IState<any>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema listando los activos');
		if (res.success && res.response) this.activos = res.response
	}

	handleNuevoIncrementoMasivo(res: IState<any>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema creando el incremento masivo');
		if (res.success) this.noti.success('Éxito', 'El incremento masivo se ha creado con éxito');
	}

	submit() {
		if (!this.myForm.valid) {
			return this.noti.error('Error', 'Hay errores o campos vacíos en el formulario');
		}
		this.myForm.patchValue({
			file: this.file,
			tokenId: this.myForm.value.tokenId.id
		});
		return this.store.dispatch(setNuevoIncrementoMasivo({ form: this.myForm.value }));
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
