import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CategoriaModalPage } from '../edit/modal-categoria';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  @Input() categorias: Categoria[] = [];

  constructor(
    private modalController: ModalController,
    private categoriasService: CategoriasService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.categorias = []; 
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriasService.getCategorias().subscribe(
      categorias => {
        this.categorias = categorias || []; 
      }
    );
  }

  async editarCategoria(categoria: Categoria) {
    const modal = await this.modalController.create({
      component: CategoriaModalPage,
      componentProps: { categoria }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data && data.categoria) {
      const categoriaActualizada = data.categoria;
      const index = this.categorias.findIndex(c => c.id === categoriaActualizada.id);

      if (index !== -1) {
        this.categorias[index] = categoriaActualizada;
      } else {
        this.categorias.push(categoriaActualizada);
      }
    }
  }

  async eliminarCategoria(categoria: Categoria) {
    if (categoria.id) {
      const confirmacion = await this.mostrarConfirmacion();
      if (confirmacion) {
        this.categoriasService.eliminarCategoria(categoria.id).subscribe(
          () => {
            this.categorias = this.categorias.filter(c => c.id !== categoria.id);
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
        message: 'Are you sure you want to delete this category?',
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
      message: 'There was an error deleting the category.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
