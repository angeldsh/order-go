import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageRoutingModule } from './listado-routing.module';

import { ListadoMesasPage } from './listado.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TablaComponent } from 'src/app/components/mesas/tabla/tabla.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MesaModalPage } from 'src/app/components/mesas/edit/modal-mesas';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  declarations: [ListadoMesasPage, TablaComponent, MesaModalPage],
  exports: [MesaModalPage]
})
export class ListadoPageModule {}
