import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
	@Output() sideNavToggle = new EventEmitter();

	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	toggleSideNav(): void {
		this.sideNavToggle.emit();
	}

	onLogOut(): void {
		this.authService.logOut();
	}
}
