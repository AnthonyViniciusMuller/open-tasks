import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
private formBuider = inject(FormBuilder);
  private authService = inject(Auth);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  readonly form = this.formBuider.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
  }, {
    validators: this.passwordsMatchValidator
  });

  readonly isLoading = signal(false);

  onSubmit() {
    if (!this.form.valid) {
      return
    }

    const { email, password } = this.form.getRawValue();

    const register$ = this.authService.register(email, password).pipe(
      catchError(error => this.handleError(error)),
      finalize(() => this.isLoading.set(false)),
    );

    this.isLoading.set(true);
    register$.subscribe(() => {
      this.snackBar.open("Successfully registered", "Close");
      this.router.navigate(["login"])
    });
  }

  private handleError(error: unknown) {
    this.snackBar.open("Error to register", "Close");

    return throwError(() => error);
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
 
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
