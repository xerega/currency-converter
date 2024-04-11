import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  tuiItemsHandlersProvider,
} from '@taiga-ui/kit';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { Subscription } from 'rxjs';

import { CurrencyService } from '../../services/currency.service';

import { WhiteFlagFallbackDirective } from '../../directives/white-flag-fallback.directive';

import { Currency } from '../../models/currency.model';

const STRINGIFY_ITEM: TuiStringHandler<Currency> = (currency: Currency) =>
  `${currency.isoCode} ${currency.name}`;

@Component({
  standalone: true,
  selector: 'converter-select',
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss',
  imports: [
    FormsModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiFilterByInputPipeModule,
    WhiteFlagFallbackDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiItemsHandlersProvider({ stringify: STRINGIFY_ITEM })],
})
export class CurrencySelectComponent implements OnInit, OnDestroy {
  @Input() currency!: Currency | null;
  @Output() currencyChange = new EventEmitter<Currency | null>();

  currencies: Currency[] = [];
  popularCurrencies: Currency[] = [];

  private currencySubscription!: Subscription;
  private popularCurrenciesSubscription!: Subscription;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencySubscription = this.currencyService
      .getCurrenciesObservable()
      .subscribe((currencies) => {
        this.currencies = currencies;
      });

    this.popularCurrenciesSubscription = this.currencyService.popularCurrencies
      .asObservable()
      .subscribe(() => {
        this.popularCurrencies =
          this.currencyService.getMostPopularCurrencies(5);
      });
  }

  ngOnDestroy(): void {
    this.currencySubscription.unsubscribe();
    this.popularCurrenciesSubscription.unsubscribe();
  }

  getUrl(isoCode: string) {
    return `https://flagcdn.com/w40/${isoCode.slice(0, 2).toLowerCase()}.png`;
  }

  onCurrencyChange(newCurrency: Currency | null) {
    this.currencyService.increaseCurrencyPopularity(newCurrency);

    this.currencyChange.emit(newCurrency);
  }
}
