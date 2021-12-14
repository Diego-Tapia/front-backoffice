import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { FeaturesModule } from 'src/app/features/features.module';

@NgModule({
	declarations: [InicioComponent],
	imports: [CommonModule, InicioRoutingModule, FeaturesModule]
})
export class InicioModule {}
