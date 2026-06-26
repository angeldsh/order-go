import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {



  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
   
  }


  
}
