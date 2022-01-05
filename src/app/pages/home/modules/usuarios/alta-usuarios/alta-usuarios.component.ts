import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IAdmin } from 'src/app/shared/models/admin.interface';
import { IFormUser } from 'src/app/shared/models/form-user.interface';
import { IRol } from 'src/app/shared/models/rol.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';
import { setAltaUsuarios, setAltaUsuariosClear } from './store/alta-usuarios.action';
import { setGetRoles, setGetRolesClear } from './store/get-roles.action';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.sass']
})
export class AltaUsuariosComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public isBackoffice!: boolean;
  public userType!: string;
  public isLinear = true;
  public admin: IAdmin | undefined;

  @ViewChild('stepper') private stepper!: MatStepper;

  roles: IRol[] = [
    { id: 'asdasd', rol: 'ADMIN' },
    { id: 'asdasd', rol: 'MANAGER' },
    { id: 'asdasd', rol: 'VIEWER' }
  ];

  firstStep = this.formBuilder.group({
    shortName: ['', [Validators.maxLength(15), Validators.required]],
    lastName: ['', [Validators.maxLength(15), Validators.required]],
    dni: ['', [Validators.min(1), Validators.required]],
    cuil: ['', [Validators.min(1), Validators.required]],
  })

  secondStep = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/)]],
    repeat_pass: ['', [Validators.required]],
    rol: ['']
  })

  thirdStep = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    phoneNumber: ['', [Validators.min(1), Validators.required]],
    avatarUrl: [' '],
    customId: [' '],
    clientId: ['']
  })

  constructor(
    public route: ActivatedRoute,
    public router: Router,
		private authService: AuthService,
    public formBuilder: FormBuilder,
    private noti: NotificationsService,
    private store: Store<{ usuariosReducersMap: IUsuariosReducersMap }>) {
    this.subscriptions.push(
      this.store.select('usuariosReducersMap', 'altaUsuarios').subscribe((res: IState<IFormUser>) => {
        this.handleAltaUsuarios(res);
      }),
      this.store.select('usuariosReducersMap', 'getRoles').subscribe((res: IState<IRol[]>) => {
        this.handleGetRoles(res);
      }),
      this.route.params.subscribe(params => {
        this.userType = params.type
        this.userType === 'final' ? this.isBackoffice = false : this.isBackoffice = true
      })
    )
  }

  ngOnInit(): void {
	  this.admin = this.authService.getUserData()?.admin; 
    if (this.isBackoffice) this.store.dispatch(setGetRoles());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
    this.store.dispatch(setAltaUsuariosClear());
    this.store.dispatch(setGetRolesClear());
  }

  handleGetRoles(res: IState<IRol[]>): void {
    if (res.error) {
      this.noti.error('Error', 'Error obteniendo los roles')
    }
    if (res.success && res.response) {
      this.roles = res.response
    }
  }

  handleAltaUsuarios(res: IState<IFormUser>): void {
    if (res.error) this.noti.error('Error', res.error.error.message)
    if (res.success) {
      this.noti.success('Éxito', 'Usuario creado con éxito')
      if (this.isBackoffice) this.router.navigate(['home/usuarios/backoffice']);
      else this.router.navigate(['home/usuarios/final']);
    }
  }

  verifyPassword() {
    const { username, password, repeat_pass } = this.secondStep.value
    if(password !== repeat_pass) this.noti.error('Error', 'Las contraseñas no coinciden');
    if(password.length < 8) this.noti.error('Error', 'La contraseña debe contener al menos 8 carácteres');
    if(!password.match(/[0-9]/)) this.noti.error('Error', 'La contraseña debe contener al menos un número');
    if(!password.match(/[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`]/)) this.noti.error('Error', 'La contraseña debe contener al menos un carácter especial');
    if(!password.match(/[A-Z]/)) this.noti.error('Error', 'La contraseña debe contener al menos una letra mayúscula');
    if(!password.match(/[a-z]/)) this.noti.error('Error', 'La contraseña debe contener al menos una letra minúscula');
    if(!username) this.noti.error('Error', 'Debe completar el nombre de usuario');
    else this.stepper.next()
  }

  submit() {
    const { password, repeat_pass } = this.secondStep.value

    if (!this.firstStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el primer paso de registro');
    if (!this.secondStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el segundo paso de registro');
    if (!this.thirdStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el tercer paso de registro');
    if (password !== repeat_pass) return this.noti.error('Error', 'Las contraseñas no coinciden');

    const formUser = {...this.firstStep.value, ...this.secondStep.value, ...this.thirdStep.value}
    //TODO ASIGNAR ROL
    formUser.rol = ''
    formUser.clientId = this.admin?.clientId

    return this.store.dispatch(setAltaUsuarios({ form: formUser, userType: this.userType }))
  }
}
