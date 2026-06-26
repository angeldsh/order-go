import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageRoutingModule } from './listado-routing.module';

import { ListadoEmpleadosPage } from './listado.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TablaComponent } from 'src/app/components/empleados/tabla/tabla.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { EmpleadoModalPage } from 'src/app/components/empleados/edit/modal-empleado';

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
  declarations: [ListadoEmpleadosPage, TablaComponent, EmpleadoModalPage],
  exports: [EmpleadoModalPage]
})
export class ListadoPageModule {}
