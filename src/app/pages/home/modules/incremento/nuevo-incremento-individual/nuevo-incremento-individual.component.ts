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

	verifyForm = this.formBuilder.group({
		unassignedUser: ['', [Validators.required]],
		verified:['', [Validators.required]]
	})

	secondStep = this.formBuilder.group({
		userIdentifier: ['', [Validators.required]],
		amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
		tokenId: ['', [Validators.required]],
	});
	
	thirdStep = this.formBuilder.group({
		notes:['']
	})

	constructor(
		private formBuilder: FormBuilder,
		private noti: NotificationsService,
		private router: Router,
		private store: Store<{ incrementoReducersMap: IIncrementoReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('incrementoReducersMap', 'nuevoIncremento').subscribe((res: IState<any>) => {
				this.handleNuevoIncremento(res);
			}),
			this.store.select('incrementoReducersMap', 'getActivos').subscribe((res: IState<IActivo[]>) => {
				this.handleGetActivos(res);
			}),
			this.store.select('incrementoReducersMap', 'verifyUsuario').subscribe((res: IState<IUserProfile>) => {
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
		if(!this.verifyForm.value.unassignedUser) this.noti.error('Error','Debes completar el campo para continuar')
		if(this.verifyForm.value.unassignedUser)
			this.store.dispatch(setVerifyUsuario({userIdentifier: this.verifyForm.value.unassignedUser}));
	}

	submit() {
		if (!this.secondStep.valid) return this.noti.error('Error', 'Hay errores o campos vacíos en el formulario');
		
		const incrementoIndividual = {...this.secondStep.value, ...this.thirdStep.value}
		incrementoIndividual.tokenId = this.secondStep.value.tokenId.id

		return this.store.dispatch(setNuevoIncremento({ form: incrementoIndividual }));
	}

	handleGetActivos(res: IState<IActivo[]>) {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema listando los activos');
		if (res.success && res.response) {
			res.response.forEach(activo => {
				if(activo.emited && activo.status === 'ACTIVE')
				this.activos.push(activo)
			})
		} 
	}

	handleVerifyUsuario(res: IState<IUserProfile>) {	
		if (res.error) {
			if(res.error.status === 404) this.noti.error('Error', 'No se encontró ningun usuario con esa identificación');
			else this.noti.error('Error', res.error.error.message);
			this.verifyForm.patchValue({verified:''})
			this.secondStep.patchValue({userIdentifier:''})
		} 
		if (res.success && res.response) {
			this.usuario = res.response
			this.verifyForm.patchValue({verified:true})
			this.secondStep.patchValue({userIdentifier:this.verifyForm.value.unassignedUser})
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
