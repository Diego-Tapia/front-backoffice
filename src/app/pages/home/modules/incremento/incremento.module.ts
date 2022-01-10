import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncrementoRoutingModule } from './incremento-routing.module';
import { FeaturesModule } from 'src/app/features/features.module';
import { MatTabsModule } from '@angular/material/tabs';
import { DataIncrementosComponent } from './data-incrementos/data-incrementos.component';
import { NuevoIncrementoIndividualComponent } from './nuevo-incremento-individual/nuevo-incremento-individual.component';
import { NuevoIncrementoMasivoComponent } from './nuevo-incremento-masivo/nuevo-incremento-masivo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { incrementoReducersMap } from './incremento.reducers.map';
import { MatCardModule } from '@angular/material/card';
import { NuevoIncrementoEffects } from './nuevo-incremento-individual/store/nuevo-inc.effects';
import { GetIncrementosEffects } from './data-incrementos/store/get-inc.effect';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GetIncrementosMasivosEffects } from './data-incrementos/store/get-inc.mas.effect';
import { NuevoIncrementoMasivoEffects } from './nuevo-incremento-masivo/store/nuevo-inc-mas.effects';
import { GetActivosEffects } from '../activos/data-activos/store/get-activos/activos.effects';
import { VerifyUsuarioEffects } from '../usuarios/data-usuarios/store/verify/verify-usuarios.effect';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [DataIncrementosComponent, NuevoIncrementoIndividualComponent, NuevoIncrementoMasivoComponent],
	imports: [
		CommonModule,
		IncrementoRoutingModule,
		FeaturesModule,
		MatTabsModule,
		MatDialogModule,
		MatStepperModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatOptionModule,
		MatSelectModule,
		MatIconModule,
		SharedModule,
		StoreModule.forFeature('incrementoReducersMap', incrementoReducersMap),
		EffectsModule.forFeature([ NuevoIncrementoEffects, NuevoIncrementoMasivoEffects, GetIncrementosEffects, GetIncrementosMasivosEffects, GetActivosEffects, VerifyUsuarioEffects ])
	]
})
export class IncrementoModule { }
