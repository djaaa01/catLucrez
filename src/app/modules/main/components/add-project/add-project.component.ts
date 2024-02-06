import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from 'src/app/modules/auth/core/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  isLoading = false;

  constructor(
    private readonly dialogRef: MatDialogRef<AddProjectComponent>,
    private readonly projectService: ProjectService,
    private readonly authService: AuthService,
    private readonly notifier: NotifierService,
    private readonly translateService: TranslateService,

    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      companyName: ['', Validators.required],
      items: this.fb.array([]),
    });

    this.addItem();

    this.filteredOptions = this.projectForm.controls[
      'companyName'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  get items(): FormArray {
    return this.projectForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      projectName: ['', Validators.required],
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onCreateProject(): void {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      this.isLoading = true;

      this.projectService
        .addCompany({
          companyName: this.projectForm.value.companyName,
          uid: this.authService.getCurrentUse()?.uid,
          createdDate: new Date(),
        })
        .then(
          (response) => {
            const items: Promise<any>[] = [];
            this.projectForm.value.items.forEach((element: any) => {
              items.push(
                this.projectService.addProject({
                  companyId: response.id || '0',
                  uid: this.authService.getCurrentUse()?.uid,
                  projectName: element.projectName,
                  createdDate: new Date(),
                })
              );
            });

            Promise.all(items).then(
              () => {
                this.isLoading = false;
                this.dialogRef.close(true);
              },
              () => {
                this.isLoading = false;
                this.notifier.notify(
                  'error',
                  this.translateService.instant('GENETAL_ERROR')
                );
              }
            );
          },
          () => {
            this.isLoading = false;
            this.notifier.notify(
              'error',
              this.translateService.instant('GENETAL_ERROR')
            );
          }
        );
    } else {
      this.markFormGroupTouched(this.projectForm);

      this.items.controls.forEach((itemControl: any) => {
        this.markFormGroupTouched(itemControl);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
