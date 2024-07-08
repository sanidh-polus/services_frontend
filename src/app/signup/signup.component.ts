import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  // Function to toggle password visibility
  togglePasswordVisibility(inputId: string): void {
    const passwordInput = document.getElementById(inputId) as HTMLInputElement;
    const icon = document.getElementById(
      `toggle${inputId.charAt(0).toUpperCase() + inputId.slice(1)}Button`
    ) as HTMLElement;
    // console.log('Button Name:', `toggle${inputId.charAt(0).toUpperCase() + inputId.slice(1)}Button`);

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.classList.remove('bi-eye-slash');
      icon.classList.add('bi-eye');
    } else {
      passwordInput.type = 'password';
      icon.classList.remove('bi-eye');
      icon.classList.add('bi-eye-slash');
    }
  }

  isValidEmailFormat(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
  }

  countDigitsWithSpaces(inputString: string) {
    // Step 1: Remove non-digit characters
    const digitsOnly = inputString.replace(/\D/g, '');

    // Step 2: Check length of resulting string
    const digitCount = digitsOnly.length;

    // Return true if exactly 10 digits are found, false otherwise
    return digitCount === 10;
  }

  signup(
    firstName: string,
    lastName: string,
    designation: string,
    email: string,
    phoneNumber: string,
    country: string,
    state: string,
    address: string,
    password: string,
    confirmPassword: string
  ) {
    let errorText = document.getElementById('error-text') as HTMLInputElement;

    // TypeScript code
    if (
      email == '' ||
      password == '' ||
      firstName == '' ||
      lastName == '' ||
      designation == '' ||
      phoneNumber == '' ||
      country == '' ||
      state == '' ||
      address == '' ||
      confirmPassword == ''
    ) {
      // alert('Please enter all details');
      errorText.innerHTML = 'Please enter all details';
      return;
    }

    if (this.isValidEmailFormat(email) == false) {
      // alert('Enter a valid email');
      errorText.innerHTML = 'Enter a valid email';
      return;
    }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (password.length < 8) {
      // alert('Password should contain at least 8 characters');
      errorText.innerHTML = 'Password should contain at least 8 characters';
      return;
    }

    if (password != confirmPassword) {
      // alert('Password do not match');
      errorText.innerHTML = 'Passwords do not match';
      return;
    }

    // Example: Just log the values to console
    console.log('Username: ' + email);
    console.log('Password: ' + password);
    console.log('Confirm Password: ' + confirmPassword);

    // You can perform further validation or processing here

    // Example: Redirect to another page after successful login
    // window.location.href = 'dashboard.html';
  }
}
