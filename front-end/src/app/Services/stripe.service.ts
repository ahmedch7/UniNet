// src/app/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: Stripe | null = null;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51PMll8RpOF1TW86gGeBK1RsYmxIBm51hxAL5n2UpnZ2bUoSOgXosdpC0d1gOqkW2Vjpg0DjLBtkfxFeCwvOxR2s800ppStbgBM');
  }

  public getStripe() {
    return this.stripe;
  }
}
