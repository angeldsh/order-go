import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { autenticacionGuard } from './auth/guards/autenticacion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'clientes/listado',
    loadChildren: () => import('./clientes/pages/listado/listado.module').then(m => m.ListadoPageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'empleados/listado',
    loadChildren: () => import('./empleados/pages/listado/listado.module').then(m => m.ListadoPageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'mesas/listado',
    loadChildren: () => import('./mesas/pages/listado/listado.module').then(m => m.ListadoPageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'productos/listado',
    loadChildren: () => import('./productos/pages/listado-adm/listado.module').then(m => m.ListadoPageAdmModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'categorias/listado',
    loadChildren: () => import('./categorias/pages/listado/listado.module').then(m => m.ListadoPageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'clientes/profile',
    loadChildren: () => import('./clientes/pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'carta',
    loadChildren: () => import('./productos/pages/listado-mesa/listado.module').then(m => m.ListadoMesaPageModule)
  },
  {
    path: 'carta-domicilio',
    loadChildren: () => import('./productos/pages/listado/listado.module').then(m => m.ListadoPageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/pages/listado/carrito-page.module').then(m => m.CarritoPageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'pedidos-emple',
    loadChildren: () => import('./pedidos-emple/pages/listado/listado.module').then(m => m.ListadoPageModule),
    canActivate: [autenticacionGuard]

  }, {
    path: 'clientes/mis-pedidos',
    loadChildren: () => import('./clientes/pages/mis-pedidos/mis-pedidos.module').then(m => m.MisPedidosPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  }
  ,
  {
    path: 'tickets',
    loadChildren: () => import('./pedidos-emple/pages/actions/action.module').then(m => m.ActionPageModule),
    canActivate: [autenticacionGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pedidos-emple/pages/ver-tickets/listado-tickets.module').then(m => m.ListadoTicketsPageModule),
    canActivate: [autenticacionGuard]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
