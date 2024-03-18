import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '../../core/services/project.service';
import { take } from 'rxjs';
import { Companies, Company, Project } from '../../core/models/company.model';
import { Auth, User as FirebaseUser } from '@angular/fire/auth';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  companies: Companies[];
  isLoading: boolean = false;
  currentUser: string;

  constructor(
    private dialog: MatDialog,
    private readonly notifier: NotifierService,
    private readonly translateService: TranslateService,
    private readonly projectService: ProjectService,
    private fireAuth: Auth
  ) {}

  ngOnInit(): void {
    this.currentUser = this.fireAuth.currentUser?.uid as string;
    console.log(this.currentUser);
    this.setCompanies();
  }

  setCompanies(): void {
    this.isLoading = true;
    this.projectService
      .getCompanies(this.currentUser)
      .pipe(take(1))
      .subscribe(
        (companies) => {
          if (companies?.length) {
            const companyIdsList: string[] = [];
            companies.forEach((element) => {
              companyIdsList.push(element.id as string);
            });

            this.projectService
              .getProjects(companyIdsList)
              .pipe(take(1))
              .subscribe(
                (projects) => {
                  this.isLoading = false;
                  this.companies = this.sortProjectsAfterCompanies(
                    companies,
                    projects
                  );
                  console.log(this.companies);
                },
                (error) => {
                  console.log(error);
                  this.isLoading = false;
                }
              );
          } else {
            this.isLoading = false;
          }
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  sortProjectsAfterCompanies(
    companies: Company[],
    projects: Project[]
  ): Companies[] {
    const sortedCompanies: Companies[] = Object.keys(companies)
      .filter((key) => key !== 'length')
      .map((key) => {
        const company = companies[key as any];
        const projectId = companies[key as any].id;

        const filterProjects: Project[] = [];
        Object.keys(projects)
          .filter((key2) => key2 !== 'length')
          .forEach((key2) => {
            if (projects[key2 as any].companyId === projectId) {
              filterProjects.push(projects[key2 as any]);
            }
          });

        return { company, filterProjects };
      });

    return sortedCompanies;
  }

  addProject(): void {
    const dialogRef = this.dialog.open(AddProjectComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setCompanies();
        this.notifier.notify(
          'success',
          this.translateService.instant('OPERATION_SUCCESSFUL')
        );
      }
    });
  }
}
