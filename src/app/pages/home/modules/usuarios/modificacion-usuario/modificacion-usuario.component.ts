import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IAdmin } from 'src/app/shared/models/admin.interface';
import { IFormUser } from 'src/app/shared/models/form-user.interface';
import { IRol } from 'src/app/shared/models/rol.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { setGetUsuarioById, setGetUsuarioByIdClear } from '../data-usuarios/store/get-by-id/get-usuarios-by-id.action';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';
import { setModificacionUsuarios, setModificacionUsuariosClear } from './store/modificacion-usuarios.action';

@Component({
	selector: 'app-modificacion-usuario',
	templateUrl: './modificacion-usuario.component.html',
	styleUrls: ['./modificacion-usuario.component.sass']
})
export class ModificacionUsuarioComponent implements OnInit {
	subscriptions: Subscription[] = [];
	isBackoffice: boolean = true;
	id!: string;
	userType!: string;
	public admin!: IAdmin | null;

	roles: IRol[] = [
		{ id: 'aa00', rol: 'ADMIN' },
		{ id: 'aa01', rol: 'MANAGER' },
		{ id: 'aa02', rol: 'VIEWER' }
	];

	editForm = this.formBuilder.group({
		shortName: ['', [Validators.maxLength(15), Validators.required]],
		lastName: ['', [Validators.maxLength(15), Validators.required]],
		dni: ['', [Validators.min(1), Validators.required]],
		cuil: ['', [Validators.min(1), Validators.required]],
		email: ['', [Validators.email, Validators.required]],
		phoneNumber: ['', [Validators.min(1), Validators.required]],
		avatarUrl: [''],
	})

	constructor(
		public route: ActivatedRoute,
		public router: Router,
		private authService: AuthService,
		public formBuilder: FormBuilder,
		private noti: NotificationsService,
		private store: Store<{ usuariosReducersMap: IUsuariosReducersMap }>
	) {
		this.subscriptions.push(
			this.store.select('usuariosReducersMap', 'getUsuarioById').subscribe((res: IState<IUserProfile>) => {
				this.handleGetUsuarioById(res);
			}),
			this.store.select('usuariosReducersMap', 'getRoles').subscribe((res: IState<IRol[]>) => {
				this.handleGetRoles(res);
			}),
			this.store.select('usuariosReducersMap', 'modificarUsuario').subscribe((res: IState<IFormUser>) => {
				this.handleModificarUsuarios(res);
			}),
			this.route.params.subscribe((params) => {
				this.userType = params.type;
				this.id = params.id;
				if (this.userType === 'final') return (this.isBackoffice = false);
				if (this.userType === 'backoffice') return (this.isBackoffice = true);
				else return this.router.navigate(['home/usuarios/final']);
			})
		);
	}

	ngOnInit(): void {
		this.admin = this.authService.getUserData()?.admin
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

	handleModificarUsuarios(res: IState<IFormUser>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('Éxito', 'Usuario modificado con éxito');
			(this.userType === 'backoffice') 
			? this.router.navigate(['home/usuarios/backoffice'])
			: this.router.navigate(['home/usuarios/final']);
		}
	}

	updateFormValues(usuario: IUserProfile) {
		this.editForm.patchValue({
			shortName: usuario.shortName,
			lastName: usuario.lastName,
			dni: usuario.dni,
			cuil: usuario.cuil,
			email: usuario.email,
			phoneNumber: usuario.phoneNumber,
		});
	}

	submit() {
		if (!this.editForm.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el formulario');

		//TODO ASIGNAR ROL

		return this.store.dispatch(setModificacionUsuarios({ id: this.id, form: this.editForm.value, userType:this.userType }));
	}
}
