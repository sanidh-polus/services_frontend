import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user/home', component: UserHomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent}
];
