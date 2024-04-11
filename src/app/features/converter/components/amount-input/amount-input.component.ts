import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';

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
  @Input() amount!: number | null;
  @Input() disabled!: boolean;
  @Output() amountChange = new EventEmitter<number | null>();

  onAmountChange(newAmount: number | null) {
    this.amountChange.emit(newAmount);
  }
}
