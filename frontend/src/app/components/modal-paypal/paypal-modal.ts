import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PaypalButtonComponent } from '../paypal-button/paypal-button';

@Component({
  selector: 'app-modal-paypal',
  templateUrl: './paypal-modal.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PaypalButtonComponent]
})
export class PaypalModalPage {
  @Input() totalPrecio: number = 0;
  @Input() tramitarPedido: Function | undefined;
  constructor(
    private modalController: ModalController,

  ) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss();
  }
  async onPaymentSuccess() {
    if (this.tramitarPedido) {
      await this.tramitarPedido();
      this.modalController.dismiss();
    }
  }
}
