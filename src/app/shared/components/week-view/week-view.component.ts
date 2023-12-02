import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Day } from '../../core/models/day.model';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss'],
})
export class WeekViewComponent implements OnInit {
  @Input() isDaySelect: boolean = false;
  @Output() onSelectedDate = new EventEmitter<Day>();
  @Output() onFirstDayOfWeek = new EventEmitter<Day>();

  firstDayOfWeek = moment().startOf('isoWeek');
  weekDays: Day[] = [];
  selectedDay: Day;

  ngOnInit(): void {
    this.showWeekDays();
  }

  showWeekDays(): void {
    this.weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = this.firstDayOfWeek.clone().add(i, 'days');
      this.weekDays.push({
        day: day.format('dddd'),
        month: day.format('MMMM'),
        date: day.format('DD'),
        year: day.format('yyyy'),
        unformatDate: day,
        selected: day.isSame(
          this.selectedDay?.unformatDate
            ? this.selectedDay?.unformatDate
            : moment(),
          'day'
        ),
      });
    }

    this.onFirstDayOfWeek.emit({
      day: this.firstDayOfWeek.format('dddd'),
      month: this.firstDayOfWeek.format('MMMM'),
      date: this.firstDayOfWeek.format('DD'),
      year: this.firstDayOfWeek.format('yyyy'),
      unformatDate: this.firstDayOfWeek,
    });
  }

  showNextWeek(): void {
    this.firstDayOfWeek.add(7, 'days');
    this.showWeekDays();
  }

  showPreviousWeek(): void {
    this.firstDayOfWeek.subtract(7, 'days');
    this.showWeekDays();
  }

  onDay(item: Day): void {
    this.weekDays.forEach((element) => {
      element.selected = false;
    });
    item.selected = true;
    this.selectedDay = item;

    this.onSelectedDate.emit(item);
  }
}
