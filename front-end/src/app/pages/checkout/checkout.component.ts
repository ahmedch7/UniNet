import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environnement';

declare var paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.addPayPalScript().then(() => {
      paypal.Buttons(this.payPalConfig).render('#paypal-button-container');
    });
  }

  addPayPalScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (window.document.getElementById('paypal-script')) {
        resolve(true);
      } else {
        const script = window.document.createElement('script');
        script.id = 'paypal-script';
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${environment.PAYPAL_CLIENT_ID}`;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          reject(false);
        };
        window.document.body.appendChild(script);
      }
    });
  }

  payPalConfig = {
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '100.00' // Replace this value with the actual amount
          }
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(details => {
        console.log('Transaction completed by ' + details.payer.name.given_name);
        // Handle successful transaction here (e.g., show a success message, update order status, etc.)
      });
    },
    onError: err => {
      console.error('PayPal error:', err);
      // Handle error here
    }
  };

}
