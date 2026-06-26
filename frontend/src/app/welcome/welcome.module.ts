import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePage } from './welcome.page';
import { HeaderComponent } from '../components/header/header.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { CodigoMesaModalComponent } from '../components/modal-codigo-mesa/codigo-mesa-modal';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeRoutingModule,
    HeaderComponent
  ],
 
    declarations: [WelcomePage, CodigoMesaModalComponent]
})
export class WelcomePageModule {}
