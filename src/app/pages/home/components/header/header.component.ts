import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { IAdmin } from 'src/app/shared/models/admin.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
	@Output() sideNavToggle = new EventEmitter();

	admin: IAdmin | undefined;
	
	constructor(
		private authService: AuthService,
		) {}

	ngOnInit(): void {		
		this.admin = this.authService.getUserData()?.admin
	}

	toggleSideNav(): void {
		this.sideNavToggle.emit();
	}

	onLogOut(): void {
		this.authService.logOut();
	}
}
