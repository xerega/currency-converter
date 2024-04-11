import { Component, OnInit, signal } from '@angular/core';

import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { AmountInputComponent } from './components/amount-input/amount-input.component';
import { DateComponent } from './components/date/date.component';

import { CurrencyApiService } from './services/currency-api.service';
import { CurrencyService } from './services/currency.service';

import { Currency } from './models/currency.model';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CurrencySelectComponent, AmountInputComponent, DateComponent],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  currencyFrom = signal<Currency | null>(null);
  currencyTo = signal<Currency | null>(null);

  amountFrom = signal<number | null>(null);
  amountTo = signal<number | null>(null);

  date = signal<Date | null>(null);

  constructor(
    private currencyApiService: CurrencyApiService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.currencyApiService.getCurrenciesList().subscribe({
      next: (response) => {
        this.currencyService.setCurrencies(response);
      },
    });
  }
}
