import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserHomeComponent } from './user-home/user-home.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { InProgressRequestsComponent } from './in-progress-requests/in-progress-requests.component';

const routes: Routes = [
    { path: '', redirectTo: 'nav', pathMatch: 'full' },
    { path: 'nav', component: UserNavComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: UserHomeComponent },
        { path: 'in-progress', component: InProgressRequestsComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
