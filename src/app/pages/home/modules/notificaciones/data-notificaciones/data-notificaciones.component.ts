import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { INotificacion } from 'src/app/shared/models/notificacion.interface';
import { IState } from 'src/app/shared/models/state.interface';
import { INotificacionesReducersMap } from '../notificaciones.reducers.map';
import { setGetNotificaciones } from './store/notificaciones.actions';


@Component({
  selector: 'app-data-notificaciones',
  templateUrl: './data-notificaciones.component.html',
  styleUrls: ['./data-notificaciones.component.sass']
})
export class DataNotificacionesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  notificaciones!: INotificacion[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private noti: NotificationsService,
    private store: Store<{ notificacionesRedecuersMap: INotificacionesReducersMap }>
  ) {
    this.subscriptions.push(
      this.store.select('notificacionesRedecuersMap', 'getNotificaciones').subscribe((res: IState<INotificacion[]>) => {
        this.handleGetNotificaciones(res)
      })
    );
  }

  onCrearNuevoEvent(e: any): void {
    this.router.navigateByUrl('home/notificaciones/nueva-notificacion');
  }

  ngOnInit(): void {
    this.store.dispatch(setGetNotificaciones())
  }

  ngOnDestroy(): void {
  }

  handleGetNotificaciones(res: IState<INotificacion[]>): void {
    if (res.error) this.noti.error('Error', 'Error obteniendo las notificaciones')
    if (res.success && res.response) this.notificaciones = res.response
  }

}
