import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { ITransaccion } from 'src/app/shared/models/transaccion.interface';
import { IFeaturesReducersMap } from '../features.reducers.map';
import { setReemitirActivos, setReemitirActivosClear } from './store/reemitir-activos.actions';

@Component({
	selector: 'app-modal-reemision-activo',
	templateUrl: './modal-reemision-activo.component.html',
	styleUrls: ['./modal-reemision-activo.component.sass']
})
export class ModalReemisionActivoComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];

	reemitForm = this.formBuilder.group({
		id: [this.data.id, Validators.required],
		symbol: [{ value: this.data.symbol, disabled: true }, [Validators.required]],
		amount: ['', [Validators.min(1), Validators.required]]
	});

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IActivo,
		private formBuilder: FormBuilder,
		private noti: NotificationsService,
		private dialogRef: MatDialogRef<ModalReemisionActivoComponent>,
		private store: Store<{ featuresReducersMap: IFeaturesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('featuresReducersMap', 'reemitirActivo').subscribe((res: IState<ITransaccion | null>) => {
				this.handleReemitirActivo(res);
			})
		);
	}

	reemitirActivo() {
		if (!this.reemitForm.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de reemisión');
		return this.store.dispatch(setReemitirActivos({ form: this.reemitForm.value }));
	}

	handleReemitirActivo(res: IState<ITransaccion | null>): void {
		if (res.error) {
			this.noti.error('Error', res.error.error.message);
			this.dialogRef.close();
		} 
		if (res.success) {
			this.noti.success('Éxito', 'Se ha reemitido el activo con éxito');
			this.dialogRef.close();
		}
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setReemitirActivosClear());
	}
}
