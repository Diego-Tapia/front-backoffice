import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IAdmin } from 'src/app/shared/models/admin.interface';
import { IRol } from 'src/app/shared/models/rol.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { setGetUsuarioById, setGetUsuarioByIdClear } from '../data-usuarios/store/get-by-id/get-usuarios-by-id.action';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';
import { setEditarUsuario, setEditarUsuarioClear } from './store/editar-usuario.action';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
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
		dni: ['', [Validators.min(1), Validators.minLength(7), Validators.maxLength(9), Validators.required]],
		cuil: ['', [Validators.min(1), Validators.minLength(11), Validators.maxLength(11), Validators.required]],
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
			this.store.select('usuariosReducersMap', 'getUsuarioById').subscribe((res: IState<IUserProfile | null>) => {
				this.handleGetUsuarioById(res);
			}),
			this.store.select('usuariosReducersMap', 'getRoles').subscribe((res: IState<IRol[] | null>) => {
				this.handleGetRoles(res);
			}),
			this.store.select('usuariosReducersMap', 'editarUsuario').subscribe((res: IState<IUserProfile | null>) => {
				this.handleEditarUsuarios(res);
			}),
			this.route.params.subscribe((params) => {
				this.userType = params.type;
				this.id = params.id;
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
		this.store.dispatch(setEditarUsuarioClear());
	}

	handleGetUsuarioById(res: IState<IUserProfile | null>): void {
		if (res.error) this.noti.error('Error', 'Ocurri?? un problema obteniendo el usuario');
		if (res.success && res.response) this.updateFormValues(res.response);
	}

	handleGetRoles(res: IState<IRol[] | null>): void {
		if (res.error) {
			this.noti.error('Error', 'Error obteniendo los roles')
			if (res.success && res.response) {
				this.roles = res.response
			}
		}
	}

	handleEditarUsuarios(res: IState<IUserProfile | null>): void {
		if (res.error) this.noti.error('Error', res.error.error.message);
		if (res.success) {
			this.noti.success('??xito', 'Usuario editado con ??xito');
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
			avatarUrl: usuario.avatarUrl
		});
	}

	submit() {
		if (!this.editForm.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el formulario');

		//TODO ASIGNAR ROL

		return this.store.dispatch(setEditarUsuario({ id: this.id, form: this.editForm.value, userType:this.userType }));
	}
}
