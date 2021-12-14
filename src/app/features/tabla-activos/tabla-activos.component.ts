import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IActivo } from 'src/app/shared/models/activo.interface';
import { ModalDetalleActivoComponent } from '../modal-detalle-activo/modal-detalle-activo.component';
import { ModalEmisionActivoComponent } from '../modal-emision-activo/modal-emision-activo.component';
import { ModalReemisionActivoComponent } from '../modal-reemision-activo/modal-reemision-activo.component';
;

@Component({
	selector: 'app-tabla-activos',
	templateUrl: './tabla-activos.component.html',
	styleUrls: ['./tabla-activos.component.sass']
})
export class TablaActivosComponent implements OnInit {

	displayedColumns: string[] = ['symbol', 'shortName', 'money', 'status', 'createdAt', 'star'];

	@Input() activos!: IActivo[]

	public dataSource: IActivo[] = [];

	constructor(
		private router: Router,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.dataSource = this.activos
	}

	modificarActivo(id: string) {
		this.router.navigate(['/home/activos/modificar/', id])
	}

	openEmitir(activo: IActivo) {
		this.dialog.open(ModalEmisionActivoComponent, { data: activo })
	}

	openReemitir(activo: IActivo) {
		this.dialog.open(ModalReemisionActivoComponent, { data: activo })
	}

	openDetalle(activo: IActivo) {
		this.dialog.open(ModalDetalleActivoComponent, { data: activo.id });
	}
}
