import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from './tasks.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private http = inject(HttpClient);

  private baseUrl = `${environment.apiURL}/tasks`;

  list() {
    return this.http.get<Task[]>(`${this.baseUrl}`).pipe(
      tap(value => console.log(value)),
      map((response) => response.map((task: { [x: string]: any; }) => ({
        id: task["id"],
        userId: task["userId"],
        label: task["label"],
        description: task["description"],
        createdAt: task["createdAt"] ? new Date(task["createdAt"]) : null,
        expiresAt: task["expiresAt"] ? new Date(task["expiresAt"]) : null,
      })))
    );
  }
}
