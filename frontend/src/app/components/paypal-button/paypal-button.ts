import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.html',
  styleUrls: ['./paypal-button.scss'],
  standalone: true
})
export class PaypalButtonComponent implements OnInit {

  @Input() amount: number = 0;
  @Output() paymentSuccess = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.renderPayPalButton();
  }

  renderPayPalButton() {
    // @ts-ignore
    paypal.Buttons({
      style: {
        layout: 'horizontal',
        label: 'paypal',
        tagline: 'false',
        size: 'responsive'
      },
      createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { value: string; currency_code: string; }; }[]; }) => any; }; }) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.amount.toString(),
              currency_code: 'EUR'
            }
          }]
        });
      },
      onApprove: (data: any, actions: { order: { capture: () => Promise<any>; }; }) => {
        return actions.order.capture().then(details => {
          this.paymentSuccess.emit();
        });
      },
      onError: (err: any) => {
        console.error('PayPal Button Error:', err);
      }
    }).render('#paypal-button-container');
  }
}
