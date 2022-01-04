import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { INavItem } from 'src/app/shared/models/nav-item.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
	@ViewChild('sidenav', { static: true }) sideNav: MatSidenav | undefined;
	constructor(
		private noti: NotificationsService,
		private router: Router
	) { }
	navItems: INavItem[] = [
		{ name: 'INICIO', route: '/home/inicio', icon: 'home_outlined', disabled: false, soon: true },
		{ name: 'ACTIVOS', route: '/home/activos', icon: 'monetization_on', disabled: false, soon: true },
		{ name: 'BILLETERAS', route: '/home', icon: 'account_balance_wallet', disabled: true, soon: false },
		{ name: 'GESTIÓN DE USUARIOS', route: '/home/usuarios/final', icon: 'group', disabled: false, soon: true },
		{ name: 'INCREMENTAR', route: '/home/incremento', icon: 'trending_up', disabled: false, soon: true },
		{ name: 'DISMINUIR', route: '/home/disminucion', icon: 'trending_down', disabled: false, soon: true },
		{ name: 'NOTIFICACIONES', route: '/home', icon: 'notifications', disabled: true, soon: false },
		{ name: 'REPORTES', route: '/home', icon: 'summarize', disabled: true, soon: false }
	];
	ngOnInit(): void {
		//	this.noti.success('Error', 'Error al crear activo');
	}

	onSideNavToggle(): void {
		this.sideNav && this.sideNav.toggle();
	}
}
