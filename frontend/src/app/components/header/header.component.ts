import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CarritoService } from 'src/app/services/carrito.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})

export class HeaderComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() volver: boolean = true;

  cantidadEnCarrito: number = 0;

  constructor(private carritoService: CarritoService

  ) { }

  ngOnInit(): void {
    this.carritoService.obtenerCantidadCarritoObservable().subscribe(cantidad => {
      this.cantidadEnCarrito = cantidad;
    });
  }
}
