import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';


// FUNCTIONS TO VALIDATE USER

export function telefonoValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const telefonoRegExp = /^[0-9]{9}$/; 
    const telefono = control.value;
    if (!telefonoRegExp.test(telefono)) {
      return { telefonoInvalido: true };
    }
    return null;
  };
}


export function nifValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nifRegExp = /^[0-9]{8}[A-Z]$/;
    const nif = control.value;
    if (!nifRegExp.test(nif)) {
      return { nifInvalido: true };
    }
    return null;
  };
}

export function nombreUsuarioExiste(empleadosService: EmpleadosService, isEdit: boolean): ValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const username = control.value;
    return empleadosService.verificarNombreUsuario(username).then(
      (existe: boolean) => {
        return existe && !isEdit ? { usernameExiste: true } : null;
      }
    );
  };
}

export function emailExiste(empleadosService: EmpleadosService, isEdit: boolean): ValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const email = control.value;
    return empleadosService.verificarEmail(email).then(
      (existe: boolean) => {
        return existe && !isEdit ? { emailExiste: true } : null;
      }
    );
  };
}


export function contrasenaValida(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const contrasenaRegExp = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/; 
    const contrasena = control.value;
    if (!contrasenaRegExp.test(contrasena)) {
      return { contrasenaInvalida: true };
    }
    return null;
  };
}

export function coincidirContrasena(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const contrasena = control.get('password');
    const confirmarContrasena = control.get('confirmarPassword');
    if (contrasena && confirmarContrasena && contrasena.value !== confirmarContrasena.value) {
      return { contrasenasNoCoinciden: true };
    }
    return null;
  };
}

export function nombreValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nombreRegExp = /^[a-zA-Z\s]+$/;
    const nombre = control.value;
    if (!nombreRegExp.test(nombre)) {
      return { nombreInvalido: true };
    }
    return null;
  };
}

// FUNCTIONS TO VALIDATE A PRODUCT

export function precioValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const precioRegExp = /^[0-9]+(\.[0-9]{1,2})?$/;
    const precio = control.value;
    if (!precioRegExp.test(precio)) {
      return { precioInvalido: true };
    }
    return null;
  };
}


// FUNCTIONS TO VALIDATE ADDRESS

export function codigoPostalValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const codigoPostalRegExp = /^[0-9]{5}$/; 
    const codigoPostal = control.value;
    if (!codigoPostalRegExp.test(codigoPostal)) {
      return { codigoPostalInvalido: true };
    }
    return null;
  };
}

