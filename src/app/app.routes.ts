import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'user-repos',
    loadComponent: () => import('./features/user-repos/user-repos.component').then(component => component.UserReposComponent)
  }
];
