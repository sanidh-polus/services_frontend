import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { InProgressRequestsComponent } from './in-progress-requests/in-progress-requests.component';

@NgModule({
  declarations: [
    UserNavComponent,
    UserHomeComponent,
    InProgressRequestsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgFor,
    NgIf,
    RouterOutlet,
    RouterLink
  ]
})
export class UserModule {}
