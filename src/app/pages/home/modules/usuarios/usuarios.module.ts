import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { DataUsuariosComponent } from './data-usuarios/data-usuarios.component';
import { FeaturesModule } from 'src/app/features/features.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { AltaUsuariosComponent } from './alta-usuarios/alta-usuarios.component';
import { ModificacionUsuarioComponent } from './modificacion-usuario/modificacion-usuario.component';
import { usuariosRedecuersMap } from './usuarios.reducers.map';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AltaUsuariosEffects } from './alta-usuarios/store/alta-usuarios.effect';
import { GetUsuariosEffects } from './data-usuarios/store/get-usuarios.effect';
import { GetUsuarioByIdEffects } from './data-usuarios/store/get-usuarios-by-id.effect';
import { ModificacionUsuariosEffects } from './modificacion-usuario/store/modificacion-usuarios.effect';


@NgModule({
  declarations: [
    DataUsuariosComponent,
    DetalleUsuarioComponent,
    AltaUsuariosComponent,
    ModificacionUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FeaturesModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    StoreModule.forFeature('usuariosRedecuersMap', usuariosRedecuersMap),
		EffectsModule.forFeature([GetUsuariosEffects, GetUsuarioByIdEffects, AltaUsuariosEffects, ModificacionUsuariosEffects])
  ]
})
export class UsuariosModule { }
