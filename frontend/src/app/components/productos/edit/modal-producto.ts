import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoAdm } from 'src/app/interfaces/productoAdm.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { precioValido } from 'src/app/validations/validations';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './modal-producto.html',
})
export class ProductoModalPage implements OnInit {
  @Input() producto: Producto | undefined;
  categorias: Categoria[] = [];

  productoForm: FormGroup;
  selectedFile: File | null = null;
  imagenURL: string | ArrayBuffer | null = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private productosService: ProductosService,
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, precioValido()]],
    });
  }

  ngOnInit() {
    this.productosService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      }
    );
    if (this.producto) {
      this.productoForm.patchValue({
        nombre: this.producto.nombre || '',
        categoria: this.producto.categoria.id || '',
        descripcion: this.producto.descripcion || '',
        precio: this.producto.precio || '',
      });
      if (this.producto.imagen) {
        this.cargarFoto(this.producto.id);
      }
    }
  }

  cargarFoto(productId: number): void {
    this.productosService.getFotoProducto(productId).subscribe(
      (foto) => {
        const url = URL.createObjectURL(foto);
        this.imagenURL = url;
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenURL = reader.result;
        this.productoForm.patchValue({ imagen: reader.result });
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  }

  async guardarCambios() {
    if (this.productoForm.valid) {
      const productoFormValues = this.productoForm.value;

      if (this.producto) {
        const { nombre, descripcion, precio, categoria } = productoFormValues;
        const productoActualizado: ProductoAdm = {
          nombre,
          descripcion,
          precio,
          categoria
        };

        if (this.selectedFile) {
          this.productosService.actualizarProductoConImagen(this.producto.id, productoActualizado, this.selectedFile).subscribe(
            (reponse) => {
              this.dismiss(reponse);
            }
          );
        } else {
          this.productosService.actualizarProducto(this.producto.id, productoActualizado).subscribe(
            (reponse) => {
              this.dismiss(reponse);
            }
          );
        }
      } else {
        const { nombre, descripcion, precio, categoria } = productoFormValues;
        const nuevoProducto: ProductoAdm = {
          nombre,
          descripcion,
          precio,
          categoria
        };

        if (this.selectedFile) {
          this.productosService.agregarProducto(nuevoProducto, this.selectedFile).subscribe(
            (productoCreado) => {
              this.productosService.getProducto(productoCreado.id!).subscribe(
                (productoCreado) => {
                  this.dismiss(productoCreado);
                }
              );
            }
          );
        } 
      }
    }
  }

  dismiss(producto?: Producto) {
    this.modalController.dismiss({ producto });
  }
}
