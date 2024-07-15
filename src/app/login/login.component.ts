import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import { Login } from './Login';
import { LoginSignUpService } from '../service/login_signup/login_signup.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class LoginComponent {

    constructor( private _loginSignUpService: LoginSignUpService, 
                private _router: Router) {
                    this.loginData = new Login();
                }

    loginData: Login;
    errorMessage = '';
    passwordType = 'password';
    togglePasswordClass = 'bi-eye-slash';

    // Regular expression for basic email validation
    private isValidEmailFormat(email: string): boolean {
        const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return EMAIL_REGEX.test(email);
    }

    private checkLoginErrors(): boolean {
        if (this.loginData.email === '' || this.loginData.userpassword === '') {
            this.errorMessage = 'Please enter all details';
            return false;
        }
        if (!this.isValidEmailFormat(this.loginData.email)) {
            this.errorMessage = 'Enter a valid email (example@domain.com)';
            return false;
        }
        if (this.loginData.userpassword.length < 8) {
            this.errorMessage  = 'Enter a valid password (more than 8 characters)';
            return false;
        }
        return true;
    }

    private loginService(): void {
        const LOGIN_BODY = {
            "email": this.loginData.email,
            "userPassword": this.loginData.userpassword
        }

        this._loginSignUpService.checkLoginDetails(LOGIN_BODY).subscribe({
            next: (response) => {
                console.log('Response: ', response);
                swal('Successfully Logged In', ' ', 'success');
                this._router.navigate(['/user/home']);
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                console.log('Error: ', e.status, e.error);
                if (e.status === 401) {
                    // console.log('Status: Invalid credentials');
                    this.errorMessage  = 'Invalid credentials';
                    return;
                }
                if (e.status === 404) {
                    this._router.navigate(['error']);
                }
                if (e.status === 500) {
                    // console.log('Status: Cannot check data, server error OR Invalid credentials');
                    this.errorMessage  = 'Invalid credentials OR Server error';
                    return;
                }
            },
        });
    }

    public login(): void {
        if (!this.checkLoginErrors()) {
            return;
        }
        
        this.loginService();
    }

    // Function to toggle password visibility
    public togglePasswordVisibility(): void {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
            this.togglePasswordClass = 'bi-eye';
        } 
        else {
            this.passwordType = 'password';
            this.togglePasswordClass = 'bi-eye-slash';
        }
    }
}
