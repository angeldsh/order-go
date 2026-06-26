import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClienteModalPage } from 'src/app/components/clientes/edit/modal-cliente';
import { TablaComponent } from 'src/app/components/clientes/tabla/tabla.component';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage {

  clientes: Cliente[] = [];
  @ViewChild(TablaComponent) tablaComponent: TablaComponent | undefined;

  constructor(
    private clientesService: ClientesService, private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }
  async addCliente() {
    const modal = await this.modalController.create({
      component: ClienteModalPage
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.cliente) {
      this.clientes.push(data.cliente);
      this.cargarClientesYActualizarTabla();
    }
  }
  cargarClientesYActualizarTabla(): void {
    this.clientesService.getClientes()
      .subscribe(
        clientes => {
          if (this.tablaComponent) {
            this.tablaComponent.clientes = clientes;
          }
        },
      );
  }


  cargarClientes(): void {
    this.clientesService.getClientes()
      .subscribe(
        clientes => {
          this.clientes = clientes;
        },
      );
  }

}
