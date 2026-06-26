import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageRoutingModule } from './listado-tickets-routing.module';

import { ListadoTicketsPage } from './listado-tickets.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ListadoPageRoutingModule,
    ComponentsModule,
    HeaderComponent,
    IonicModule,


  ],
  declarations: [ListadoTicketsPage]
})
export class ListadoTicketsPageModule {}
