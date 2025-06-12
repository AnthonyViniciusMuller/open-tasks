import { Routes } from '@angular/router';
import { authenticationGuard } from './guards/logged';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(mod => mod.Login),
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/register/register').then(mod => mod.Register),
    },
    {
        path: 'tasks',
        canActivate: [authenticationGuard()],
        loadComponent: () => import('./tasks/tasks/tasks').then(mod => mod.Tasks),
    },
    { 
        path: '**', 
        redirectTo: 'login',
    },
];
