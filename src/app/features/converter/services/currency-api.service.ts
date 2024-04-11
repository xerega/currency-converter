import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  CurrencyConversionResponse,
  CurrencyListResponse,
} from '../models/currency-api.model';
import { Currency } from '../models/currency.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private baseUrl = environment.currencyApiBaseUrl;
  private apiKey = environment.currencyApiKey;

  constructor(private http: HttpClient) {}

  getCurrenciesList(): Observable<Currency[]> {
    const searchParams = new URLSearchParams({
      api_key: this.apiKey,
      format: 'json',
    });

    return this.http
      .get<CurrencyListResponse>(`${this.baseUrl}/list?${searchParams}`)
      .pipe(map((response) => this.transformCurrenciesListResponse(response)));
  }

  getCurrencyConversion(
    date: Date,
    fromIsoCode: string,
    toIsoCode: string,
    amount: number
  ): Observable<
    CurrencyConversionResponse<typeof fromIsoCode, typeof toIsoCode>
  > {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const formattedDate = utcDate.toISOString().split('T')[0];

    const searchParams = new URLSearchParams({
      api_key: this.apiKey,
      from: fromIsoCode,
      to: toIsoCode,
      amount: amount.toString(),
      format: 'json',
    });

    return this.http.get<
      CurrencyConversionResponse<typeof fromIsoCode, typeof toIsoCode>
    >(`${this.baseUrl}/historical/${formattedDate}?${searchParams}`);
  }

  transformCurrenciesListResponse(response: CurrencyListResponse): Currency[] {
    const currencies = Object.entries(response.currencies).map(
      (currency): Currency => {
        return {
          isoCode: currency[0],
          name: currency[1],
        };
      }
    );

    return currencies;
  }
}
