import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataActivosComponent } from './data-activos/data-activos.component';
import { EditarActivoComponent } from './editar-activo/editar-activo.component';
import { NuevoActivoComponent } from './nuevo-activo/nuevo-activo.component';

const routes: Routes = [
	{
		path: '',
		component: DataActivosComponent
	},
	{
		path: 'nuevo',
		component: NuevoActivoComponent
	},
	{
		path: 'editar/:id',
		component: EditarActivoComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ActivosRoutingModule {}
