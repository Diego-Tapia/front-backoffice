import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IActivo } from 'src/app/shared/models/activos/activo.interface';

@Component({
	selector: 'app-modal-detalle-activo',
	templateUrl: './modal-detalle-activo.component.html',
	styleUrls: ['./modal-detalle-activo.component.sass']
})
export class ModalDetalleActivoComponent implements OnInit {
	subscriptions: Subscription[] = [];
	public activo!: IActivo;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IActivo,
		private dialogRef: MatDialogRef<ModalDetalleActivoComponent>,
	) {	}

	ngOnInit(): void { 
		this.activo = this.data
	}
}
