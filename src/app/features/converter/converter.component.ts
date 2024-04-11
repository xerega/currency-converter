import { Component, signal } from '@angular/core';

import { CurrencySelectComponent } from './components/currency-select/currency-select.component';

import { Currency } from './models/currency.model';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CurrencySelectComponent],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent {
  currencyFrom = signal<Currency | null>(null);
  currencyTo = signal<Currency | null>(null);
}
