import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from '@environment/environment';

const loadUserSession = (): boolean => {
  return Boolean(localStorage.getItem(environment.emailKey));
};

const canActivate = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const router = inject(Router);
  const path = route.url.map((segment) => segment.path).join('/');

  if (path === 'login' && loadUserSession()) {
    router.navigateByUrl('/home');
    return false;
  } else {
    return true;
  }
};

export const authGuard: CanActivateFn = (route, state) => {
  return canActivate(route, state);
};
