import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./layouts/login/login.component'),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./layouts/home/home.component'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
