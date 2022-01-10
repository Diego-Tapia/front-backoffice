import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResIndividual } from 'src/app/shared/models/res-individual.interface';

@Component({
	selector: 'app-tabla-individuales',
	templateUrl: './tabla-individuales.component.html',
	styleUrls: ['./tabla-individuales.component.sass']
})
export class TablaIndividualesComponent implements OnInit {
	displayedColumns: string[] = ['id', 'tipo', 'concepto', 'estado', 'creacion', 'actualizacion', 'star'];

	@Input() individual!: IResIndividual[];

	public dataSource: IResIndividual[] = [];

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.dataSource = this.individual;
	}
}
