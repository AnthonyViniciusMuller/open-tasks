import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);

  private baseUrl = `${environment.apiURL}/auth`;
  public token = signal<string | null>(null);

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    return this.http.post<{ token: string}>(`${this.baseUrl}/login`, body).pipe(
      map((response) => this.token.set(response.token)
    ));
  }
}
