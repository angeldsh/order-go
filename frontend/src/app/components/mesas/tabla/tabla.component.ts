import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MesaModalPage } from '../edit/modal-mesas'; 
import { Mesa } from 'src/app/interfaces/mesa.interface';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  @Input() mesas: Mesa[] = [];

  constructor(
    private modalController: ModalController,
    private mesasService: MesasService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.mesas = [];
    this.loadMesas();
  }

  loadMesas(): void {
    this.mesasService.getMesas().subscribe(
      mesas => {
        this.mesas = mesas || [];
      }
    );
  }

  async editarMesa(mesa: Mesa) {
    const modal = await this.modalController.create({
      component: MesaModalPage,
      componentProps: { mesa }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.mesa) {
      const mesaActualizada = data.mesa;
      const index = this.mesas.findIndex(m => m.id === mesaActualizada.id);

      if (index !== -1) {
        this.mesas[index] = mesaActualizada;
      } else {
        this.mesas.push(mesaActualizada);
      }
    }
  }

  async eliminarMesa(mesa: Mesa) {
    if (mesa.id) {
      const confirmacion = await this.mostrarConfirmacion();
      if (confirmacion) {
        this.mesasService.eliminarMesa(mesa.id).subscribe(
          () => {
            this.mesas = this.mesas.filter(m => m.id !== mesa.id);
          },
          (error: any) => {
            this.mostrarMensajeError();
          }
        );
      }
    }
  }

  async mostrarConfirmacion(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure you want to delete this table?',
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

  async mostrarMensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error deleting the table.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
