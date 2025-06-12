import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Tasks as TasksService} from '../tasks';
import { delay, filter } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreate } from '../task-create/task-create';
import { TaskUpdate } from '../task-update/task-update';
import { Task } from '../tasks.interface';
import { TaskCard } from "../task-card/task-card";
import { TaskDelete } from '../task-delete/task-delete';

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
}
