import { Component, inject, input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, throwError } from 'rxjs';
import { Tasks } from '../tasks';
import { TaskForm } from '../task-form/task-form';
import { Task, TaskForm as TaskFormType } from '../tasks.interface';

@Component({
  selector: 'app-task-update',
  imports: [TaskForm],
  template: `<app-task-form [(isLoading)]="isLoading" [task]="task" (submit)="submit($event)" />`,
})
export class TaskUpdate {
  private taskService = inject(Tasks);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<TaskForm>);

  readonly task = inject<Task>(MAT_DIALOG_DATA);
  readonly isLoading = signal(false);

  submit(task: TaskFormType) {
    if (this.isLoading()) {
      return
    }

    const update$ = this.taskService.update(this.task.id!, task).pipe(
      catchError(error => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );

    this.isLoading.set(true);
    update$.subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Successfully update task", "Close");
    });
  }

  private handleError(error: unknown) {
    this.snackBar.open("Error to update task", "Close");

    return throwError(() => error);
  }
}
