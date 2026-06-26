import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpleadoModalPage } from 'src/app/components/empleados/edit/modal-empleado';
import { TablaComponent } from 'src/app/components/empleados/tabla/tabla.component';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoEmpleadosPage implements OnInit {

  empleados: Empleado[] = [];
  @ViewChild(TablaComponent) tablaComponent: TablaComponent | undefined;


  constructor(
    private empleadosService: EmpleadosService, private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  async addEmpleado() {
    const modal = await this.modalController.create({
      component: EmpleadoModalPage
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.empleado) {
      this.empleados.push(data.empleado);
      this.cargarEmpleadosYActualizarTabla();
    }
  }
  cargarEmpleadosYActualizarTabla(): void {
    this.empleadosService.getEmpleados()
      .subscribe(
        empleados => {
          if (this.tablaComponent) {
            this.tablaComponent.empleados = empleados;
          }
        }
      );
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados()
      .subscribe(
        empleados => {
          this.empleados = empleados;
        }
      );
  }
}