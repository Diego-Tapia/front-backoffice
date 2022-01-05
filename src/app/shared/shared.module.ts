import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { StatusPipe } from './pipes/status/status.pipe';
import { CuilPipe } from './pipes/cuil/cuil.pipe';
import { ShortIdPipe } from './pipes/short-id/short-id.pipe';

@NgModule({
	declarations: [
    	StatusPipe,
		CuilPipe,
		ShortIdPipe
  	],
	imports: [CommonModule],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	],
	exports: [
		StatusPipe,
		CuilPipe,
		ShortIdPipe
	]
})
export class SharedModule {}
