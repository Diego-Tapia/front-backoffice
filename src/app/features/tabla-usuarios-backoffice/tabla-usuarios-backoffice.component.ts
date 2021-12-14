import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.interface';

@Component({
	selector: 'app-tabla-usuarios-backoffice',
	templateUrl: './tabla-usuarios-backoffice.component.html',
	styleUrls: ['./tabla-usuarios-backoffice.component.sass']
})
export class TablaUsuariosBackofficeComponent implements OnInit {
	
	@Input() usuarios!:IUser[]
	
	displayedColumns: string[] = ['dni', 'userName', 'createdAt', 'status', 'star'];
	
	public dataSource: IUser[] = [];
	
	
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.dataSource = this.usuarios		
	}

	verDetalle(id: string) {
		this.router.navigate(['/home/usuarios/detalle/backoffice', id]);
	}

	modificar(id: string) {
		this.router.navigate(['/home/usuarios/modificar/backoffice', id]);
	}
}
