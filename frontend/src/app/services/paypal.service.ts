import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private paypalLoaded: boolean = false;

  constructor() { }

  loadPaypalScript(clientId: string): Promise<void> {
    if (this.paypalLoaded) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
      script.onload = () => {
        this.paypalLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error('PayPal SDK no se pudo cargar.'));
      document.body.appendChild(script);
    });
  }
}
