import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RouterModule } from '@angular/router';
import { DireccionPedidoModalPage } from 'src/app/components/modal-direccion/direccion-modal';
import { PaypalModalPage } from 'src/app/components/modal-paypal/paypal-modal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoPageRoutingModule,
    ComponentsModule,
    HeaderComponent,
    RouterModule,
    DireccionPedidoModalPage,
    PaypalModalPage


  ],
  declarations: [CarritoPage]
})
export class CarritoPageModule { }
