import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataService } from '../service/data.service';

interface Login {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loginDetails: Login[] = [];

  constructor(private data_service: DataService) {}

  isValidEmailFormat(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
  }

  login() {
    let loginBody = {
      "email": this.email,
      "emp_password": this.password
    }

    // TypeScript code
    if (this.email == '' || this.password == '') {
      // alert('Please enter valid details');
      this.errorMessage = 'Please enter valid details';
      return;
    }

    if (this.isValidEmailFormat(this.email) == false) {
      // alert('Enter a valid email');
      this.errorMessage = 'Enter a valid email';
      return;
    }

    // if (password.length < 8) {
    //   alert('Enter a valid password');
    //   this.errorMessage  = 'Enter a valid password';
    //   return;
    // }

    // Example: Just log the values to console
    console.log('Username: ' + this.email);
    console.log('Password: ' + this.password);
    
    // You can perform further validation or processing here
    this.data_service.checkLoginDetails(loginBody).subscribe({
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

    // Example: Redirect to another page after successful login
    // window.location.href = 'dashboard.html';
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const icon = document.getElementById('togglePasswordButton') as HTMLElement;

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
}
