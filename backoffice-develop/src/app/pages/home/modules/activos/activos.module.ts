import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivosRoutingModule } from './activos-routing.module';
import { FeaturesModule } from '../../../../features/features.module';
import { CreacionActivoComponent } from './creacion-activo/creacion-activo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { activosRedecuersMap } from './activos.reducers.map';
import { GetActivosEffects } from './data-activos/store/activos.effects';
import { NuevoActivoEffects } from './creacion-activo/store/nuevo-activo.effects';
import { DataActivosComponent } from './data-activos/data-activos.component';
import { ModificacionActivoComponent } from './modificacion-activo/modificacion-activo.component';
import { ModificarActivoEffects } from './modificacion-activo/store/modificacion-activo.effects';
import { GetActivosByIdEffects } from './data-activos/store/activos-by-id.effects';
import { GetAplicabilidadesEffects } from './store/get-aplicabilidades.effects';

@NgModule({
	declarations: [CreacionActivoComponent, DataActivosComponent, ModificacionActivoComponent],
	imports: [
		CommonModule,
		ActivosRoutingModule,
		FeaturesModule,
		MatTabsModule,
		MatDialogModule,
		MatStepperModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatCheckboxModule,
		MatOptionModule,
		MatAutocompleteModule,
		MatChipsModule,
		MatIconModule,
		MatNativeDateModule,
		StoreModule.forFeature('activosRedecuersMap', activosRedecuersMap),
		EffectsModule.forFeature([GetActivosEffects, GetActivosByIdEffects, NuevoActivoEffects, ModificarActivoEffects, GetAplicabilidadesEffects])
	]
})
export class ActivosModule { }
