import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-alta-usuario',
  templateUrl: './modal-alta-usuario.component.html',
  styleUrls: ['./modal-alta-usuario.component.sass']
})
export class ModalAltaUsuarioComponent implements OnInit {
	cambioColor!: string;
	url!: string;
	type!: string;
	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	redirectTo(): void {
    	this.router.navigate(['home/usuarios/alta', this.type]);
	}

	diferentColor(event: any, type: number): void {
		if (type == 1) {
			this.cambioColor = 'tab1';
			this.type = 'final';
		} else if (type == 2) {
			this.cambioColor = 'tab2';
			this.type = 'backoffice';
		}
	}

}
