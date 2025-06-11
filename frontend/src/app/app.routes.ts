import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '**', 
        redirectTo: 'login',
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(mod => mod.Login),
    }
];
