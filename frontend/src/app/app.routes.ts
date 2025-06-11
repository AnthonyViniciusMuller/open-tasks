import { Routes } from '@angular/router';

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
        path: '**', 
        redirectTo: 'login',
    },
];
