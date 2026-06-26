
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-codigo-mesa-modal',
  templateUrl: './codigo-mesa-modal.html',
  styleUrls: ['./codigo-mesa-modal.scss']
})
export class CodigoMesaModalComponent {

  codigoMesa: string = '';

  constructor(private modalController: ModalController) { }

  guardarCodigo() {
    if (this.codigoMesa.trim() !== '') {
      this.modalController.dismiss(this.codigoMesa);
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
