import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IAdmin } from 'src/app/shared/models/admin.interface';
import { IReqUser } from 'src/app/shared/models/req-user.interface';
import { IRol } from 'src/app/shared/models/rol.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { IUserProfile } from 'src/app/shared/models/user-profile.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';
import { setAltaUsuarios, setAltaUsuariosClear } from './store/alta-usuario/alta-usuarios.action';

import { setGetRoles, setGetRolesClear } from './store/get-roles/get-roles.action';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AltaUsuariosComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public userType!: string;
  public isLinear = true;
  public admin: IAdmin | undefined;
  public hide: boolean = true;
  
  @ViewChild('stepper') private stepper!: MatStepper;

  roles: IRol[] = [
    { id: 'asdasd', rol: 'ADMIN' },
    { id: 'asdasd', rol: 'MANAGER' },
    { id: 'asdasd', rol: 'VIEWER' }
  ];

  firstStep: FormGroup = this.formBuilder.group({
    shortName: ['', [Validators.required, Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.maxLength(30)]],
    dni: ['', [Validators.required, Validators.min(999999)]],
    cuil: ['', [Validators.required, Validators.min(19999999999), Validators.max(30000000000)]],  
  })

  secondStep: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/)]],
    repeat_pass: ['', [Validators.required]],
    rol: ['']
  })

  thirdStep: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.min(1)]],
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
      this.store.select('usuariosReducersMap', 'altaUsuarios').subscribe((res: IState<IUserProfile | null>) => {
        this.handleAltaUsuarios(res);
      }),
      this.store.select('usuariosReducersMap', 'getRoles').subscribe((res: IState<IRol[] | null>) => {
        this.handleGetRoles(res);
      }),
      this.route.params.subscribe(params => this.userType = params.type)
    )
  }

  ngOnInit(): void {
	  this.admin = this.authService.getUserData()?.admin; 
    // if (this.userType ===  'backoffice') this.store.dispatch(setGetRoles());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
    this.store.dispatch(setAltaUsuariosClear());
    this.store.dispatch(setGetRolesClear());
  }

  handleGetRoles(res: IState<IRol[] | null>): void {
    if (res.error) {
      this.noti.error('Error', 'Error obteniendo los roles')
    }
    if (res.success && res.response) {
      this.roles = res.response
    }
  }

  handleAltaUsuarios(res: IState<IUserProfile | null>): void {
    if (res.error) this.noti.error('Error', res.error.error.message)
    if (res.success) {
      this.noti.success('??xito', 'Usuario creado con ??xito')
      if (this.userType === 'backoffice') this.router.navigate(['home/usuarios/backoffice']);
      else this.router.navigate(['home/usuarios/final']);
    }
  }

  verifyPassword() {    
    const { username, password, repeat_pass } = this.secondStep.value
    if(!username) this.noti.error('Error', 'Debe completar el nombre de usuario');
    if(password.length < 8) this.noti.error('Error', 'La contrase??a debe contener al menos 8 car??cteres');
    if(!password.match(/[0-9]/)) this.noti.error('Error', 'La contrase??a debe contener al menos un n??mero');
    if(!password.match(/[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`]/)) this.noti.error('Error', 'La contrase??a debe contener al menos un car??cter especial');
    if(!password.match(/[A-Z]/)) this.noti.error('Error', 'La contrase??a debe contener al menos una letra may??scula');
    if(!password.match(/[a-z]/)) this.noti.error('Error', 'La contrase??a debe contener al menos una letra min??scula');
    if(password !== repeat_pass) {
      this.secondStep.patchValue({password: '', repeat_pass: ''})
      this.noti.error('Error', 'Las contrase??as no coinciden');
    } 
    else this.stepper.next()
  }

  submit() {
    const { password, repeat_pass } = this.secondStep.value

    if (!this.firstStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el primer paso de registro');
    if (!this.secondStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el segundo paso de registro');
    if (!this.thirdStep.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el tercer paso de registro');
    if (password !== repeat_pass) return this.noti.error('Error', 'Las contrase??as no coinciden');

    const formUser = {...this.firstStep.value, ...this.secondStep.value, ...this.thirdStep.value}
    //TODO ASIGNAR ROL
    formUser.rol = ''
    formUser.clientId = this.admin?.clientId

    return this.store.dispatch(setAltaUsuarios({ form: formUser, userType: this.userType }))
  }
}
