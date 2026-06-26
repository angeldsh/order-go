import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';
import { ClienteModalPage } from '../edit/modal-cliente';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {

  @Input() clientes: Cliente[] = [];

  constructor(private modalController: ModalController, private clientesService: ClientesService, private alertController: AlertController) {}

  ngOnInit(): void {
    this.loadClientes(); 
  }

  loadClientes(): void {
    this.clientesService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes || [];
      }
    );
  }

  async editarCliente(cliente: Cliente) {
    const modal = await this.modalController.create({
      component: ClienteModalPage,
      componentProps: { cliente }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.cliente) {
      const clienteActualizado = data.cliente;
      const index = this.clientes.findIndex(c => c.id === clienteActualizado.id);

      if (index !== -1) {
        this.clientes[index] = clienteActualizado;
      } else {
        this.clientes.push(clienteActualizado);
      }
    }
  }

  async eliminarCliente(cliente: Cliente) {
    if (cliente.id) {
      const confirmacion = await this.mostrarConfirmacion();
      if (confirmacion) {
        this.clientesService.eliminarCliente(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(c => c.id !== cliente.id);
          },
          (error: any) => {
            if (error && error.status === 400 && error.error === 'Cliente tiene datos asociados') {
              this.mostrarMensajeDatosAsociados();
            } else {
              this.mostrarMensajeError();
            }
          }
        );
      }
    }
  }
  
  async mostrarConfirmacion(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure you want to delete this customer?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Accept',
            handler: () => {
              resolve(true);
            }
          }
        ]
      }).then(alert => alert.present());
    });
  }
  
  async mostrarMensajeDatosAsociados() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'The customer has associated data and cannot be deleted.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async mostrarMensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error deleting the customer.',
      buttons: ['OK']
    });
    await alert.present();
  }
}