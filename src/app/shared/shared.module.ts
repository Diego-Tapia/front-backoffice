import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
	declarations: [
    	StatusPipe
  	],
	imports: [CommonModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	],
	exports: [
		StatusPipe
	]
})
export class SharedModule {}
