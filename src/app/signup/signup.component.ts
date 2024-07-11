import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';

import { LoginSignupService } from '../service/login_signup.service';

@Component({
	selector: 'app-signup',
	standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule, NgFor, NgIf],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
    constructor(private login_signup_service: LoginSignupService) {}

    errorMessage = '';
    firstName = '';
    lastName = '';
    designation = '';
    email = '';
    phoneNumber = '';
    country = '';
    state = '';
    address = '';
    password = '';
    confirmPassword = '';
    passwordType = 'password';
    togglePasswordClass = 'bi-eye-slash';
    confirmPasswordType = 'password';
    toggleConfirmPasswordClass = 'bi-eye-slash';
    countryNames: string[] = [];
    searchText = '';

    ngOnInit(): void {
        this.getAllCountries();
    }

    getAllCountries(): void {
        this.login_signup_service.getCountries().subscribe({
            next: (response) => {
                // console.log('Response: ', response);
                response.forEach((country: any) => {
                // console.log(country.name["common"]);
                this.countryNames.push(country.name["common"]);
                });
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
            },
        });
    }

  /**
   * Description:
   * Trying to filter the countries.
   */
    getFilteredCountryNames(): string[] {
        const FILTER_VALUE = this.searchText.toLowerCase();
        // console.log('Search Text:', this.searchText);
        return this.countryNames.filter((country) =>
        country.toLowerCase().startsWith(FILTER_VALUE)
        ).sort();
    }

    isValidEmailFormat(email: string): boolean {
        // Regular expression for basic email validation
        const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return EMAIL_REGEX.test(email);
    }

    countDigitsWithSpaces(inputString: string) {
        const DIGITS_ONLY = inputString.replace(/\D/g, '');
        const DIGIT_COUNT = DIGITS_ONLY.length;
        return DIGIT_COUNT === 10;
    }

    signup(): void {
        const SIGNUP_BODY = {
            firstname: this.firstName,
            lastname: this.lastName,
            designation: this.designation,
            email: this.email,
            userPassword: this.password,
            country: this.country,
            state: this.state,
            address: this.address,
            phoneNo: this.phoneNumber,
        };

        this.country = this.searchText;

        if (this.email == '' || this.password == '' || this.firstName == '' || this.lastName == '' || 
            this.designation == '' || this.phoneNumber == '' || this.country == '' || this.state == '' ||
            this.address == '' || this.confirmPassword == '') {
            // alert('Please enter all details');
            this.errorMessage = 'Please enter all details';
            return;
        }

        if (this.isValidEmailFormat(this.email) == false) {
            // alert('Enter a valid email');
            this.errorMessage = 'Enter a valid email';
            return;
        }

        // const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (this.password.length < 8) {
            // alert('Password should contain at least 8 characters');
            this.errorMessage = 'Password should contain at least 8 characters';
            return;
        }

        if (this.password != this.confirmPassword) {
            // alert('Password do not match');
            this.errorMessage = 'Passwords do not match';
            return;
        }

        console.log('Username: ' + this.email);
        // console.log('Password: ' + this.password);
        // console.log('Confirm Password: ' + this.confirmPassword);
        console.log('Country: ', this.country);

        this.login_signup_service.enterSignupDetails(SIGNUP_BODY).subscribe({
            next: (response) => {
                console.log('Response: ', response);
                console.log('Status: Success');
                swal('Successfully Signed Up', ' ', 'success');
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                if (e.status == 401) {
                    console.log('Status: Error signing up');
                    this.errorMessage = 'Error signing up';
                    return;
                }
                if (e.status == 500) {
                    console.log('Status: Cannot check data, server error');
                    this.errorMessage = 'Cannot check data, server error';
                    return;
                }
                console.log('Error: ', e.status, e.error);
            },
        });
        // window.location.href = 'dashboard.html';
    }

    // Function to toggle password visibility
    public togglePasswordVisibility(field: string): void {
        if (field === 'password') {
            this.passwordType =
                this.passwordType === 'password' ? 'text' : 'password';
            this.togglePasswordClass =
                this.passwordType === 'password' ? 'bi-eye-slash' : 'bi-eye';
            } 
        else if (field === 'confirmPassword') {
            this.confirmPasswordType =
                this.confirmPasswordType === 'password' ? 'text' : 'password';
            this.toggleConfirmPasswordClass =
                this.confirmPasswordType === 'password' ? 'bi-eye-slash' : 'bi-eye';
        }
    }
}
