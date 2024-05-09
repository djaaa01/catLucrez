import { Component, Input } from '@angular/core';
import { Day } from 'src/app/shared/core/models/day.model';
import { Companies, Project } from '../../core/models/company.model';
import * as moment from 'moment';
import { TimeCellComponent } from '../time-cell/time-cell.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  constructor(private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(TimeCellComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result)
      }
    });
  }
}
