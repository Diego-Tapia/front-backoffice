import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { StatusPipe } from './pipes/status.pipe';
import { CuilPipe } from './pipes/cuil.pipe';

@NgModule({
	declarations: [
    	StatusPipe,
     CuilPipe
  	],
	imports: [CommonModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	],
	exports: [
		StatusPipe,
		CuilPipe
	]
})
export class SharedModule {}
