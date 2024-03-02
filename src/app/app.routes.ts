import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./shell/main/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  // {
  // TODO DO A PAGE NOT FOUND HERE!
  //   path: '**',
  // loadComponent: () => import('./shell/main/main.component').then((m) => m.MainComponent),
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
