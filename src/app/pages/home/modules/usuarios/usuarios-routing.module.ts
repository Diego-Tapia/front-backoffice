import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuariosComponent } from './alta-usuarios/alta-usuarios.component';
import { DataUsuariosComponent } from './data-usuarios/data-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

const routes: Routes = [
  { 
    path: ':type', 
    component: DataUsuariosComponent 
  },
  {
    path: 'alta/:type',
    component: AltaUsuariosComponent
  },
  {
    path: 'detalle/:type/:id',
    component: DetalleUsuarioComponent
  },
  {
    path: 'editar/:type/:id',
    component: EditarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
