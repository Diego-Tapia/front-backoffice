import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TablaMasivosComponent } from './tabla-masivos/tabla-masivos.component';
import { TablaIndividualesComponent } from './tabla-individuales/tabla-individuales.component';
import { ModalNuevaOperacionComponent } from './modal-nueva-operacion-incremento/modal-nueva-operacion.component';
import { EntityHeaderComponent } from './entity-header/entity-header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TablaNotificacionesComponent } from './tabla-notificaciones/tabla-notificaciones.component';
import { ModalNuevaOperacionDisminucionComponent } from './modal-nueva-operacion-disminucion/modal-nueva-operacion-disminucion.component';
import { TablaInicioComponent } from './tabla-inicio/tabla-inicio.component';
import { GraficsInicioComponent } from './grafics-inicio/grafics-inicio.component';
import { TablaActivosComponent } from './tabla-activos/tabla-activos.component';
import { TablaUsuariosFinalesComponent } from './tabla-usuarios-finales/tabla-usuarios-finales.component';
import { TablaUsuariosBackofficeComponent } from './tabla-usuarios-backoffice/tabla-usuarios-backoffice.component';
import { RouterModule } from '@angular/router';
import { ModalAltaUsuarioComponent } from './modal-alta-usuario/modal-alta-usuario.component';
import { ModalEmisionActivoComponent } from './modal-emision-activo/modal-emision-activo.component';
import { ModalReemisionActivoComponent } from './modal-reemision-activo/modal-reemision-activo.component';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmitirActivosEffects } from './modal-emision-activo/store/emitir-activos.effects';

import { ReactiveFormsModule } from '@angular/forms';
import { ReemitirActivosEffects } from './modal-reemision-activo/store/reemitir-activos.effects';

import localeEsAr from '@angular/common/locales/es-AR';
import { ModalDetalleActivoComponent } from './modal-detalle-activo/modal-detalle-activo.component';
import { featuresRedecuersMap } from './features.reducers.map';
import { GetActivosByIdEffects } from '../pages/home/modules/activos/data-activos/store/activos-by-id.effects';
import { MatDividerModule } from '@angular/material/divider';
import { PutActivoEffects } from './tabla-activos/store/put-activo.effects';
import { NuevoIncrementoMasivoEffects } from '../pages/home/modules/incremento/nuevo-incremento-masivo/store/nuevo-inc-mas.effects';
import { NuevaDisminucionMasivaEffects } from '../pages/home/modules/disminucion/nueva-disminucion-masiva/store/nueva-dis-mas.effects';
import { StatusPipe } from '../shared/pipes/status.pipe';
import { SharedModule } from '../shared/shared.module';

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
	declarations: [
		TitleComponent,
		TablaMasivosComponent,
		TablaIndividualesComponent,
		ModalNuevaOperacionComponent,
		TablaNotificacionesComponent,
		ModalNuevaOperacionDisminucionComponent,
		EntityHeaderComponent,
		TablaInicioComponent,
		GraficsInicioComponent,
		TablaActivosComponent,
		TablaUsuariosFinalesComponent,
		TablaUsuariosBackofficeComponent,
		ModalAltaUsuarioComponent,
		ModalEmisionActivoComponent,
		ModalReemisionActivoComponent,
		ModalDetalleActivoComponent,
		
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
		MatTableModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatMenuModule,
		MatDialogModule,
		MatButtonToggleModule,
		MatDividerModule,
		RouterModule,
		MatInputModule,
		ReactiveFormsModule,
		SharedModule,
		StoreModule.forFeature('featuresRedecuersMap', featuresRedecuersMap),
		EffectsModule.forFeature([EmitirActivosEffects, ReemitirActivosEffects, GetActivosByIdEffects, PutActivoEffects, NuevoIncrementoMasivoEffects, NuevaDisminucionMasivaEffects])
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-Ar' }
	],
	exports: [
		TitleComponent,
		ModalNuevaOperacionComponent,
		TablaMasivosComponent,
		TablaIndividualesComponent,
		TablaNotificacionesComponent,
		EntityHeaderComponent,
		TablaInicioComponent,
		GraficsInicioComponent,
		TablaActivosComponent,
		TablaUsuariosFinalesComponent,
		TablaUsuariosBackofficeComponent
	]
})
export class FeaturesModule { }
