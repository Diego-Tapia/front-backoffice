import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
	selector: 'app-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.sass']
})
export class TitleComponent implements OnInit {
	constructor() {}

	@Input() title!: string;
	@Input() textButton!: string;

	@Output() crearNuevoEvent = new EventEmitter();

	ngOnInit(): void {}

	crearNuevo(): void {
		this.crearNuevoEvent.emit();
	}
}
