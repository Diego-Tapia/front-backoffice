import { Component, Input, OnInit } from '@angular/core';
import { IIncrementoMasivo } from 'src/app/shared/models/incremento-masivo-tabla.interface';
@Component({
	selector: 'app-tabla-masivos',
	templateUrl: './tabla-masivos.component.html',
	styleUrls: ['./tabla-masivos.component.sass']
})
export class TablaMasivosComponent implements OnInit {
	displayedColumns: string[] = ['id', 'tipo', 'concepto', 'estado', 'creacion', 'actualizacion', 'star'];

	@Input() incrementsMasive!: IIncrementoMasivo[];

	public dataSource: IIncrementoMasivo[] = [];
	constructor() { }

	ngOnInit(): void {
		this.dataSource = this.incrementsMasive;
	}
}
