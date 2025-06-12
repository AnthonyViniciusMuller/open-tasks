import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { BYPASS_AUTH } from './context';
import { Auth } from '../auth/auth';

export const RefreshInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.context.get(BYPASS_AUTH)) {
        return next(req);
    }

    const auth = inject(Auth);

    return next(req).pipe(
        catchError(error => {
            if (error.status === 403) {
                return auth.refresh().pipe(
                    switchMap(() => next(req))
                );
            }
            return throwError(() => error);
        })
    );
}