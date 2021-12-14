import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { INotificacion } from 'src/app/shared/models/notificacion.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { INotificacionesReducersMap } from '../notificaciones.reducers.map';
import { setNuevaNotificacion, setNuevaNotificacionClear } from './store/nueva-notificacion-masiva.actions';

@Component({
	selector: 'app-nueva-notificacion-masiva',
	templateUrl: './nueva-notificacion-masiva.component.html',
	styleUrls: ['./nueva-notificacion-masiva.component.sass']
})
export class NuevaNotificacionMasivaComponent implements OnInit {
	subscriptions: Subscription[] = [];
	isLinear = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private noti: NotificationsService,
		private store: Store<{ notificacionesRedecuersMap: INotificacionesReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('notificacionesRedecuersMap', 'nuevaNotificacion').subscribe((res: IState<INotificacion>) => {
				this.handleNuevaNotificacion(res);
			})
		);
	}

	myForm = this.formBuilder.group({
		asunto: ['', [Validators.required]],
		usuarios: ['', [Validators.required]],
		notificacion: ['', [Validators.required]]
	});

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevaNotificacionClear());
	}

	submitForm() {
		if (!this.myForm.valid)
			return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de creación de activos');
		return this.store.dispatch(setNuevaNotificacion({ form: this.myForm.value }));
	}

	handleNuevaNotificacion(res: IState<INotificacion>): void {
		if (res.error) this.noti.error('Error', 'Error creando la notificacion masiva');
		if (res.success) {
			this.noti.success('Éxito', 'Se ha creado la notificacion masiva corretamente');
			this.router.navigateByUrl('home/notificaciones');
		}
	}
}
