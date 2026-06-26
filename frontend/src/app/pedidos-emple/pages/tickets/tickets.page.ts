import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TicketService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketCreatePage {
  mesaNum: string = "";

  constructor(private ticketService: TicketService, private alertController: AlertController) { }

  crearTicket() {
    const mesaIdNumber = Number(this.mesaNum);
    if (isNaN(mesaIdNumber)) {
      this.mostrarAlerta('Error', 'Please enter a valid table ID.');
      return;
    }

    this.ticketService.createTicket(mesaIdNumber).subscribe(
      (response: null) => {
        if (response == null) {
          this.mostrarAlerta('Error', 'An error occurred while creating the ticket.');
          return;
        }
        this.mesaNum = "";
        this.mostrarAlerta('Ticket created', 'A new ticket has been successfully created.');
      },
      (error: any) => {
        this.mostrarAlerta('Error', 'An error occurred while creating the ticket.');
      }
    );
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