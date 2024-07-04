import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', outlet: 'login', component: LoginComponent },
];
