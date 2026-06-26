import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SolicitarRestablecimientoComponent } from '../components/renew-password/solicitar-codigo/solicitar-restablecimiento.component';
import { RestablecerContrasenaComponent } from '../components/renew-password/restablecer-password/restablecer-contrasena.component';
import { ClientesSignUpPage } from '../components/clientes/sign-up/sign-up';



@NgModule({
  declarations: [
    LoginComponent,
    SolicitarRestablecimientoComponent,
    RestablecerContrasenaComponent,
    ClientesSignUpPage
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HeaderComponent,


  ]
})
export class AuthModule { }
