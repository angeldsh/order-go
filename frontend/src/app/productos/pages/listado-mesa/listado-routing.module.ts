import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoMesaPage } from './listado.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoMesaPageRoutingModule {}
