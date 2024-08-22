import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./layouts/login/login.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./layouts/home/home.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./layouts/not-found/not-found.component'),
  },
];
