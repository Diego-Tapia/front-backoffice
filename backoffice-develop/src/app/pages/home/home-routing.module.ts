import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'inicio'
	},
	{
		path: 'inicio',
		component: HomeComponent,
		loadChildren: () => import('./modules/inicio/inicio.module').then((module) => module.InicioModule)
	},
	{
		path: 'billeteras',
		component: HomeComponent,
		loadChildren: () => import('./modules/billeteras/billeteras.module').then((module) => module.BilleterasModule)
	},
	{
		path: 'usuarios',
		component: HomeComponent,
		loadChildren: () => import('./modules/usuarios/usuarios.module').then((m) => m.UsuariosModule)
	},
	{
		path: 'activos',
		component: HomeComponent,
		loadChildren: () => import('./modules/activos/activos.module').then((module) => module.ActivosModule)
	},
	{
		path: 'incremento',
		component: HomeComponent,
		loadChildren: () => import('./modules/incremento/incremento.module').then((module) => module.IncrementoModule)
	},
	{
		path: 'disminucion',
		component: HomeComponent,
		loadChildren: () => import('./modules/disminucion/disminucion.module').then((module) => module.DisminucionModule)
	},
	{
		path: 'notificaciones',
		component: HomeComponent,
		loadChildren: () =>
			import('./modules/notificaciones/notificaciones.module').then((module) => module.NotificacionesModule)
	},
	{
		path: 'reportes',
		component: HomeComponent,
		loadChildren: () => import('./modules/reportes/reportes.module').then((module) => module.ReportesModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {}
