import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
export class CurrencySelectComponent {
  @Input() currency!: Currency | null;
  @Output() currencyChange = new EventEmitter<Currency | null>();

  items = this.currencyService.getCurrencies();

  constructor(private currencyService: CurrencyService) {}

  getUrl(isoCode: string) {
    return `https://flagcdn.com/w40/${isoCode.slice(0, 2).toLowerCase()}.png`;
  }

  onCurrencyChange(newCurrency: Currency | null) {
    this.currencyChange.emit(newCurrency);
  }
}
