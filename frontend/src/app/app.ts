import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Toolbar } from "./shared/toolbar/toolbar";
import { Auth } from './auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private auth = inject(Auth);
  private router = inject(Router);

  protected title = 'open-tasks';

  constructor() {
    this.auth.refresh().subscribe(() => this.router.navigate(['/tasks']));
  }
}
