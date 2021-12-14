import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-modal-nueva-operacion-disminucion',
	templateUrl: './modal-nueva-operacion-disminucion.component.html',
	styleUrls: ['./modal-nueva-operacion-disminucion.component.sass']
})
export class ModalNuevaOperacionDisminucionComponent implements OnInit {
	cambioColor!: string;
	url!: string;
	constructor(private router: Router, private render: Renderer2, private element: ElementRef) {}

	ngOnInit(): void {}

	redirectTo(): void {
		this.router.navigateByUrl(this.url);
	}
	diferentColor(event: any, type: number): void {
		if (type == 1) {
			this.cambioColor = 'tab1';
			this.url = 'home/disminucion/nueva-individual';
		} else if (type == 2) {
			this.cambioColor = 'tab2';
			this.url = 'home/disminucion/nueva-masiva';
		}
	}
}
