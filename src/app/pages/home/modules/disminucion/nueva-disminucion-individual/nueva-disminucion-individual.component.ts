import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IDisminucionReducersMap } from '../disminuciones.reducers.map';
import { setNuevaDisminucion, setNuevaDisminucionClear } from './store/nueva-dis.action';
import { IState } from '../../../../../shared/models/state.interface';
import { NotificationsService } from 'angular2-notifications';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';
import { setGetActivos, setGetActivosClear } from '../../activos/data-activos/store/get-activos/activos.actions';
import { Router } from '@angular/router';
import { IReqMasivo } from 'src/app/shared/models/req-masivo.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { setVerifyUsuario } from '../../usuarios/data-usuarios/store/verify/verify-usuarios.action';
import { IResMasivo } from 'src/app/shared/models/res-masivo.interface';

@Component({
	selector: 'app-nueva-disminucion-individual',
	templateUrl: './nueva-disminucion-individual.component.html',
	styleUrls: ['./nueva-disminucion-individual.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class NuevaDisminucionIndividualComponent implements OnInit, OnDestroy {
	isLinear = true;
	subscriptions: Subscription[] = [];
	activos: IActivo[] = []
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
		private store: Store<{ disminucionReducersMap: IDisminucionReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('disminucionReducersMap', 'nuevaDisminucion').subscribe((res: IState<IResMasivo |  null>) => {
				this.handleNuevaDisminucion(res);
			}),
			this.store.select('disminucionReducersMap', 'getActivos').subscribe((res: IState<IActivo[] | null>) => {
				this.handleGetActivos(res);
			}),
			this.store.select('disminucionReducersMap', 'verifyUsuario').subscribe((res: IState<IUserProfile | null>) => {
				this.handleVerifyUsuario(res);
			})
		);
	}

	ngOnInit(): void {
		this.store.dispatch(setGetActivos());
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setNuevaDisminucionClear());
		this.store.dispatch(setGetActivosClear());
	}
	
	verifyUsuario(){
		if(!this.verifyForm.value.unassignedUser) this.noti.error('Error','Debes completar el campo para continuar')
		if(this.verifyForm.value.unassignedUser)
			this.store.dispatch(setVerifyUsuario({userIdentifier: this.verifyForm.value.unassignedUser}));
	}

	submit() {
		if (!this.secondStep.valid) return this.noti.error('Error', 'Hay errores o campos vac??os en el formulario');
		
		const disminucionIndividual = {...this.secondStep.value, ...this.thirdStep.value}
		disminucionIndividual.tokenId = this.secondStep.value.tokenId.id

		return this.store.dispatch(setNuevaDisminucion({ form: disminucionIndividual }));
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

	handleVerifyUsuario(res: IState<IUserProfile | null>) {	
		if (res.error) {
			if(res.error.status === 404) this.noti.error('Error', 'No se encontr?? ningun usuario con esa identificaci??n');
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

	handleNuevaDisminucion(res: IState<IResMasivo |  null>) {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('??xito', 'La disminuci??n individual se ha creado con ??xito');
			this.router.navigate(['home/disminucion']);
		}
	}
}