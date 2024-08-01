import { Component, OnInit } from '@angular/core';
import { LoginSignUpService } from '../../service/login-signup/login_signup.service';
import { UserDetails } from './UserDetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

    constructor(private _loginSignUpService: LoginSignUpService) {}

    currentUser: UserDetails | null = null;

    ngOnInit(): void {
        const CURRENT_USER = this._loginSignUpService.getCurrentUser();

        if (CURRENT_USER) {
            this.currentUser = CURRENT_USER;
        }
    }

}
