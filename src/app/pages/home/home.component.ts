import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NotificationsService } from 'angular2-notifications';
import { INavItem } from 'src/app/shared/models/nav-item.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
	@ViewChild('sidenav', { static: true }) sideNav: MatSidenav | undefined;
	constructor(private noti: NotificationsService) { }
	navItems: INavItem[] = [
		{ name: 'INICIO', route: 'inicio', icon: 'home_outlined', disabled: false },
		{ name: 'ACTIVOS', route: 'activos', icon: 'monetization_on', disabled: false },
		{ name: 'BILLETERAS', route: 'billeteras', icon: 'account_balance_wallet', disabled: true },
		{ name: 'GESTIÓN DE USUARIOS', route: 'usuarios/finales', icon: 'group', disabled: false },
		{ name: 'INCREMENTAR', route: 'incremento', icon: 'trending_up', disabled: false },
		{ name: 'DISMINUIR', route: 'disminucion', icon: 'trending_down', disabled: false },
		{ name: 'NOTIFICACIONES', route: 'notificaciones', icon: 'notifications', disabled: true },
		{ name: 'REPORTES', route: 'reportes', icon: 'summarize', disabled: true }
	];
	ngOnInit(): void {
		//	this.noti.success('Error', 'Error al crear activo');
	}

	onSideNavToggle(): void {
		this.sideNav && this.sideNav.toggle();
	}
}
