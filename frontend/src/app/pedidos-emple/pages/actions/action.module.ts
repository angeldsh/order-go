import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionPageRoutingModule } from './action-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TablaComponent } from 'src/app/components/pedidos-emple/tabla/tabla.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { TicketCreatePage } from '../tickets/tickets.page';
import { TicketDeletePage } from '../tickets/tickets-delete.page';
import { ActionPage } from './action.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionPageRoutingModule,
    ComponentsModule,
    HeaderComponent

  ],
  declarations: [ActionPage, TicketCreatePage, TicketDeletePage]
})
export class ActionPageModule {}
