import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageAdmRoutingModule } from './listado-routing.module';

import { ListadoPageAdm } from './listado.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TablaAdmComponent } from 'src/app/components/productos/tabla-adm/tabla.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductoModalPage } from 'src/app/components/productos/edit/modal-producto';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPageAdmRoutingModule,
    ComponentsModule,
    HeaderComponent,
    ReactiveFormsModule

  ],
  declarations: [ListadoPageAdm, ProductoModalPage, TablaAdmComponent],
  exports: [ProductoModalPage]
})
export class ListadoPageAdmModule {}

