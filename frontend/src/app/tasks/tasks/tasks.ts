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
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks {
  private tasksService = inject(TasksService);

  readonly tasks = rxResource({
    stream: () => this.tasksService.list().pipe(delay(1000)),
  });
}
