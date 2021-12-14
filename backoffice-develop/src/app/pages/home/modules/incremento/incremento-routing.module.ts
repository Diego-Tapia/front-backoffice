import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataIncrementosComponent } from './data-incrementos/data-incrementos.component';
import { NuevoIncrementoIndividualComponent } from './nuevo-incremento-individual/nuevo-incremento-individual.component';
import { NuevoIncrementoMasivoComponent } from './nuevo-incremento-masivo/nuevo-incremento-masivo.component';

const routes: Routes = [
	{
		path: '',
		component: DataIncrementosComponent
	},
	{
		path: 'nuevo-individual',
		component: NuevoIncrementoIndividualComponent
	},
	{
		path: 'nuevo-masivo',
		component: NuevoIncrementoMasivoComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IncrementoRoutingModule {}
