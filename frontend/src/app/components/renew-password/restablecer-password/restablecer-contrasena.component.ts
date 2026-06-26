import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/auth/services/autenticacion.service';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.scss']
})
export class RestablecerContrasenaComponent {
  codigo: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private modalController: ModalController, private authService: AutenticacionService, private alertController: AlertController) { }

  dismiss() {
    this.modalController.dismiss();
  }

  restablecerContrasena() {
    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!regex.test(this.newPassword)) {
      this.mostrarMensajeError('The password must have at least 8 characters, one uppercase letter, and one number');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.mostrarMensajeError('Passwords do not match');
      return;
    }

    this.authService.cambiarPassword(this.codigo, this.newPassword).subscribe(
      () => {
        this.mostrarMensajeExito('Password reset successfully');
        this.dismiss();
      },
      () => {
        this.mostrarMensajeError('Error resetting password');
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
  async mostrarMensajeExito(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Success',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}

