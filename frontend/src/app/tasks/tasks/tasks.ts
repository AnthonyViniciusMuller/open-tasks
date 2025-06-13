import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Tasks as TasksService} from '../tasks';
import { catchError, delay, filter, finalize, throwError } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreate } from '../task-create/task-create';
import { TaskUpdate } from '../task-update/task-update';
import { Task } from '../tasks.interface';
import { TaskCard } from "../task-card/task-card";
import { TaskDelete } from '../task-delete/task-delete';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    TaskCard
],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks {
  private tasksService = inject(TasksService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  readonly tasks = rxResource({
    stream: () => this.tasksService.list().pipe(delay(1000)),
  });

  openCreateDialog() {
    const dialogRef = this.dialog.open(TaskCreate);

    dialogRef.afterClosed().subscribe(() => this.tasks.reload());
  }

  openUpdateDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskUpdate, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(() => this.tasks.reload());
  }

  openDeleteDialog(taskId: string) {
    const dialogClose$ = this.dialog.open(TaskDelete, { data: taskId }).afterClosed().pipe(
      filter(value => value === true),
    );

    dialogClose$.subscribe(() => this.tasks.update(tasks => tasks?.filter(task => task.id !== taskId)));
  }

  finish(task: Task) {
    const finishedTask = structuredClone(task);
    finishedTask.isFinished = true;

    const delete$ = this.tasksService.update(finishedTask.id!, finishedTask).pipe(
      catchError(error => this.handleFinishTaskError(error)),
    );

    delete$.subscribe(() => {
      this.tasks.reload();
      this.snackBar.open("Successfully finished task", "Close");
    });
  }

  private handleFinishTaskError(error: unknown) {
    this.snackBar.open("Error to finished task", "Close");

    return throwError(() => error);
  }
}
