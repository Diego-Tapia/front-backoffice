import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader/loader.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent {
	isLoading = false;

	constructor(private loaderService: LoaderService) {
		this.loaderService.isLoading.subscribe((res) => {
			this.isLoading = res;
		});
	}
	title = 'front-backoffice';
}
