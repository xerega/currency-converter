import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { TuiDialogModule, TuiDialogService } from '@taiga-ui/core';

import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { AmountInputComponent } from './components/amount-input/amount-input.component';
import { DateComponent } from './components/date/date.component';

import { CurrencyApiService } from './services/currency-api.service';
import { CurrencyService } from './services/currency.service';

import { Currency } from './models/currency.model';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    CurrencySelectComponent,
    AmountInputComponent,
    DateComponent,
    TuiDialogModule,
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit, OnDestroy {
  currencyFrom: Currency | null = null;
  currencyTo: Currency | null = null;

  amountFrom = new BehaviorSubject<number | null>(null);
  amountTo = new BehaviorSubject<number | null>(null);

  date: Date | null = new Date();

  amountFromValue: number | null = null;
  amountToValue: number | null = null;

  amountFromSubscription!: Subscription;
  amountToSubscription!: Subscription;

  constructor(
    private currencyApiService: CurrencyApiService,
    private currencyService: CurrencyService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.currencyApiService.getCurrenciesList().subscribe({
      next: (response) => {
        this.currencyService.setCurrencies(response);
      },
      error: (error) => {
        this.openDialog(error.error.error.message);
      },
    });

    this.amountFromSubscription = this.amountFrom
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newAmount: number | null) => {
        this.amountFrom.next(newAmount);
        this.convert('from');
      });

    this.amountToSubscription = this.amountTo
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((newAmount: number | null) => {
        this.amountTo.next(newAmount);
        this.convert('to');
      });
  }

  ngOnDestroy(): void {
    this.amountFromSubscription.unsubscribe();
    this.amountToSubscription.unsubscribe();

    this.amountFrom.complete();
    this.amountTo.complete();
  }

  convert(type: 'from' | 'to') {
    const date = this.date;
    const currencyFrom = this.currencyFrom;
    const currencyTo = this.currencyTo;
    const amount = type === 'from' ? this.amountFromValue : this.amountToValue;

    if (date && currencyFrom && currencyTo && amount !== null) {
      const fromIsoCode =
        type === 'from' ? currencyFrom.isoCode : currencyTo.isoCode;
      const toIsoCode =
        type === 'from' ? currencyTo.isoCode : currencyFrom.isoCode;

      this.currencyApiService
        .getCurrencyConversion(date, fromIsoCode, toIsoCode, amount)
        .subscribe({
          next: (response) => {
            if (type === 'from') {
              this.amountFromValue = amount;
              this.amountToValue = parseFloat(
                response.rates[toIsoCode].rate_for_amount
              );
            } else {
              this.amountToValue = amount;
              this.amountFromValue = parseFloat(
                response.rates[toIsoCode].rate_for_amount
              );
            }
          },
          error: (error) => {
            this.openDialog(error.error.error.message);
          },
        });
    }
  }

  onCurrencyChange(newCurrency: Currency | null, type: 'from' | 'to') {
    if (type === 'from') {
      this.currencyFrom = newCurrency;

      if (newCurrency === null) {
        this.amountFrom.next(null);
        this.amountFromValue = null;
      }
    } else {
      this.currencyTo = newCurrency;

      if (newCurrency === null) {
        this.amountTo.next(null);
        this.amountToValue = null;
      }
    }

    this.convert('from');
  }

  onAmountChange(newAmount: number | null, type: 'from' | 'to') {
    if (type === 'from') {
      this.amountFrom.next(newAmount);
      this.amountFromValue = newAmount;
    } else {
      this.amountTo.next(newAmount);
      this.amountToValue = newAmount;
    }
  }

  onDateChange(newDate: Date | null) {
    this.date = newDate;

    this.convert('from');
  }

  openDialog(message: string) {
    this.dialogs
      .open(message, {
        label: 'Something went wrong :(',
      })
      .subscribe();
  }
}
