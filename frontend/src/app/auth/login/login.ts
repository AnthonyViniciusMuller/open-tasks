import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private formBuider = inject(FormBuilder);
  private authService = inject(Auth);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  readonly form = this.formBuider.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
  });

  readonly isLoading = signal(false);

  onSubmit() {
    if (!this.form.valid) {
      return
    }

    // TODO: implement private/public pem crypt to send passoword
    const { email, password } = this.form.getRawValue();

    const login$ = this.authService.login(email, password).pipe(
      catchError(error => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );

    this.isLoading.set(true);
    login$.subscribe(() => {
      this.snackBar.open("Successfully logged", "Close");
      this.router.navigate(["tasks"])
    });
  }

  private handleError(error: unknown) {
    this.snackBar.open("Error to login", "Close");

    return throwError(() => error);
  }
}
