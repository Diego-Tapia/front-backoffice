import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.interface';


@Component({
	selector: 'app-tabla-usuarios-finales',
	templateUrl: './tabla-usuarios-finales.component.html',
	styleUrls: ['./tabla-usuarios-finales.component.sass']
})
export class TablaUsuariosFinalesComponent implements OnInit {

	@Input() usuarios!: IUser[]

	displayedColumns: string[] = ['dni', 'username', 'createdAt', 'status', 'star'];

	public dataSource: IUser[] = [];


	constructor(private router: Router) { }

	ngOnInit(): void {
		this.dataSource = this.usuarios
	}

	verDetalle(id: string) {
		this.router.navigate(['/home/usuarios/detalle/final', id]);
	}

	modificar(id: string) {
		this.router.navigate(['/home/usuarios/modificar/final', id], { state: { data: false } });
	}
}
