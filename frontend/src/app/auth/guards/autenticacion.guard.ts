import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AutenticacionService } from '../services/autenticacion.service';
import { inject } from '@angular/core';

export const autenticacionGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const autenticacionService = inject(AutenticacionService);

  return autenticacionService.isSesionIniciada()
    .pipe(
      tap((autenticado: any) => {

        if (!autenticado) {
          router.navigate(['/auth/login']);
        }

        return autenticado;
      })
    );
};
