import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // El usuario está logueado, permite el acceso
  } else {
    router.navigate(['/login']); // No logueado, redirige a la página de login
    return false;
  }
};