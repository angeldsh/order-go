import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageRoutingModule } from './listado-routing.module';

import { ListadoCategoriasPage } from './listado.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TablaComponent } from 'src/app/components/categorias/tabla/tabla.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CategoriaModalPage } from 'src/app/components/categorias/edit/modal-categoria';

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
  declarations: [ListadoCategoriasPage, TablaComponent, CategoriaModalPage],
  exports: [CategoriaModalPage]
})
export class ListadoPageModule {}
