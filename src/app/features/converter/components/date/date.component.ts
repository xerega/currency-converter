import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiInputDateModule } from '@taiga-ui/kit';

@Component({
  selector: 'converter-date',
  standalone: true,
  imports: [FormsModule, TuiInputDateModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent implements OnInit {
  @Input() date!: Date | null;
  @Output() dateChange = new EventEmitter<Date | null>();

  tuiDate: TuiDay | null = null;
  maxTuiDate: TuiDay | null = null;

  ngOnInit(): void {
    const date = this.date || new Date();

    this.tuiDate = new TuiDay(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    this.maxTuiDate = this.tuiDate;
  }

  onDateChange(newTuiDate: TuiDay) {
    this.tuiDate = newTuiDate;

    const newDate = new Date(newTuiDate.year, newTuiDate.month, newTuiDate.day);
    this.dateChange.emit(newDate);
  }
}
