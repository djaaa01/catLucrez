import { Component } from '@angular/core';
import { Day } from 'src/app/shared/core/models/day.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  onFirstDayOfWeek(selectedDate: Day): void {
    console.log(selectedDate);
  }
}
