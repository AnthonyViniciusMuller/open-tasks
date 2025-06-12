import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from './tasks.interface';
import { map } from 'rxjs';
import { TaskForm as TaskFormType } from './tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private http = inject(HttpClient);

  private baseUrl = `${environment.apiURL}/tasks`;

  create(task: TaskFormType) {
    return this.http.post(this.baseUrl, task);
  }

  list() {
    return this.http.get<Task[]>(`${this.baseUrl}`).pipe(
      map((response) => response.map((task: { [x: string]: any; }) => ({
        id: task["id"],
        userId: task["userId"],
        label: task["label"],
        description: task["description"],
        createdAt: task["createdAt"] ? new Date(task["createdAt"]) : undefined,
        expiresAt: task["expiresAt"] ? new Date(task["expiresAt"]) : null,
      })))
    );
  }

  update(taskId: string, task: TaskFormType) {
    return this.http.put(`${this.baseUrl}/${taskId}`, task);
  }
}
