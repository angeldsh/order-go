import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoTicketsPage } from './listado-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPageRoutingModule {}
