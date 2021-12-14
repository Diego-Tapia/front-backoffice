import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
	selector: 'app-modal-nueva-operacion',
	templateUrl: './modal-nueva-operacion.component.html',
	styleUrls: ['./modal-nueva-operacion.component.sass']
})
export class ModalNuevaOperacionComponent implements OnInit {
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
			this.url = 'home/incremento/nuevo-individual';
		} else if (type == 2) {
			this.cambioColor = 'tab2';
			this.url = 'home/incremento/nuevo-masivo';
		}
	}
}
