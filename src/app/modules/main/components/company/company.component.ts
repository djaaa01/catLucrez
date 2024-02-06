import { Component } from '@angular/core';
import { Day } from 'src/app/shared/core/models/day.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  onFirstDayOfWeek(selectedDate: Day): void {
    console.log(selectedDate);
  }
}
