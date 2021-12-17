import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
	@Output() sideNavToggle = new EventEmitter();

	public userData!: any;
	
	constructor(
		private authService: AuthService,
		) {}

	ngOnInit(): void {		
		this.userData = this.authService.getUserData()
	}

	toggleSideNav(): void {
		this.sideNavToggle.emit();
	}

	onLogOut(): void {
		this.authService.logOut();
	}
}
