import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  addedCompany: string;
  projectForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<AddProjectComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      isSelectCompany: true,
      selectedCompany: ['', Validators.required],
      addedCompany: '',
      items: this.fb.array([]),
    });

    this.addItem();
    this.setValidators();
  }

  setValidators(): void {
    this.projectForm
      .get('isSelectCompany')
      ?.valueChanges.subscribe((value: boolean) => {
        const addedCompanyControl = this.projectForm.get('addedCompany');
        const selectedCompanyControl = this.projectForm.get('selectedCompany');

        if (!value) {
          addedCompanyControl?.setValidators([Validators.required]);
          selectedCompanyControl?.clearValidators();
        } else {
          addedCompanyControl?.clearValidators();
          selectedCompanyControl?.setValidators([Validators.required]);
        }

        addedCompanyControl?.updateValueAndValidity();
        selectedCompanyControl?.updateValueAndValidity();
      });
  }

  get items(): FormArray {
    return this.projectForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      projectName: ['', Validators.required],
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
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
