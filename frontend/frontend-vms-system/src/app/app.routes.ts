import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/vms', pathMatch: 'full' },
  {
    path: 'vms',
    loadChildren: () => import('./features/virtual-machines/virtual-machines.routes')
      .then(m => m.VIRTUAL_MACHINES_ROUTES)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/tasks.routes')
      .then(m => m.TASKS_ROUTES)
  },
  { path: '**', redirectTo: '/vms' }
];
