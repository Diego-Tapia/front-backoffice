import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataIndividual } from 'src/app/shared/models/data-individual.interface';

@Component({
	selector: 'app-tabla-individuales',
	templateUrl: './tabla-individuales.component.html',
	styleUrls: ['./tabla-individuales.component.sass']
})
export class TablaIndividualesComponent implements OnInit {
	displayedColumns: string[] = ['id', 'tipo', 'concepto', 'estado', 'creacion', 'actualizacion', 'star'];

	@Input() incrementsIndividual!: IDataIndividual[];

	public dataSource: IDataIndividual[] = [];

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.dataSource = this.incrementsIndividual;
	}
}
