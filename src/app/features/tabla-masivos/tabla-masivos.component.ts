import { Component, Input, OnInit } from '@angular/core';
import { IDataMasivo } from 'src/app/shared/models/data-masivo.interface';
@Component({
	selector: 'app-tabla-masivos',
	templateUrl: './tabla-masivos.component.html',
	styleUrls: ['./tabla-masivos.component.sass']
})
export class TablaMasivosComponent implements OnInit {
	displayedColumns: string[] = ['id', 'concepto', 'estado', 'creacion', 'actualizacion', 'star'];

	@Input() incrementsMasive!: IDataMasivo[];

	public dataSource: IDataMasivo[] = [];
	constructor() { }

	ngOnInit(): void {
		this.dataSource = this.incrementsMasive;
	}
}
