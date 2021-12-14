import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BilleterasComponent } from './billeteras.component';

const routes: Routes = [
	{
		path: '',
		component: BilleterasComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BilleterasRoutingModule {}
