import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tasks as TasksService} from '../tasks';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { delay } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreate } from '../task-create/task-create';
import { TaskUpdate } from '../task-update/task-update';
import { Task } from '../tasks.interface';

@Component({
  selector: 'app-tasks',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    DatePipe,
    MatListModule,
    MatProgressBarModule,
    MatIcon,
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
}
