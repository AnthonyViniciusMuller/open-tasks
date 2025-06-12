import { Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Theme } from '../theme/theme';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  readonly theme = inject(Theme);
  readonly auth = inject(Auth);
  readonly router = inject(Router);

  readonly isLogged = computed(() => !!this.auth.token());

  logout() {
    this.auth.token.set(null);
    this.router.navigate(["login"]);
  }
}
