import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TicketService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-delete',
  templateUrl: './tickets-delete.page.html',
})
export class TicketDeletePage implements OnInit {
  tickets: any[] = [];

  constructor(private ticketService: TicketService, private alertController: AlertController) { }

  ngOnInit() {
   
    this.ticketService.getOpenTickets();
    this.ticketService.tickets$.subscribe(
      tickets => this.tickets = tickets,
    );
  }

  async cerrarTicket(mesaNum: string) {
    const confirmacion = await this.mostrarConfirmacion();
    if (confirmacion) {
      const mesaIdNumber = Number(mesaNum);
      if (isNaN(mesaIdNumber)) {
        this.mostrarAlerta('Error', 'Please enter a valid table ID.');
        return;
      }
  
      this.ticketService.closeTicket(mesaIdNumber).subscribe(
        () => {
          this.mostrarAlerta('Success', 'The ticket has been successfully closed.');
        },
        error => {
          console.error('Error:', error); 
  
          let errorMessage = 'An error occurred while closing the ticket.';
          if (error.status === 400) {
            errorMessage = 'Table not found or there are no active tickets for this table.';
          } else if (error.status === 409) {
            errorMessage = 'Cannot close the ticket because some associated orders are not completed.';
          }
  
          this.mostrarAlerta('Error', errorMessage);
        }
      );
    }
  }
  
  
  
  async mostrarConfirmacion(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure you want to close the ticket?',
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
            text: 'OK',
            handler: () => {
              resolve(true);
            }
          }
        ]
      }).then(alert => alert.present());
    });
  }
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
