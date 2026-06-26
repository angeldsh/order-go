import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { telefonoValido, nombreUsuarioExiste, nifValido, emailExiste } from 'src/app/validations/validations'; 

@Component({
  selector: 'app-empleado-modal',
  templateUrl: './modal-empleado.html',
})
export class EmpleadoModalPage implements OnInit {
  @Input() empleado: Empleado | undefined;
  empleadoForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private empleadosService: EmpleadosService
  ) {
    this.empleadoForm = this.formBuilder.group({});
  }

  ngOnInit() {
    const isEditMode = !!this.empleado;

    this.empleadoForm = this.formBuilder.group({
      disponible: [true],
      nif: ['', [Validators.required, nifValido()]],
      puesto: ['', Validators.required],
      telefono: ['', [Validators.required, telefonoValido()]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [emailExiste(this.empleadosService, isEditMode)]],
      username: ['', [Validators.required], [nombreUsuarioExiste(this.empleadosService, isEditMode)]],
      password: [''],
    });

    if (this.empleado) {
      this.empleadoForm.patchValue({
        disponible: this.empleado.disponible || true,
        nif: this.empleado.nif || '',
        puesto: this.empleado.puesto || '',
        telefono: this.empleado.telefono || '',
        nombre: this.empleado.usuario?.nombre || '',
        apellidos: this.empleado.usuario?.apellidos || '',
        email: this.empleado.usuario?.email || '',
        username: this.empleado.usuario?.username || '',
      });

      this.empleadoForm.get('password')!.clearValidators();
      this.empleadoForm.get('password')!.updateValueAndValidity();
    } else {
      this.empleadoForm.get('password')!.setValidators([Validators.required]);
      this.empleadoForm.get('password')!.updateValueAndValidity();
    }
  }

  async guardarCambios() {
    if (this.empleadoForm.valid) {
      const empleadoFormValues = this.empleadoForm.value;

      if (this.empleado) {
        this.empleado.disponible = empleadoFormValues.disponible;
        this.empleado.nif = empleadoFormValues.nif;
        this.empleado.puesto = empleadoFormValues.puesto;
        this.empleado.telefono = empleadoFormValues.telefono;
        if (this.empleado.usuario) {
          this.empleado.usuario.nombre = empleadoFormValues.nombre;
          this.empleado.usuario.apellidos = empleadoFormValues.apellidos;
          this.empleado.usuario.email = empleadoFormValues.email;
          this.empleado.usuario.username = empleadoFormValues.username;
          if (empleadoFormValues.password) {
            this.empleado.usuario.password = empleadoFormValues.password;
          } else {
            this.empleado.usuario.password = '';
          }
        }

        this.empleadosService.actualizarEmpleado(this.empleado).subscribe(
          (empleadoActualizado) => {
            this.dismiss(empleadoActualizado);
          }
        );
      } else {
        const nuevoEmpleado: Empleado = {
          disponible: empleadoFormValues.disponible,
          nif: empleadoFormValues.nif,
          puesto: empleadoFormValues.puesto,
          telefono: empleadoFormValues.telefono,
          usuario: {
            nombre: empleadoFormValues.nombre,
            apellidos: empleadoFormValues.apellidos,
            email: empleadoFormValues.email,
            username: empleadoFormValues.username,
            password: empleadoFormValues.password,
            id: 0,
            activo: true,
            bloqueado: false,
          },
        };

        this.empleadosService.agregarEmpleado(nuevoEmpleado).subscribe(
          (empleadoCreado) => {
            this.dismiss(empleadoCreado);
          }
        );
      }
    } 
  }

  dismiss(empleado?: Empleado) {
    this.modalController.dismiss({ empleado });
  }
}
