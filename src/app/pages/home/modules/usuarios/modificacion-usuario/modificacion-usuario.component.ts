import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IFormUser } from 'src/app/shared/models/form-user.interface';
import { IRol } from 'src/app/shared/models/rol.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';

import { setGetUsuarioById, setGetUsuarioByIdClear } from '../data-usuarios/store/get-usuarios-by-id.action';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';
import { setModificacionUsuarios, setModificacionUsuariosClear } from './store/modificacion-usuarios.action';

@Component({
	selector: 'app-modificacion-usuario',
	templateUrl: './modificacion-usuario.component.html',
	styleUrls: ['./modificacion-usuario.component.sass']
})
export class ModificacionUsuarioComponent implements OnInit {
	subscriptions: Subscription[] = [];
	isLinear = false;
	isBackoffice: boolean = true;
	id!: string;
	userType!: string;

	roles: IRol[] = [
		{ id: 'asdasd', rol: 'ADMIN' },
		{ id: 'asdasd', rol: 'MANAGER' },
		{ id: 'asdasd', rol: 'VIEWER' }
	];

	myForm = this.formBuilder.group({
		shortName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
		dni: ['', [Validators.min(1), Validators.required]],
		cuil: ['', [Validators.min(1), Validators.required]],
		username: ['', [Validators.required]],
		rol: [''],
		password: ['', [Validators.required]],
		repeat_pass: ['', [Validators.required]],
		email: ['', [Validators.email, Validators.required]],
		phoneNumber: ['', [Validators.min(1), Validators.required]],
		avatarUrl: [''],
		customId: [''],
		clientId: ['']
	});

	constructor(
		public route: ActivatedRoute,
		public router: Router,
		public formBuilder: FormBuilder,
		private noti: NotificationsService,
		private store: Store<{ usuariosRedecuersMap: IUsuariosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('usuariosRedecuersMap', 'getUsuarioById').subscribe((res: IState<IUserProfile>) => {
				this.handleGetUsuarioById(res);
			}),
			this.store.select('usuariosRedecuersMap', 'getRoles').subscribe((res: IState<IRol[]>) => {
				this.handleGetRoles(res);
			}),
			this.store.select('usuariosRedecuersMap', 'modificacionUsuario').subscribe((res: IState<IFormUser>) => {
				this.handleModificacionUsuarios(res);
			}),
			this.route.params.subscribe((params) => {
				this.userType = params.type;
				this.id = params.id;
				if (params.type === 'final') return (this.isBackoffice = false);
				if (params.type === 'backoffice') return (this.isBackoffice = true);
				else return this.router.navigate(['home/usuarios/finales']);
			})
		);
	}

	ngOnInit(): void {
		this.store.dispatch(setGetUsuarioById({ userType: this.userType, id: this.id }));
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subs) => subs.unsubscribe());
		this.store.dispatch(setGetUsuarioByIdClear());
		this.store.dispatch(setModificacionUsuariosClear());
	}

	handleGetUsuarioById(res: IState<IUserProfile>): void {
		if (res.error) this.noti.error('Error', 'Ocurrió un problema obteniendo el usuario');
		if (res.success && res.response) this.updateFormValues(res.response);
	}

	handleGetRoles(res: IState<IRol[]>): void {
		if (res.error) {
			this.noti.error('Error', 'Error obteniendo los roles')
			if (res.success && res.response) {
				this.roles = res.response
			}
		}
	}

	handleModificacionUsuarios(res: IState<IFormUser>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Usuario modificado con éxito');
			if (this.isBackoffice) this.router.navigate(['home/usuarios/backoffice']);
			else this.router.navigate(['home/usuarios/finales']);
		}
	}

	updateFormValues(usuario: IUserProfile) {		
		this.myForm.patchValue({
			shortName: usuario.shortName,
			lastName: usuario.lastName,
			dni: usuario.dni,
			cuil: usuario.cuil,
			rol: (usuario.rol ? usuario.rol : ''),
			password: '',
			repeat_pass: '',
			username: usuario.userId.username,
			email: usuario.email,
			phoneNumber: usuario.phoneNumber,
			avatarUrl: usuario.userId.clientId,
			customId: usuario.userId.clientId,
			clientId: usuario.userId.clientId,
		
		});
	}

	submit() {
		const { password, repeat_pass } = this.myForm.value

		if (!this.myForm.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de registro');
		if (password !== repeat_pass) return this.noti.error('Error', 'Las contraseñas no coinciden');


		const putUser = this.myForm.value
		putUser.rol = putUser.rol.id
		

		return this.store.dispatch(setModificacionUsuarios({ id: this.id, form: putUser }));
	}
}
