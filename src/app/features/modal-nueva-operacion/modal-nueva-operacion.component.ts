import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-nueva-operacion',
  templateUrl: './modal-nueva-operacion.component.html',
  styleUrls: ['./modal-nueva-operacion.component.sass']
})
export class ModalNuevaOperacionComponent implements OnInit {
	cambioColor!: string;
	url!: string;
	constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

	ngOnInit(): void {}

	redirectTo(): void {
		this.router.navigateByUrl(this.url);
	}

	diferentColor(event: any, type: number): void {
		if (type == 1) {
			this.cambioColor = 'tab1';
      (this.data === 'incremento')
      ? this.url = 'home/incremento/nuevo-individual'
      : this.url = 'home/disminucion/nueva-individual'
		} else if (type == 2) {
			this.cambioColor = 'tab2';
      (this.data === 'incremento')
      ? this.url = 'home/incremento/nuevo-masivo'
      : this.url = 'home/disminucion/nueva-masiva'
		}
	}
}
