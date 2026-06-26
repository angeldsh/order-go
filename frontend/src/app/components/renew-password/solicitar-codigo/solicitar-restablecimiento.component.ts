import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/auth/services/autenticacion.service';

@Component({
  selector: 'app-solicitar-restablecimiento',
  templateUrl: './solicitar-restablecimiento.component.html',
  styleUrls: ['./solicitar-restablecimiento.component.scss'],
})
export class SolicitarRestablecimientoComponent {
  email: string = '';

  constructor(private modalController: ModalController, private authService: AutenticacionService, private alertController: AlertController) { }

  dismiss() {
    this.modalController.dismiss();
  }

  solicitarRestablecimiento() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(this.email)) {
      this.mostrarMensajeError('The email is invalid');
      return;
    }
    this.authService.solicitarResetContrasena(this.email).subscribe(
      () => {
        this.modalController.dismiss({ success: true });
      },
      () => {
        this.mostrarMensajeError('Error requesting password reset');
        this.modalController.dismiss({ success: false });
      }
    );
  }
  async mostrarMensajeError(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
