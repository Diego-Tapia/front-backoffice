import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader/loader.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	isLoading!: boolean;

	constructor(private loaderService: LoaderService) {
		this.loaderService.isLoading.subscribe((res) => {
			setTimeout(() => this.isLoading = res, 5);
		});
	}
	title = 'front-backoffice';
}
