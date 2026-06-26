import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/services/clientes.service';
import { ModalDireccionService } from 'src/app/services/modaldireccion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-direccion-pedido-modal',
  templateUrl: './direccion-modal.html',
  styleUrls: ['./direccion-modal.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DireccionPedidoModalPage {
  @Input() direcciones: Direccion[] = [];
  @Input() clienteId: number | null = null;
  cpValido: boolean = true;
  mostrarFormulario: boolean = false;
  nuevaDireccion: Direccion = { id: 0, direccion: '', cp: '', cliente: {} as Cliente };

  constructor(
    private modalController: ModalController,
    private modalDireccionService: ModalDireccionService,
    private clienteService: ClientesService
  ) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss();
  }

  seleccionarDireccion(direccion: Direccion) {
    this.modalController.dismiss(direccion);
  }

  toggleAgregarDireccion() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregarDireccion() {
    if (this.nuevaDireccion.direccion && this.nuevaDireccion.cp) {
      if (this.clienteId !== null) {
        this.clienteService.getCliente(this.clienteId).subscribe(cliente => {
          this.nuevaDireccion.cliente = cliente;
          if (this.cpValido && this.nuevaDireccion.direccion) {
            this.modalDireccionService.agregarDireccion(this.nuevaDireccion).subscribe(direccionAgregada => {
              this.direcciones.push(direccionAgregada);
              this.mostrarFormulario = false;
              this.nuevaDireccion = { id: 0, direccion: '', cp: '', cliente: {} as Cliente }; 
            });
          }

        });
      }
    }
  }
  validarCp() {
    this.cpValido = /^[0-9]{5}$/.test(this.nuevaDireccion.cp);
  }
}
