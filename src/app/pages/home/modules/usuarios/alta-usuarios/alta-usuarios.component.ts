import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
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

  subscriptions: Subscription[] = [];
  isBackoffice!: boolean;
  userType!: string;
  isLinear = false;
  public userData!: any;

  roles: IRol[] = [
    { id: 'asdasd', rol: 'ADMIN' },
    { id: 'asdasd', rol: 'MANAGER' },
    { id: 'asdasd', rol: 'VIEWER' }
  ];

  myForm = this.formBuilder.group({
    shortName: ['', [Validators.maxLength(15), Validators.required]],
    lastName: ['', [Validators.maxLength(15), Validators.required]],
    dni: ['', [Validators.min(1), Validators.required]],
    cuil: ['', [Validators.min(1), Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rol: [''],
    repeat_pass: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phoneNumber: ['', [Validators.min(1), Validators.required]],
    avatarUrl: ['avatarUrl'],
    customId: ['customId'],
		clientId: [''],
  })

  constructor(
    public route: ActivatedRoute,
    public router: Router,
		private authService: AuthService,
    public formBuilder: FormBuilder,
    private noti: NotificationsService,
    private store: Store<{ usuariosRedecuersMap: IUsuariosReducersMap }>) {
    this.subscriptions.push(
      this.store.select('usuariosRedecuersMap', 'altaUsuarios').subscribe((res: IState<IFormUser>) => {
        this.handleAltaUsuarios(res);
      }),
      this.store.select('usuariosRedecuersMap', 'getRoles').subscribe((res: IState<IRol[]>) => {
        this.handleGetRoles(res);
      }),
      this.route.params.subscribe(params => {
        this.userType = params.type
        if (params.type === 'final') return this.isBackoffice = false
        if (params.type === 'backoffice') return this.isBackoffice = true
        else return this.router.navigate(['home/usuarios/finales']);
      })
    )
  }

  ngOnInit(): void {
		this.userData = this.authService.getUserData()    
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
      this.roles = [
        {
          id: 'asdasd',
          rol: 'ADMIN'
        },
        {
          id: 'asdasd',
          rol: 'MANAGER'
        },
        {
          id: 'asdasd',
          rol: 'VIEWER'
        }
      ];

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
      else this.router.navigate(['home/usuarios/finales']);
    }
  }

  submit() {
    const { password, repeat_pass } = this.myForm.value

    if (!this.myForm.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de registro');
    if (password !== repeat_pass) return this.noti.error('Error', 'Las contraseñas no coinciden');

    const newUser = this.myForm.value
    newUser.rol = ''
    newUser.clientId = this.userData.admin.clientId

    return this.store.dispatch(setAltaUsuarios({ form: newUser, userType: this.userType }))
  }
}
