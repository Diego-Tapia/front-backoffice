import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		loadChildren: () => import('./pages/auth/auth.module').then((module) => module.AuthModule)
	},
	{
		path: 'home',
		canLoad: [AuthGuard],
		loadChildren: () => import('./pages/home/home.module').then((module) => module.HomeModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
