import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Day } from 'src/app/shared/core/models/day.model';
import { AddProjectComponent } from '../add-project/add-project.component';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private readonly notifier: NotifierService,
    private readonly translateService: TranslateService,
    private readonly projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.getCompanies().subscribe((response) => {
      console.log(response);
    });
  }

  onFirstDayOfWeek(selectedDate: Day): void {
    console.log(selectedDate);
  }

  addProject(): void {
    const dialogRef = this.dialog.open(AddProjectComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notifier.notify(
          'success',
          this.translateService.instant('OPERATION_SUCCESSFUL')
        );
      }
    });
  }
}
