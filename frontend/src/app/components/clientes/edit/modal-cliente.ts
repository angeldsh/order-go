import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/services/clientes.service';
import { telefonoValido, nombreUsuarioExiste, nifValido, emailExiste } from 'src/app/validations/validations';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './modal-cliente.html',
})
export class ClienteModalPage implements OnInit {
  @Input() cliente: Cliente | undefined;

  clienteForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private empleadosService: EmpleadosService
  ) {
    this.clienteForm = this.formBuilder.group({});
  }

  ngOnInit() {
    const isEditMode = !!this.cliente;

    this.clienteForm = this.formBuilder.group({
      telefono: ['', [Validators.required, telefonoValido()]],
      nif: ['', [Validators.required, nifValido()]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [emailExiste(this.empleadosService, isEditMode)]],
      username: ['', [Validators.required], [nombreUsuarioExiste(this.empleadosService, isEditMode)]],
      password: [''], 
    });

    if (this.cliente) {
      this.clienteForm.patchValue({
        telefono: this.cliente.telefono || '',
        nif: this.cliente.nif || '',
        nombre: this.cliente.usuario?.nombre || '',
        apellidos: this.cliente.usuario?.apellidos || '',
        email: this.cliente.usuario?.email || '',
        username: this.cliente.usuario?.username || '',
      });

      this.clienteForm.get('password')!.clearValidators();
      this.clienteForm.get('password')!.updateValueAndValidity();
    } else {
      this.clienteForm.get('password')!.setValidators([Validators.required]);
    }
  }

  async guardarCambios() {
    if (this.clienteForm.valid) {
      const clienteFormValues = this.clienteForm.value;

      if (this.cliente) {
        this.cliente.telefono = clienteFormValues.telefono;
        this.cliente.nif = clienteFormValues.nif;
        if (this.cliente.usuario) {
          this.cliente.usuario.nombre = clienteFormValues.nombre;
          this.cliente.usuario.apellidos = clienteFormValues.apellidos;
          this.cliente.usuario.email = clienteFormValues.email;
          this.cliente.usuario.username = clienteFormValues.username;
        }

        this.clientesService.actualizarCliente(this.cliente).subscribe(
          (clienteActualizado) => {
            this.dismiss(clienteActualizado);
          }
        );
      } else {
        const nuevoCliente: Cliente = {
          telefono: clienteFormValues.telefono,
          nif: clienteFormValues.nif,
          usuario: {
            nombre: clienteFormValues.nombre,
            apellidos: clienteFormValues.apellidos,
            email: clienteFormValues.email,
            username: clienteFormValues.username,
            password: clienteFormValues.password,
            id: 0,
            activo: true,
            bloqueado: false
          },
        };

        this.clientesService.agregarCliente(nuevoCliente).subscribe(
          (clienteCreado) => {
            this.dismiss(clienteCreado);
          }        );
      }
    } 
  }

  dismiss(cliente?: Cliente) {
    this.modalController.dismiss({ cliente });
  }
}
