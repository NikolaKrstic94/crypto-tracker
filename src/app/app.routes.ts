import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./shell/main/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./shell/main/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
