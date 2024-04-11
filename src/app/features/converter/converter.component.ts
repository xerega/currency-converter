import { Component, signal } from '@angular/core';

import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { AmountInputComponent } from './components/amount-input/amount-input.component';
import { DateComponent } from './components/date/date.component';

import { Currency } from './models/currency.model';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CurrencySelectComponent, AmountInputComponent, DateComponent],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent {
  currencyFrom = signal<Currency | null>(null);
  currencyTo = signal<Currency | null>(null);

  amountFrom = signal<number | null>(null);
  amountTo = signal<number | null>(null);

  date = signal<Date | null>(null);
}
