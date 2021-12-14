import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreacionActivoComponent } from './creacion-activo/creacion-activo.component';
import { DataActivosComponent } from './data-activos/data-activos.component';
import { ModificacionActivoComponent } from './modificacion-activo/modificacion-activo.component';

const routes: Routes = [
	{
		path: '',
		component: DataActivosComponent
	},
	{
		path: 'crear',
		component: CreacionActivoComponent
	},
	{
		path: 'modificar/:id',
		component: ModificacionActivoComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ActivosRoutingModule {}
