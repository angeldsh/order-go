import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EmpleadoModalPage } from '../edit/modal-empleado';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  @Input() empleados: Empleado[] = [];

  constructor(
    private modalController: ModalController,
    private empleadosService: EmpleadosService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.empleados = [];
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe(
      empleados => {
        this.empleados = empleados || [];
      }
    );
  }

  async editarEmpleado(empleado: Empleado) {
    const modal = await this.modalController.create({
      component: EmpleadoModalPage,
      componentProps: { empleado }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.empleado) {
      const empleadoActualizado = data.empleado;
      const index = this.empleados.findIndex(e => e.id === empleadoActualizado.id);

      if (index !== -1) {
        this.empleados[index] = empleadoActualizado;
      } else {
        this.empleados.push(empleadoActualizado);
      }
    }
  }

  async eliminarEmpleado(empleado: Empleado) {
    if (empleado.id) {
      const confirmacion = await this.mostrarConfirmacion();
      if (confirmacion) {
        this.empleadosService.eliminarEmpleado(empleado.id).subscribe(
          () => {
            this.empleados = this.empleados.filter(e => e.id !== empleado.id);
          },
          (error: any) => {
            if (error && error.status === 400 && error.error === 'Empleado tiene datos asociados') {
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
        message: 'Are you sure you want to delete this employee?',
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
      message: 'The employee has associated data and cannot be deleted.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async mostrarMensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error deleting the employee.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
