import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MisPedidosPageRoutingModule } from './mis-pedidos-routing.module';
import { MisPedidosPage } from './mis-pedidos';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HeaderComponent,
    MisPedidosPageRoutingModule
  ],
  declarations: [MisPedidosPage]
})
export class MisPedidosPageModule {}
