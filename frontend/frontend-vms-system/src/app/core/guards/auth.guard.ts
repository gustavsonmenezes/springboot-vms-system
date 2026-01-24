import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = authService.isLoggedIn();
  console.log('🛡️ AuthGuard verificando... isLoggedIn:', isLogged);

  if (isLogged) {
    console.log('✅ AuthGuard: Acesso permitido');
    return true;
  }

  console.log('❌ AuthGuard: Acesso negado, redirecionando para login');
  router.navigate(['/login']);
  return false;
};
