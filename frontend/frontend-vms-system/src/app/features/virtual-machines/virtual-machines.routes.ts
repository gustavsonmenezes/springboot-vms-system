import { Routes } from '@angular/router';

export const VIRTUAL_MACHINES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/vm-list/vm-list.component')
      .then(m => m.VmListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/vm-form/vm-form.component')
      .then(m => m.VmFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/vm-form/vm-form.component')
      .then(m => m.VmFormComponent)
  }
];
