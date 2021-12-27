import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisminucionRoutingModule } from './disminucion-routing.module';
import { DataDisminucionesComponent } from './data-disminuciones/data-disminuciones.component';
import { NuevaDisminucionMasivaComponent } from './nueva-disminucion-masiva/nueva-disminucion-masiva.component';
import { NuevaDisminucionIndividualComponent } from './nueva-disminucion-individual/nueva-disminucion-individual.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FeaturesModule } from '../../../../features/features.module';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { disminucionRedecuersMap } from './disminuciones.reducers.map';
import { EffectsModule } from '@ngrx/effects';
import { GetDisminucionesEffects } from './data-disminuciones/store/get-dis.effect';
import { GetDisminucionesMasivasEffects } from './data-disminuciones/store/get-dis-mas.effect';
import { NuevaDisminucionEffects } from './nueva-disminucion-individual/store/nueva-dis.effects';
import { NuevaDisminucionMasivaEffects } from './nueva-disminucion-masiva/store/nueva-dis-mas.effects';
import { MatOptionModule } from '@angular/material/core';
import { GetActivosEffects } from '../activos/data-activos/store/activos.effects';
import { MatSelectModule } from '@angular/material/select';
import { VerifyUsuarioEffects } from '../usuarios/data-usuarios/store/verify/verify-usuarios.effect';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [DataDisminucionesComponent, NuevaDisminucionMasivaComponent, NuevaDisminucionIndividualComponent],
	imports: [
		CommonModule,
		DisminucionRoutingModule,
		FeaturesModule,
		MatDialogModule,
		MatTabsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatStepperModule,
		MatCardModule,
		MatOptionModule,
		MatSelectModule,
		SharedModule,
		StoreModule.forFeature('disminucionRedecuersMap', disminucionRedecuersMap),
		EffectsModule.forFeature([
			NuevaDisminucionEffects,
			NuevaDisminucionMasivaEffects,
			GetDisminucionesEffects,
			GetDisminucionesMasivasEffects,
			GetActivosEffects,
			VerifyUsuarioEffects
		])
	]
})
export class DisminucionModule { }
