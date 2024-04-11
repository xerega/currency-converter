import { Injectable, signal } from '@angular/core';

import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencies = signal<Currency[]>([]);

  constructor() {}

  getCurrencies() {
    return this.currencies;
  }

  setCurrencies(currencies: Currency[]): void {
    this.currencies.set(currencies);
  }
}
