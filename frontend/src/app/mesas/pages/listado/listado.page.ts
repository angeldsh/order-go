import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MesaModalPage } from 'src/app/components/mesas/edit/modal-mesas';
import { TablaComponent } from 'src/app/components/mesas/tabla/tabla.component';
import { Mesa } from 'src/app/interfaces/mesa.interface';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-listado-mesas',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoMesasPage implements OnInit {

  mesas: Mesa[] = [];
  @ViewChild(TablaComponent) tablaComponent: TablaComponent | undefined;

  constructor(
    private mesasService: MesasService, private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarMesas();
  }

  async addMesa() {
    const modal = await this.modalController.create({
      component: MesaModalPage
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.mesa) {
      this.mesas.push(data.mesa);
      this.cargarMesasYActualizarTabla();
    }
  }

  cargarMesasYActualizarTabla(): void {
    this.mesasService.getMesas()
      .subscribe(
        mesas => {
          if (this.tablaComponent) {
            this.tablaComponent.mesas = mesas;
          }
        }
      );
  }

  cargarMesas(): void {
    this.mesasService.getMesas()
      .subscribe(
        mesas => {
          this.mesas = mesas;
        }
      );
  }
}
