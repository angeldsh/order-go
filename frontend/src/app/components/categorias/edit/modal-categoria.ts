import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './modal-categoria.html',
})
export class CategoriaModalPage implements OnInit {
  @Input() categoria: Categoria | undefined;

  categoriaForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService
  ) {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.categoria) {
      this.categoriaForm.patchValue({
        nombre: this.categoria.nombre || ''
      });
    }
  }

  async guardarCambios() {
    if (this.categoriaForm.valid) {
      const categoriaFormValues = this.categoriaForm.value;

      if (this.categoria) {
        this.categoria.nombre = categoriaFormValues.nombre;

        this.categoriasService.actualizarCategoria(this.categoria).subscribe(
          (categoriaActualizada) => {
            this.dismiss(categoriaActualizada);
          },
          (error) => {
          }
        );
      } else {
        const nuevaCategoria: Categoria = {
          id: 0,
          nombre: categoriaFormValues.nombre
        };

        this.categoriasService.agregarCategoria(nuevaCategoria).subscribe(
          (categoriaCreada) => {
            this.dismiss(categoriaCreada);
          }
        );
      }
    }
  }

  dismiss(categoria?: Categoria) {
    this.modalController.dismiss({ categoria });
  }
}
