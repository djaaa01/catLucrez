import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-time-cell',
  templateUrl: './time-cell.component.html',
  styleUrls: ['./time-cell.component.scss'],
})
export class TimeCellComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<TimeCellComponent>,
    private readonly notifier: NotifierService
  ) {}

  isLoading = false;
  exampleFormat = '2h 33m';
  remainingTime = '2h 33m';

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {}
}
