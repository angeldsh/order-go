import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageRoutingModule } from './listado-routing.module';

import { ListadoPage } from './listado.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TablaComponent } from 'src/app/components/clientes/tabla/tabla.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ClienteModalPage } from 'src/app/components/clientes/edit/modal-cliente';

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
  declarations: [ListadoPage, TablaComponent, ClienteModalPage],
  exports: [ClienteModalPage]
})
export class ListadoPageModule {}
