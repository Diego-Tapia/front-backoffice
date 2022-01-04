import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { FeaturesModule } from '../../../../features/features.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NuevaNotificacionMasivaComponent } from './nueva-notificacion-masiva/nueva-notificacion-masiva.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataNotificacionesComponent } from './data-notificaciones/data-notificaciones.component';
import { StoreModule } from '@ngrx/store';
import { notificacionesReducersMap } from './notificaciones.reducers.map';
import { EffectsModule } from '@ngrx/effects';
import { GetNotificacionesEffects } from './data-notificaciones/store/notificaciones.effects';
import { NuevaNotificacionEffects } from './nueva-notificacion-masiva/store/nueva-notificacion-masiva.effects';
@NgModule({
	declarations: [NuevaNotificacionMasivaComponent, DataNotificacionesComponent],
	imports: [
		CommonModule,
		NotificacionesRoutingModule,
		FeaturesModule,
		MatTabsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatStepperModule,
		MatCardModule,
		ReactiveFormsModule,
		FormsModule,
		MatInputModule,
		MatButtonModule,
		StoreModule.forFeature('notificacionesReducersMap', notificacionesReducersMap),
		EffectsModule.forFeature([GetNotificacionesEffects, NuevaNotificacionEffects])
	]
})
export class NotificacionesModule {}
