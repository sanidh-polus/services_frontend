import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';

import { LoginSignupService } from '../service/login_signup.service';
import { Country } from './Country';
import { Errors } from './Errors';

@Component({
	selector: 'app-signup',
	standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule, NgFor, NgIf],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
    constructor(private LOGIN_SIGNUP_SERVICE: LoginSignupService, private ROUTER: Router) {}

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
    countries: Country[] = [];
    country_code = '';
    errors: Errors[] = [];

    ngOnInit(): void {
        this.getAllCountries();
    }

    public getAllCountries(): void {
        this.LOGIN_SIGNUP_SERVICE.getCountries().subscribe({
            next: (response) => {
                // console.log('Response: ', response);
                response.forEach((country: any) => {
                    // console.log(country.name["common"]);
                    this.countryNames.push(country.countryName);
                    this.countries.push({
                        countryName: country.countryName, 
                        countryCode: country.countryCode
                    })
                });
                // console.log(this.countries);
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
    public getFilteredCountryNames(): string[] {
        const FILTER_VALUE = this.searchText.toLowerCase();
        // console.log('Search Text:', this.searchText);
        return this.countryNames.filter((country) =>
            country.toLowerCase().startsWith(FILTER_VALUE)
        ).sort();
    }

    // Regular expression for basic email validation
    private isValidEmailFormat(email: string): boolean {
        const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return EMAIL_REGEX.test(email);
    }

    private countDigitsWithSpaces(inputString: string) {
        const DIGITS_ONLY = inputString.replace(/\D/g, '');
        const DIGIT_COUNT = DIGITS_ONLY.length;
        return DIGIT_COUNT === 10;
    }

    public findError(inputField: string) {
        // console.log(this.errors);
        return this.errors.find(error => error.field === inputField)?.message;
    }

    public signup(): void {
        this.errorMessage = '';
        
        this.errors = [];

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
        // console.log('Country Details: ', this.countries.find(i => i.countryName === this.country));

   
        if (this.email === '') {
            this.errors.push({ field: 'email', message: 'Please enter email' });
        } else if (!this.isValidEmailFormat(this.email)) {
            this.errors.push({ field: 'email', message: 'Please enter a valid email (example@domain.com)' });
        } else {
            this.errors.push({ field: 'email', message: '' });
        }
        if (this.firstName === '') {
            this.errors.push({ field: 'firstName', message: 'Please enter first name' });
        } else {
            this.errors.push({ field: 'firstName', message: '' });
        }
        if (this.lastName === '') {
            this.errors.push({ field: 'lastName', message: 'Please enter last name' });
        } else {
            this.errors.push({ field: 'lastName', message: '' });
        }
        if (this.designation === '') {
            this.errors.push({ field: 'designation', message: 'Please enter designation' });
        } else {
            this.errors.push({ field: 'designation', message: '' });
        }
        if (this.password === '') {
            this.errors.push({ field: 'password', message: 'Please enter password' });
        } else if (this.password.length < 8) {
            this.errors.push({ field: 'password', message: 'Password should contain at least 8 characters' });
        } else {
            this.errors.push({ field: 'password', message: '' });
        }
        if (this.country === '') {
            this.errors.push({ field: 'country', message: 'Please enter country' });
        } else {
            this.errors.push({ field: 'country', message: '' });
        }
        if (this.state === '') {
            this.errors.push({ field: 'state', message: 'Please enter state' });
        } else {
            this.errors.push({ field: 'state', message: '' });
        }
        if (this.address === '') {
            this.errors.push({ field: 'address', message: 'Please enter address' });
        } else {
            this.errors.push({ field: 'address', message: '' });
        }
        if (this.phoneNumber === '') {
            this.errors.push({ field: 'phoneNumber', message: 'Please enter phone number' });
        } else if (!this.countDigitsWithSpaces(this.phoneNumber)) {
            this.errors.push({ field: 'phoneNumber', message: 'Enter a valid phone number (10 digits)' });
        } else {
            this.errors.push({ field: 'phoneNumber', message: '' });
        }
        if (this.confirmPassword === '') {
            this.errors.push({ field: 'confirmPassword', message: 'Please enter password confirmation' });
        } else {
            this.errors.push({ field: 'confirmPassword', message: '' });
        }

        // const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (this.password != this.confirmPassword) {
            this.errorMessage = 'Passwords do not match';
            return;
        }

        if (this.countries.length !== 0) {
             console.log(this.countries);
            this.country_code = this.countries.find(i => i.countryName === this.country)!.countryCode;
        }
        // console.log('Password: ' + this.password);
        // console.log('Confirm Password: ' + this.confirmPassword);
        // console.log('Username: ' + this.email);
        console.log('Country: ', this.country);
        console.log('Country Code: ', this.country_code);

        this.LOGIN_SIGNUP_SERVICE.enterSignupDetails(SIGNUP_BODY).subscribe({
            next: (response) => {
                console.log('Response: ', response);
                console.log('Status: Success');
                swal('Successfully Signed Up', ' ', 'success');
                this.ROUTER.navigate(['login']);
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                if (e.status == 400) {
                    console.log('Status: Duplicate entry');
                    this.errorMessage = 'Check email, duplicate entry';
                }
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
