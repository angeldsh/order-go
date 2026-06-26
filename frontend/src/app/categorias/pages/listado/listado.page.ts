import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaModalPage } from 'src/app/components/categorias/edit/modal-categoria';
import { TablaComponent } from 'src/app/components/categorias/tabla/tabla.component';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoCategoriasPage implements OnInit {

  categorias: Categoria[] = [];
  @ViewChild(TablaComponent) tablaComponent: TablaComponent | undefined;

  constructor(
    private categoriasService: CategoriasService, private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  async addCategoria() {
    const modal = await this.modalController.create({
      component: CategoriaModalPage
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.categoria) {
      this.categorias.push(data.categoria);
      this.cargarCategoriasYActualizarTabla();
    }
  }

  cargarCategoriasYActualizarTabla(): void {
    this.categoriasService.getCategorias()
      .subscribe(
        categorias => {
          if (this.tablaComponent) {
            this.tablaComponent.categorias = categorias;
          }
        },
      );
  }

  cargarCategorias(): void {
    this.categoriasService.getCategorias()
      .subscribe(
        categorias => {
          this.categorias = categorias;
        },
      );
  }
}
