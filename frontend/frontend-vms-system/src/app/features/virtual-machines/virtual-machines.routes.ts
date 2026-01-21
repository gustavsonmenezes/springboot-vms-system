import { Routes } from '@angular/router';

export const VIRTUAL_MACHINES_ROUTES: Routes = [
  {
    path: '',
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
