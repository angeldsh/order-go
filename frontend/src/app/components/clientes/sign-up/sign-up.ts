import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { telefonoValido, nifValido, emailExiste, nombreUsuarioExiste, contrasenaValida, coincidirContrasena } from 'src/app/validations/validations';
import { AutenticacionService } from 'src/app/auth/services/autenticacion.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
})
export class ClientesSignUpPage implements OnInit {
  clienteForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private empleadosService: EmpleadosService,
    private authService: AutenticacionService,
    private alertController: AlertController 
  ) {
    this.clienteForm = this.formBuilder.group({
      telefono: ['', [Validators.required, telefonoValido()]],
      nif: ['', [Validators.required, nifValido()]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [emailExiste(this.empleadosService, false)]],
      username: ['', [Validators.required], [nombreUsuarioExiste(this.empleadosService, false)]],
      password: ['', [Validators.required, contrasenaValida()]],
      confirmarPassword: ['', Validators.required]
    }, { validator: coincidirContrasena() }); 
    
  }

  ngOnInit() {}

  async signUp() {
    if (this.clienteForm.valid) {
      const clienteFormValues = this.clienteForm.value;

      const nuevoCliente: Cliente = {
        telefono: clienteFormValues.telefono,
        nif: clienteFormValues.nif,
        usuario: {
          nombre: clienteFormValues.nombre,
          apellidos: clienteFormValues.apellidos,
          email: clienteFormValues.email,
          username: clienteFormValues.username,
          password: clienteFormValues.password,
          id: 0,
          activo: true,
          bloqueado: false
        },
      };

      this.authService.signUp(nuevoCliente).subscribe(
        async (clienteCreado) => {
          await this.mostrarMensajeExito('Customer registered successfully');
          this.dismiss(clienteCreado);
        },
        async (error) => {
          await this.mostrarMensajeError('Error registering customer');
        }
      );
    } else {
      await this.mostrarMensajeError('Invalid form');
    }
  }

  async mostrarMensajeExito(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Success',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarMensajeError(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  dismiss(cliente?: Cliente) {
    this.modalController.dismiss({ cliente });
  }
}
