import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuariosComponent } from './alta-usuarios/alta-usuarios.component';
import { DataUsuariosComponent } from './data-usuarios/data-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'final',
  },
  { 
    path: ':type', 
    component: DataUsuariosComponent 
  },
  {
    path: 'alta/:type',
    component: AltaUsuariosComponent
  },
  {
    path: ':type/detalle/:id',
    component: DetalleUsuarioComponent
  },
  {
    path: ':type/editar/:id',
    component: EditarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
