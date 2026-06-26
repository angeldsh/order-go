import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { ModalDireccionService } from 'src/app/services/modaldireccion.service';
import { AutenticacionService } from 'src/app/auth/services/autenticacion.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  cliente: Cliente | undefined;
  direcciones: Direccion[] = [];
  editMode = false;
  showAddAddressForm: boolean = false;
  newAddress: Direccion = {
    direccion: '',
    cp: '',
    cliente: {} as Cliente
  };
  miFormulario: any;
  telefonoInvalido = false;
  nifInvalido = false;
  cpInvalido = false;
  cpInvalidoNew = false;

  constructor(
    private clientesService: ClientesService,
    private authService: AutenticacionService,
    private direccionesService: ModalDireccionService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.authService.obtenerClienteId().subscribe(
      (clienteId: number) => {
        this.clientesService.getCliente(clienteId).subscribe(
          cliente => {
            this.cliente = cliente;
            this.cargarDirecciones(clienteId);
          },
        );
      },
    );
  }

  cargarDirecciones(clienteId: number): void {
    this.clientesService.obtenerDireccionesCliente(clienteId).subscribe(
      direcciones => {
        this.direcciones = direcciones;
        this.direcciones.forEach(direccion => {
          direccion.cpValido = true;
        });
      },
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode && !this.telefonoInvalido && !this.nifInvalido && !this.cpInvalido) {
      this.saveChanges();
    } else {
      if (!this.editMode) {
        this.mostrarMensajeError('Error al actualizar su perfil, datos no válidos');
        this.cargarCliente();
      }
    }
  }

  toggleAddAddressForm() {
    this.showAddAddressForm = !this.showAddAddressForm;
    if (!this.showAddAddressForm) {
      this.newAddress = {
        direccion: '',
        cp: '',
        cliente: this.cliente!

      };
    }
  }

  saveChanges() {
    if (this.cliente) {
      this.clientesService.actualizarCliente(this.cliente).subscribe(
        () => {
          this.editMode = false;
        },
      );
    }
    this.direcciones.forEach(direccion => {
      this.direccionesService.editarDireccion(direccion).subscribe(
        () => {
        },
      );
    });
  }

  agregarDireccion() {
    if (this.cpInvalidoNew) {
      this.mostrarMensajeError('Error al agregar dirección, código postal no válido');
      return;
    }
    this.newAddress.cliente = this.cliente!;
    this.direccionesService.agregarDireccion(this.newAddress).subscribe(
      (nuevaDireccion: Direccion) => {
        this.direcciones.push(nuevaDireccion);
        this.newAddress = {
          direccion: '',
          cp: '',
          cliente: this.cliente!
        };
        this.cargarDirecciones(this.cliente!.id!);
        this.toggleAddAddressForm();
      },
    );
  }
  async eliminarDireccion(direccion: Direccion): Promise<void> {
    const confirmacion = await this.mostrarConfirmacion();
    if (confirmacion) {
      this.direccionesService.eliminarDireccion(direccion.id!).subscribe(
        () => {
          this.direcciones = this.direcciones.filter(d => d !== direccion);
        },
        (error: any) => {
          if (error.status === 409) {
            this.mostrarMensajeError('La dirección tiene pedidos asociados y no se puede eliminar.');
          } else {
            this.mostrarMensajeError('Hubo un error al eliminar la dirección.');
          }
        }
      );
    }
  }

  async mostrarConfirmacion(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.alertController.create({
        header: 'Confirmación',
        message: '¿Estás seguro de que quieres eliminar esta dirección?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false); 
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              resolve(true); 
            }
          }
        ]
      }).then(alert => alert.present());
    });
  }

  async mostrarMensajeError(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarTelefono() {
    const telefonoRegExp = /^[0-9]{9}$/;
    const telefono = this.cliente?.telefono ?? '';
    this.telefonoInvalido = !telefonoRegExp.test(telefono);
  }
  validarNif() {
    const nifRegExp = /^[0-9]{8}[A-Z]$/;
    const nif = this.cliente?.nif ?? '';
    this.nifInvalido = !nifRegExp.test(nif);
  }
  validarCp(direccion: Direccion) {
    const cpRegExp = /^[0-9]{5}$/;
    direccion.cpValido = cpRegExp.test(direccion.cp);
    this.cpInvalido = !cpRegExp.test(direccion.cp);
  }
  validarCpNuevo() {
    const cpRegExp = /^[0-9]{5}$/;
    this.cpInvalidoNew = !cpRegExp.test(this.newAddress.cp);
  }




}


