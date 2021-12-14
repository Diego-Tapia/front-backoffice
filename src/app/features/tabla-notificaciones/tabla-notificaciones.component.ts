import { Component, Input, OnInit } from '@angular/core';
import { INotificacion } from 'src/app/shared/models/notificacion.interface';

@Component({
	selector: 'app-tabla-notificaciones',
	templateUrl: './tabla-notificaciones.component.html',
	styleUrls: ['./tabla-notificaciones.component.sass']
})
export class TablaNotificacionesComponent implements OnInit {

	@Input() notificaciones!: INotificacion[];
	public dataSource!: INotificacion[];
	displayedColumns: string[] = ['id', 'asunto', 'estado', 'creacion', 'star'];

	constructor() {}

	ngOnInit(): void {
		this.dataSource = this.notificaciones
	}
}
