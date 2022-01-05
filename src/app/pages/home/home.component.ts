import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { INavItem } from 'src/app/shared/models/nav-item.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
	@ViewChild('sidenav', { static: true }) sideNav: MatSidenav | undefined;
	constructor(
	) { }
	navItems: INavItem[] = [
		{ name: 'INICIO', route: '/home/inicio', icon: 'home_outlined', disabled: false},
		{ name: 'ACTIVOS', route: '/home/activos', icon: 'monetization_on', disabled: false},
		{ name: 'BILLETERAS', route: '/home', icon: 'account_balance_wallet', disabled: true},
		{ name: 'GESTIÓN DE USUARIOS', route: '/home/usuarios/final', icon: 'group', disabled: false},
		{ name: 'INCREMENTAR', route: '/home/incremento', icon: 'trending_up', disabled: false},
		{ name: 'DISMINUIR', route: '/home/disminucion', icon: 'trending_down', disabled: false},
		{ name: 'NOTIFICACIONES', route: '/home', icon: 'notifications', disabled: true},
		{ name: 'REPORTES', route: '/home', icon: 'summarize', disabled: true}
	];
	ngOnInit(): void {
	}

	onSideNavToggle(): void {
		this.sideNav && this.sideNav.toggle();
	}
}
