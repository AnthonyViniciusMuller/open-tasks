import { Component, effect, inject, input, model, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskForm as TaskFormType } from '../tasks.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-task-form',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  private formBuider = inject(FormBuilder);
  
  readonly form = this.formBuider.nonNullable.group({
    label: ['', [Validators.required]],
    description: ['', [Validators.required]],
    expiresAt: new FormControl<Date | null>(null),
  });

  readonly task = input<TaskFormType>();
  readonly submit = output<TaskFormType>();
  readonly isLoading = model(false);

  onSubmit() {
    if (!this.form.valid) {
      return
    }

    this.submit.emit(this.form.getRawValue());
  }

  readonly autoFill = effect(() => {
    const task = this.task();
    if (!task) {
      return
    }

    this.form.setValue({
      label: task.label,
      description: task.description,
      expiresAt: task.expiresAt,
    });
  });
}
