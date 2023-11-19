import { Component } from '@angular/core';
import * as moment from 'moment';
import { Day } from 'src/app/shared/core/models/day.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  onSelectedDate(selectedDate: Day): void {
    console.log(selectedDate);
  }
}
