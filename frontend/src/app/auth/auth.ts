import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { BYPASS_AUTH } from '../interceptors/context';

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

    const options = {
      context: new HttpContext().set(BYPASS_AUTH, true),
      withCredentials: true,
    }

    return this.http.post<{ token: string}>(`${this.baseUrl}/login`, body, options).pipe(
      map((response) => this.token.set(response.token)
    ));
  }

  register(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }

    const options = {
      context: new HttpContext().set(BYPASS_AUTH, true),
    }
    
    return this.http.post(`${this.baseUrl}/register`, body, options);
  }

  refresh() {
    const options = {
      context: new HttpContext().set(BYPASS_AUTH, true),
      withCredentials: true,
    }

    return this.http.get<{ token: string}>(`${this.baseUrl}/refresh`, options).pipe(
      map((response) => this.token.set(response.token)
    ));
  }
}
