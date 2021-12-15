import { Component, Input, OnInit } from '@angular/core';
import { IIncrementoIndividual } from 'src/app/shared/models/incremento-individual-tabla.interface';
@Component({
	selector: 'app-tabla-masivos',
	templateUrl: './tabla-masivos.component.html',
	styleUrls: ['./tabla-masivos.component.sass']
})
export class TablaMasivosComponent implements OnInit {
	displayedColumns: string[] = ['id', 'tipo', 'concepto', 'estado', 'creacion', 'actualizacion', 'star'];

	@Input() incrementsMasive!: IIncrementoIndividual[];

	public dataSource: IIncrementoIndividual[] = [];
	constructor() { }

	ngOnInit(): void {
		this.dataSource = this.incrementsMasive;
	}
}
