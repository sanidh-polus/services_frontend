import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataService } from '../service/data.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private data_service: DataService) {}

  errorMessage: string = '';
  firstName: string = '';
  lastName: string = '';
  designation: string = '';
  email: string = '';
  phoneNumber: string = '';
  country: string = '';
  state: string = '';
  address: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordType: string = 'password';
  togglePasswordClass: string = 'bi-eye-slash';
  confirmPasswordType: string = 'password';
  toggleConfirmPasswordClass: string = 'bi-eye-slash';
  countryNames: string[] = [];

  isValidEmailFormat(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
  }

  countDigitsWithSpaces(inputString: string) {
    const digitsOnly = inputString.replace(/\D/g, '');
    const digitCount = digitsOnly.length;
    return digitCount === 10;
  }

  ngOnInit(): void {
    this.data_service
      .getCountries()
      .then((countries) => {
        // console.log("Countries: ", countries);
        // console.log("Country Name: ", countries[0].name["common"]);
        countries.forEach((country, index) => {
          //console.log(`Country ${index+1}: ${country.name["common"]}`);
          this.countryNames.push(country.name["common"]);
        });
        console.log(this.countryNames);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }

  signup(): void {
    let signupBody = {
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

    if (
      this.email == '' ||
      this.password == '' ||
      this.firstName == '' ||
      this.lastName == '' ||
      this.designation == '' ||
      this.phoneNumber == '' ||
      this.country == '' ||
      this.state == '' ||
      this.address == '' ||
      this.confirmPassword == ''
    ) {
      // alert('Please enter all details');
      this.errorMessage = 'Please enter all details';
      return;
    }

    if (this.isValidEmailFormat(this.email) == false) {
      // alert('Enter a valid email');
      this.errorMessage = 'Enter a valid email';
      return;
    }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

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

    // Example: Just log the values to console
    console.log('Username: ' + this.email);
    console.log('Password: ' + this.password);
    console.log('Confirm Password: ' + this.confirmPassword);

    // You can perform further validation or processing here
    this.data_service.enterSignupDetails(signupBody).subscribe({
      next: (response) => {
        console.log('Response: ', response);
        console.log('Status: Success');
      },
      error: (e: any) => {
        console.log(e);
        if (e.status == 200) {
          console.log('Status: Correct details');
          return;
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
    // Example: Redirect to another page after successful login
    // window.location.href = 'dashboard.html';
  }

  // Function to toggle password visibility
  public togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordType =
        this.passwordType === 'password' ? 'text' : 'password';
      this.togglePasswordClass =
        this.passwordType === 'password' ? 'bi-eye-slash' : 'bi-eye';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordType =
        this.confirmPasswordType === 'password' ? 'text' : 'password';
      this.toggleConfirmPasswordClass =
        this.confirmPasswordType === 'password' ? 'bi-eye-slash' : 'bi-eye';
    }
  }
}
