import { Component, inject, signal } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tasks } from '../tasks';
import { TaskForm } from '../tasks.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-delete',
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content class="mat-typography">
      This action can not be undone
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton mat-dialog-close cdkFocusInitial [disabled]="isLoading()">No</button>
      <button matButton (click)="submit()" [disabled]="isLoading()">confirm</button>
    </mat-dialog-actions>
  `,
})
export class TaskDelete {
  private taskService = inject(Tasks);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<TaskForm>);

  readonly taskId = inject<string>(MAT_DIALOG_DATA);
  readonly isLoading = signal(false);

  submit() {
    const delete$ = this.taskService.delete(this.taskId).pipe(
      catchError(error => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );

    this.isLoading.set(true);
    delete$.subscribe(() => {
      this.dialogRef.close(true);
      this.snackBar.open("Successfully delete task", "Close");
    });
  }

  private handleError(error: unknown) {
    this.snackBar.open("Error to delete task", "Close");

    return throwError(() => error);
  }
}
