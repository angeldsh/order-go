import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../auth/services/autenticacion.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CodigoMesaModalComponent } from '../components/modal-codigo-mesa/codigo-mesa-modal';
import { TicketService } from '../services/tickets.service';
import { MenuService } from '../services/menu.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage {

  constructor(private menuService: MenuService, private router: Router, private authService: AutenticacionService, private modalController: ModalController, private ticketService: TicketService
    , private alertController: AlertController

  ) { }




  setMenuLocal(): void {
    const menuLocal = [
      { title: 'Home', url: 'welcome', icon: 'home' },
      { title: 'Menu', url: 'carta', icon: 'restaurant' },
      { title: 'My Orders', url: 'clientes/mis-pedidos', icon: 'archive' }
    ];

    this.menuService.setMenu(menuLocal);
  }
  setMenuDom(): void {
    const menuDomicilio = [
      { title: 'Home', url: 'welcome', icon: 'home' },
      { title: 'Delivery Menu', url: 'carta-domicilio', icon: 'restaurant' },
      { title: 'My Orders', url: 'clientes/mis-pedidos', icon: 'archive' },
      { title: 'Profile', url: 'clientes/profile', icon: 'person' }
    ];

    this.menuService.setMenu(menuDomicilio);
  }
  async pedirEnLocal() {
    const isMobile = window.innerWidth < 768;
    const modalOptions: any = {
      component: CodigoMesaModalComponent,
      cssClass: 'codigo-mesa-modal',
    };

    if (isMobile) {
      modalOptions.breakpoints = [0, 0.4, 1];
      modalOptions.initialBreakpoint = 0.4;
      modalOptions.handle = true;
    }

    const modal = await this.modalController.create(modalOptions);

    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        const codigoMesa = result.data;
        this.ticketService.verificarCodigo(codigoMesa).subscribe(
          (response) => {
            if (response == true) {
              localStorage.setItem('codigoMesa', codigoMesa);
              this.setMenuLocal();
              this.router.navigate(['/carta']);
            } else {
              this.mostrarMensajeError('The access code is invalid.');

            }
          },
          (error: any) => {
            this.mostrarMensajeError('Error verifying access code.');
          }
        );
      }
    });

    await modal.present();
  }


  async mostrarMensajeError(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async pedirADomicilio() {
    localStorage.removeItem('codigoMesa');
    const sesionIniciada = await this.authService.isSesionIniciada().toPromise();
    if (!sesionIniciada) {
      this.router.navigate(['/auth/login']);

    } else {
      this.setMenuDom();
      this.router.navigate(['/carta-domicilio']);
    }
  }

}

