import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: () => import('./feature/home/home.routes')
    },
    {
        path: 'admin',
        loadComponent: () => import('./feature/admin/admin.component').then((m) => m.AdminComponent)
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./feature/cadastro/cadastro.component').then((m) => m.CadastroComponent)
    },

];
