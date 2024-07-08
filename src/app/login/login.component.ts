import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { DataService } from '../service/data.service';

interface Login {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDetails: Login[] = [];

  constructor(private data_service: DataService) {}

  isValidEmailFormat(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
  }

  login(email: string, password: string) {
    let errorText = document.getElementById('error-text') as HTMLInputElement;

    let loginBody = {
      "email": email,
      "emp_password": password
    }

    // TypeScript code
    if (email == '' || password == '') {
      // alert('Please enter valid details');
      errorText.innerHTML = 'Please enter valid details';
      return;
    }

    if (this.isValidEmailFormat(email) == false) {
      // alert('Enter a valid email');
      errorText.innerHTML = 'Enter a valid email';
      return;
    }

    // if (password.length < 8) {
    //   alert('Enter a valid password');
    //   errorText.innerHTML = 'Enter a valid password';
    //   return;
    // }

    // Example: Just log the values to console
    // console.log('Username: ' + email);
    // console.log('Password: ' + password);
    
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
          errorText.innerHTML = 'Invalid credentials';
          return;
        }
        if (e.status == 500) {
          console.log('Status: Cannot check data, server error');
          errorText.innerHTML = 'Cannot check data, server error';
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
