import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-entity-header',
	templateUrl: './entity-header.component.html',
	styleUrls: ['./entity-header.component.sass']
})
export class EntityHeaderComponent implements OnInit {
	@Input() titleInicio!: string;
	@Input() totalCreditos = 0;

	constructor() {}

	ngOnInit(): void {}
}
