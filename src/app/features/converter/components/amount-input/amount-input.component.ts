import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';

@Component({
  selector: 'converter-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './amount-input.component.html',
  styleUrl: './amount-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountInputComponent {
  @Input() amount!: WritableSignal<number | null>;
  @Input() disabled!: boolean;

  onAmountChange(newAmount: number) {
    this.amount.set(newAmount);
  }
}
