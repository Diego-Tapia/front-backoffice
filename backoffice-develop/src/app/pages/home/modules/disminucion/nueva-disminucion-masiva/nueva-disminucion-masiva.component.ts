import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/shared/models/state.interface';
import { IDisminucionReducersMap } from '../disminuciones.reducers.map';
import { setNuevaDisminucionMasiva, setNuevaDisminucionMasivaClear } from './store/nueva-dis-mas.action';
import { NotificationsService } from 'angular2-notifications';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/activos.actions';
import { IActivo } from 'src/app/shared/models/activo.interface';

@Component({
	selector: 'app-nueva-disminucion-masiva',
	templateUrl: './nueva-disminucion-masiva.component.html',
	styleUrls: ['./nueva-disminucion-masiva.component.sass']
})
export class NuevaDisminucionMasivaComponent implements OnInit, OnDestroy {
	isLinear = false;
	subscriptions: Subscription[] = [];
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
		private store: Store<{ disminucionRedecuersMap: IDisminucionReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('disminucionRedecuersMap', 'nuevaDisminucionMasiva').subscribe((res) => {
				this.handleNuevaDisminucionMasiva(res);
			}),
			this.store.select('disminucionRedecuersMap', 'getActivos').subscribe((res) => {
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

	handleNuevaDisminucionMasiva(res: IState<any>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema creando la disminución masiva');
		if (res.success) this.noti.success('Éxito', 'La disminución masiva se ha creado con éxito');
	}

	submit() {
		if (!this.myForm.valid) {
			return this.noti.error('Error', 'Hay errores o campos vacíos en el formulario');
		}
		this.myForm.patchValue({
			file: this.file,
			tokenId: this.myForm.value.tokenId.id
		});

		return this.store.dispatch(setNuevaDisminucionMasiva({ form: this.myForm.value }));
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
