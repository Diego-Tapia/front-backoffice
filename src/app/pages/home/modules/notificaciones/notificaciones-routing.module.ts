import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataNotificacionesComponent } from './data-notificaciones/data-notificaciones.component';
import { NuevaNotificacionMasivaComponent } from './nueva-notificacion-masiva/nueva-notificacion-masiva.component';

const routes: Routes = [
	{
		path: '',
		component: DataNotificacionesComponent
	},
	{
		path: 'nueva-notificacion',
		component: NuevaNotificacionMasivaComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NotificacionesRoutingModule {}
