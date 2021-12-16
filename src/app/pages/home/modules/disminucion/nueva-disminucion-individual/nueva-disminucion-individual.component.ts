import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IDisminucionReducersMap } from '../disminuciones.reducers.map';
import { setNuevaDisminucion, setNuevaDisminucionClear } from './store/nueva-dis.action';
import { IState } from '../../../../../shared/models/state.interface';
import { NotificationsService } from 'angular2-notifications';
import { IActivo } from 'src/app/shared/models/activo.interface';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/activos.actions';
import { IIncDisIndividualBE } from 'src/app/shared/models/inc-individual.interface';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nueva-disminucion-individual',
	templateUrl: './nueva-disminucion-individual.component.html',
	styleUrls: ['./nueva-disminucion-individual.component.sass']
})
export class NuevaDisminucionIndividualComponent implements OnInit, OnDestroy {
	isLinear = false;
	subscriptions: Subscription[] = [];
	activos: IActivo[] = []


	myForm = this.formBuilder.group({
		userName: ['', [Validators.required]],
		amount: ['', [Validators.required]],
		tokenId: ['', [Validators.required]],
		notes: ['']
	});
	constructor(
		private formBuilder: FormBuilder,
		private noti: NotificationsService,
		private router: Router,
		private store: Store<{ disminucionRedecuersMap: IDisminucionReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('disminucionRedecuersMap', 'nuevaDisminucion').subscribe((res) => {
				this.handleNuevaDisminucion(res);
			}),
			this.store.select('disminucionRedecuersMap', 'getActivos').subscribe((res) => {
				this.handleGetActivos(res);
			})
		);
	}

	handleGetActivos(res: IState<any>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema listando los activos');
		if (res.success && res.response) this.activos = res.response
	}

	handleNuevaDisminucion(res: IState<any>) {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.router.navigate(['home/disminucion']);
			this.noti.success('Éxito', 'La disminución individual se ha creado con éxito');
		}
	}

	submit() {
		if (!this.myForm.valid) return this.noti.error('Error', 'Hay errores o campos vacíos en el formulario');

		const disminucionIndividual = this.myForm.value
		disminucionIndividual.tokenId = this.myForm.value.tokenId.id

		return this.store.dispatch(setNuevaDisminucion({ form: disminucionIndividual }));
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivos());
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevaDisminucionClear());
		this.store.dispatch(setGetActivosClear());
	}
}