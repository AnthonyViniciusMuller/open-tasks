import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BYPASS_AUTH } from './context';
import { Auth } from '../auth/auth';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(BYPASS_AUTH)) {
    return next(req);
  }

  const auth = inject(Auth);

  const authReq = req.clone({
    setHeaders: {
      "Authorization": `Bearer ${auth.token()}`,
      "Accept": "application/json",
    }
  });

  return next(authReq);
};