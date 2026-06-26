import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoMesasPage } from './listado.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoMesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPageRoutingModule {}
