import { Component, Input } from '@angular/core';
import { Day } from 'src/app/shared/core/models/day.model';
import { Companies, Project } from '../../core/models/company.model';
import * as moment from 'moment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  @Input() item: Companies;

  onWeek(days: Day[]): void {
    this.item.filterProjects = this.item.filterProjects.map((element) => ({
      ...element,
      week: days,
    }));
  }

  onDay(project: Project, day: Day): void {
    console.log(day);
    console.log(project);
  }
}
