import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/activos.actions';
import { setVerifyUsuario, setVerifyUsuarioClear } from '../../usuarios/data-usuarios/store/verify/verify-usuarios.action';
import { IIncrementoReducersMap } from '../incremento.reducers.map';
import { setNuevoIncremento, setNuevoIncrementoClear } from './store/nuevo-inc.actions';

@Component({
	selector: 'app-nuevo-incremento-individual',
	templateUrl: './nuevo-incremento-individual.component.html',
	styleUrls: ['./nuevo-incremento-individual.component.sass']
})
export class NuevoIncrementoIndividualComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	isLinear = true;
	activos: IActivo[] = [];
	usuario!: IUserProfile;

	firstForm = this.formBuilder.group({
		userIdentifier: ['', [Validators.required]],
	})

	verifyForm = this.formBuilder.group({
		unassignedUser: ['', [Validators.required]],
	})

	secondForm = this.formBuilder.group({
		amount: ['', [Validators.required]],
		tokenId: ['', [Validators.required]],
	})

	thirdForm = this.formBuilder.group({
		notes: ['']
	})

	myForm = this.formBuilder.group({
		userIdentifier: ['', [Validators.required]],
		amount: ['', [Validators.required]],
		tokenId: ['', [Validators.required]],
	});

	constructor(
		private formBuilder: FormBuilder,
		private noti: NotificationsService,
		private router: Router,
		private store: Store<{ incrementoRedecuersMap: IIncrementoReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('incrementoRedecuersMap', 'nuevoIncremento').subscribe((res: IState<any>) => {
				this.handleNuevoIncremento(res);
			}),
			this.store.select('incrementoRedecuersMap', 'getActivos').subscribe((res: IState<IActivo[]>) => {
				this.handleGetActivos(res);
			}),
			this.store.select('incrementoRedecuersMap', 'verifyUsuario').subscribe((res: IState<IUserProfile>) => {
				this.handleVerifyUsuario(res);
			})
		);
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivos());
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevoIncrementoClear());
		this.store.dispatch(setVerifyUsuarioClear());
		this.store.dispatch(setGetActivosClear());
	}

	verifyUsuario(){
		console.log(this.verifyForm.value) 
		if(!this.verifyForm.value.unassignedUser) this.noti.error('Error','Debes completar el campo para continuar')
		if(this.verifyForm.value.unassignedUser)
			this.store.dispatch(setVerifyUsuario({userIdentifier: this.verifyForm.value.unassignedUser}));
	}

	submit() {
		if (!this.firstForm.valid) return this.noti.error('Error', 'Hay errores o campos vacíos en el formulario');
		
		const incrementoIndividual = this.firstForm.value
		incrementoIndividual.tokenId = this.firstForm.value.tokenId.id		

		return this.store.dispatch(setNuevoIncremento({ form: incrementoIndividual }));
	}

	handleGetActivos(res: IState<IActivo[]>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema listando los activos');
		if (res.success && res.response) this.activos = res.response
	}

	handleVerifyUsuario(res: IState<IUserProfile>) {	
		if (res.error) {
			if(res.error.status === 404) this.noti.error('Error', 'No se encontró ningun usuario con esa identificación');
			else this.noti.error('Error', res.error.error.message);
			this.firstForm.patchValue({userIdentifier:''})
		} 
		if (res.success && res.response) {
			this.usuario = res.response
		} 
	}

	handleNuevoIncremento(res: IState<any>) {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'El incremento individual se ha creado con éxito');
			this.router.navigate(['home/incremento']);
		}
	}
}
