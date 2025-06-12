import { Component, input, output } from '@angular/core';
import { Task } from '../tasks.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    DatePipe,
    MatIcon,
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCard {
  readonly task = input<Task>();
  readonly onUpdate = output<Task>();
  readonly onDelete = output<string>();
}
