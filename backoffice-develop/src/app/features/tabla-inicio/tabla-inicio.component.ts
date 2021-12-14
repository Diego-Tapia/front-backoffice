import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
	activos: string;
	usuario: string;
	operacion: string;
	fecha: string;
	monto: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{
		activos: 'ACT 1',
		usuario: 'ID Usuario 1',
		operacion: 'Disminucion 1',
		fecha: '05/02/2021',
		monto: '(5.000)'
	},
	{
		activos: 'CRE 2',
		usuario: 'ID Usuario 2',
		operacion: 'Incremento individual 1',
		fecha: '01/02/2021',
		monto: '100'
	},
	{
		activos: 'CRE 3',
		usuario: 'ID Usuario 3',
		operacion: 'Incremento 1',
		fecha: '01/02/2021',
		monto: '100.000'
	},
	{
		activos: 'CRE 4',
		usuario: 'ID Usuario 4',
		operacion: 'Incremento 2',
		fecha: '01/02/2021',
		monto: '8.500'
	},
	{
		activos: 'CRE 5',
		usuario: 'ID Usuario 5',
		operacion: 'Disminucion individual 1',
		fecha: '01/02/2021',
		monto: '(400)'
	}
];

@Component({
	selector: 'app-tabla-inicio',
	templateUrl: './tabla-inicio.component.html',
	styleUrls: ['./tabla-inicio.component.sass']
})
export class TablaInicioComponent implements OnInit {
	displayedColumns: string[] = ['activos', 'usuario', 'operacion', 'fecha', 'monto'];
	dataSource = ELEMENT_DATA;
	constructor() {}

	ngOnInit(): void {}
}
