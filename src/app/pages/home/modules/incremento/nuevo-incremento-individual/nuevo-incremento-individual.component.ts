import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/activos.actions';
import { IIncrementoReducersMap } from '../incremento.reducers.map';
import { setNuevoIncremento, setNuevoIncrementoClear } from './store/nuevo-inc.actions';

@Component({
	selector: 'app-nuevo-incremento-individual',
	templateUrl: './nuevo-incremento-individual.component.html',
	styleUrls: ['./nuevo-incremento-individual.component.sass']
})
export class NuevoIncrementoIndividualComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	isLinear = false;
	activos: IActivo[] = []

	myForm = this.formBuilder.group({
		userIdentifier: ['', [Validators.required]],
		amount: ['', [Validators.required]],
		tokenId: ['', [Validators.required]],
		notes: ['']
	});

	constructor(
		private formBuilder: FormBuilder,
		private noti: NotificationsService,
		private router: Router,
		private store: Store<{ incrementoRedecuersMap: IIncrementoReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('incrementoRedecuersMap', 'nuevoIncremento').subscribe((res) => {
				this.handleNuevoIncremento(res);
			}),
			this.store.select('incrementoRedecuersMap', 'getActivos').subscribe((res) => {
				this.handleGetActivos(res);
			})
		);
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivos());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevoIncrementoClear());
		this.store.dispatch(setGetActivosClear());
	}

	submit() {
		if (!this.myForm.valid) return this.noti.error('Error', 'Hay errores o campos vacíos en el formulario');
		
		const incrementoIndividual = this.myForm.value
		incrementoIndividual.tokenId = this.myForm.value.tokenId.id		

		return this.store.dispatch(setNuevoIncremento({ form: incrementoIndividual }));
	}

	handleGetActivos(res: IState<any>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema listando los activos');
		if (res.success && res.response) this.activos = res.response
	}

	handleNuevoIncremento(res: IState<any>) {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'El incremento individual se ha creado con éxito');
		}
	}
}
