import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';

import { LoginSignupService } from '../service/login_signup.service';

// interface Login {
//     email: string;
//     password: string;
// }

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(private login_signup_service: LoginSignupService, private router: Router) {}
    
    email = '';
    password = '';
    errorMessage = '';
    passwordType = 'password';
    togglePasswordClass = 'bi-eye-slash';

    private isValidEmailFormat(email: string): boolean {
        // Regular expression for basic email validation
        const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return EMAIL_REGEX.test(email);
    }

    public login(): void {
        const LOGIN_BODY = {
            "email": this.email,
            "userpassword": this.password
        }

        if (this.email == '' || this.password == '') {
            // alert('Please enter valid details');
            this.errorMessage = 'Please enter valid details';
            return;
        }

        if (!this.isValidEmailFormat(this.email)) {
            // alert('Enter a valid email');
            this.errorMessage = 'Enter a valid email';
            return;
        }

        // if (this.password.length < 8) {
        //     alert('Enter a valid password');
        //     this.errorMessage  = 'Enter a valid password';
        //     return;
        // }
        console.log('Username: ' + this.email);
        console.log('Password: ' + this.password);
        
        this.login_signup_service.checkLoginDetails(LOGIN_BODY).subscribe({
            next: (response) => {
                console.log('Response: ', response);
                console.log('Status: Success');
                swal('Successfully Logged In', ' ', 'success');
                this.router.navigate(['/user/home']);
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                if (e.status == 200) {
                    console.log('Status: Correct details');
                    return;
                }
                if (e.status == 401) {
                    console.log('Status: Invalid credentials');
                    this.errorMessage  = 'Invalid credentials';
                    return;
                }
                if (e.status == 500) {
                    console.log('Status: Cannot check data, server error');
                    this.errorMessage  = 'Cannot check data, server error';
                    return;
                }
                console.log('Error: ', e.status, e.error);
            },
        });
        // window.location.href = 'dashboard.html';
  }

    // Function to toggle password visibility
    public togglePasswordVisibility(): void {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
            this.togglePasswordClass = 'bi-eye';
        } else {
            this.passwordType = 'password';
            this.togglePasswordClass = 'bi-eye-slash';
        }
    }
}
