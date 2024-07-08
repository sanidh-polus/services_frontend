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
      alert('Please enter all details.');
      return;
    }

    if (password.length < 8) {
      alert('Enter a valid password');
      return;
    }

    if (password != confirmPassword) {
      alert("Enter matching passwords");
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
