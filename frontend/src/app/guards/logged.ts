import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../auth/auth";

export const authenticationGuard = (): CanActivateFn => {
  return () => {
    const auth = inject(Auth);
    const router = inject(Router);

    console.log(auth.token())
    if (!auth.token()) {
        router.navigate(["login"]);
        
        return false;
    }

    return true;
  };
}