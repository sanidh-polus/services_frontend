import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    { path: 'error', component: Error404Component },
    { path: '**', component: Error404Component},
];
