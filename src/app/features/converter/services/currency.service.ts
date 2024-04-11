import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Currency, CurrencyPopularity } from '../models/currency.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencies = new BehaviorSubject<Currency[]>([]);
  popularCurrencies = new BehaviorSubject<CurrencyPopularity[]>(
    JSON.parse(localStorage.getItem(environment.popularCurrenciesLS) || '[]')
  );

  getCurrenciesObservable(): Observable<Currency[]> {
    return this.currencies.asObservable();
  }

  setCurrencies(currencies: Currency[]): void {
    this.currencies.next(currencies);
  }

  increaseCurrencyPopularity(currency: Currency | null): void {
    if (currency === null) return;

    const popularCurrency = this.popularCurrencies.value.find(
      (item) => item.currency.isoCode === currency.isoCode
    );

    if (popularCurrency) {
      popularCurrency.popularity++;

      this.popularCurrencies.next([...this.popularCurrencies.value]);
    } else {
      this.popularCurrencies.next([
        ...this.popularCurrencies.value,
        { currency, popularity: 1 },
      ]);
    }

    localStorage.setItem(
      environment.popularCurrenciesLS,
      JSON.stringify(this.popularCurrencies.value)
    );
  }

  getMostPopularCurrencies(number: number): Currency[] {
    const popularCurrencies = this.popularCurrencies.value
      .sort((a, b) => b.popularity - a.popularity)
      .map((item) => item.currency);

    return popularCurrencies.slice(0, number);
  }
}
