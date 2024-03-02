import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./shell/shell.component').then((m) => m.ShellComponent),
  },
  {
    // TODO DO A PAGE NOT FOUND HERE!
    path: '**',
    loadComponent: () => import('./shell/shell.component').then((m) => m.ShellComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
