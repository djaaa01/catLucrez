import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Day } from 'src/app/shared/core/models/day.model';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  constructor(private dialog: MatDialog) {}

  onFirstDayOfWeek(selectedDate: Day): void {
    console.log(selectedDate);
  }

  addProject(): void {
    const dialogRef = this.dialog.open(AddProjectComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialogul s-a închis, rezultat: ${result}`);
    });
  }
}
