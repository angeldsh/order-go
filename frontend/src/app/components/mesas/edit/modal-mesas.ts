import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mesa } from 'src/app/interfaces/mesa.interface';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-mesa-modal',
  templateUrl: './modal-mesas.html',
})
export class MesaModalPage implements OnInit {
  @Input() mesa: Mesa | undefined;

  mesaForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private mesasService: MesasService
  ) {
    this.mesaForm = this.formBuilder.group({
      numero: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.mesa) {
      this.mesaForm.patchValue({
        numero: this.mesa.numero || ''
      });
    }
  }

  async guardarCambios() {
    if (this.mesaForm.valid) {
      const mesaFormValues = this.mesaForm.value;

      if (this.mesa) {
        this.mesa.numero = mesaFormValues.numero;

        this.mesasService.actualizarMesa(this.mesa).subscribe(
          (mesaActualizada) => {
            this.dismiss(mesaActualizada);
          }
        );
      } else {
        const nuevaMesa: Mesa = {
          id: null,
          numero: mesaFormValues.numero
        };

        this.mesasService.agregarMesa(nuevaMesa).subscribe(
          (mesaCreada) => {
            this.dismiss(mesaCreada);
          }
        );
      }
    }
  }

  dismiss(mesa?: Mesa) {
    this.modalController.dismiss({ mesa });
  }
}
