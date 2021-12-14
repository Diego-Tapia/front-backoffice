import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataDisminucionesComponent } from './data-disminuciones/data-disminuciones.component';
import { NuevaDisminucionIndividualComponent } from './nueva-disminucion-individual/nueva-disminucion-individual.component';
import { NuevaDisminucionMasivaComponent } from './nueva-disminucion-masiva/nueva-disminucion-masiva.component';

const routes: Routes = [
	{
		path: '',
		component: DataDisminucionesComponent
	},
	{
		path: 'nueva-individual',
		component: NuevaDisminucionIndividualComponent
	},
	{
		path: 'nueva-masiva',
		component: NuevaDisminucionMasivaComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DisminucionRoutingModule {}
