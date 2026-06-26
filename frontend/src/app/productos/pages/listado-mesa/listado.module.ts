import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoMesaPageRoutingModule } from './listado-routing.module';

import { ListadoMesaPage } from './listado.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TablaComponent } from 'src/app/components/productos/tabla/tabla.component';
import { HeaderMesaComponent } from 'src/app/components/header-mesa/header-mesa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoMesaPageRoutingModule,
    ComponentsModule,
    HeaderMesaComponent,
    TablaComponent

  ],
  declarations: [ListadoMesaPage]
})
export class ListadoMesaPageModule {}
