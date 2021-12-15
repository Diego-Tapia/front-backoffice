import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { IState } from 'src/app/shared/models/state.interface';
import { IUser } from 'src/app/shared/models/user.interface';
import { IUsuariosReducersMap } from '../usuarios.reducers.map';
import { setAltaUsuarios, setAltaUsuariosClear } from './store/alta-usuarios.action';

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

  roles: string[] = ['ADMIN', 'MANAGER', 'VIEWER'];

  myForm = this.formBuilder.group({
    shortName: ['', [Validators.maxLength(15), Validators.required]],
    lastName: ['', [Validators.maxLength(15), Validators.required]],
    dni: ['', [Validators.min(1), Validators.required]],
    cuil: ['', [Validators.min(1), Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repeat_pass: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phoneNumber: ['', [Validators.min(1), Validators.required]],
    avatarUrl: ['www.google.com'],
    customId: ['61b22f8f7793c500fc435705'],
    clientId: ['61b22f8f7793c500fc435705']
  })

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    private noti: NotificationsService,
    private store: Store<{ usuariosRedecuersMap: IUsuariosReducersMap }>) {
    this.subscriptions.push(
      this.store.select('usuariosRedecuersMap', 'altaUsuarios').subscribe((res: IState<IUser>) => {
        this.handleAltaUsuarios(res);
      }),
      this.route.params.subscribe(params => {
        this.userType = params.type
        if (params.type === 'final') return this.isBackoffice = false
        if (params.type === 'backoffice') return this.isBackoffice = true
        else return this.router.navigate(['home/usuarios/finales']);
      })
    )
  }


  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
    this.store.dispatch(setAltaUsuariosClear());
  }

  handleAltaUsuarios(res: IState<IUser>): void {
    if (res.error) this.noti.error('Error', 'Se produjo un error al crear el usuario')
    if (res.success) {
      this.noti.success('Éxito', 'Usuario creado con éxito')
      if (this.isBackoffice) this.router.navigate(['home/usuarios/backoffice']);
      else this.router.navigate(['home/usuarios/finales']);
    }
  }

  submit() {
    console.log(this.myForm.value);

    const formCopy = this.myForm.value

    if (!this.myForm.valid) return this.noti.error('Error', 'Hay errores o faltan datos en el formulario de registro');
    if (formCopy.password !== formCopy.repeat_pass) return this.noti.error('Error', 'Las contraseñas no coinciden');

    const { repeat_pass, ...resto } = this.myForm.value

    return this.store.dispatch(setAltaUsuarios({ form: resto, userType: this.userType }))
  }
}
