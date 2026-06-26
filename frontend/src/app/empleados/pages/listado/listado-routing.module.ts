import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoEmpleadosPage } from './listado.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoEmpleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPageRoutingModule {}
