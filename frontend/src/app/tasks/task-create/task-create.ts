import { Component, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, throwError } from 'rxjs';
import { Tasks } from '../tasks';
import { TaskForm as TaskFormType } from '../tasks.interface';
import { TaskForm } from "../task-form/task-form";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-create',
  imports: [TaskForm],
  template: `<app-task-form [(isLoading)]="isLoading" (submit)="submit($event)" />`,
})
export class TaskCreate {
  private taskService = inject(Tasks);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<TaskForm>);

  readonly isLoading = signal(false);

  submit(task: TaskFormType) {
    const create$ = this.taskService.create(task).pipe(
      catchError(error => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );

    this.isLoading.set(true);
    create$.subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Successfully create task", "Close");
    });
  }

  private handleError(error: unknown) {
    this.snackBar.open("Error to create task", "Close");

    return throwError(() => error);
  }
}
