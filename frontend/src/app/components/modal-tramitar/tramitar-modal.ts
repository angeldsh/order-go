import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-tramitar-modal',
  templateUrl: './tramitar-modal.html',
  styleUrls: ['./tramitar-modal.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TramitarModalComponent {

  @Input() productosEnCarrito: { producto: Producto; cantidad: number; }[] | undefined;
  @Input() tramitarPedido: Function | undefined;
  total: number = 0;

  constructor(private modalController: ModalController, private router: Router, private alertController: AlertController) {
  }
  ngOnInit() {
    this.calcularTotal();
  }
  confirmarPedido() {
    if (this.tramitarPedido) {

      this.tramitarPedido();
      this.modalController.dismiss();

    }
  }

  calcularTotal() {
    if (!this.productosEnCarrito) {
      return;
    }
    const totalNumerico = this.productosEnCarrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    this.total = parseFloat(totalNumerico.toFixed(2));
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
