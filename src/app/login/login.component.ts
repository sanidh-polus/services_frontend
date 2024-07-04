import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isValidEmailFormat(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
  }

  login(email: string, password: string) {
    // TypeScript code
    if (email == '' || password == '') {
      alert('Please enter valid details.');
      return;
    }

    if (this.isValidEmailFormat(email) == false){
      alert("Enter a valid email");
      return;
    }

    if (password.length < 8) {
      alert("Enter a valid password");
      return;
    }

    // Example: Just log the values to console
    console.log('Username: ' + email);
    console.log('Password: ' + password);

    // You can perform further validation or processing here

    // Example: Redirect to another page after successful login
    // window.location.href = 'dashboard.html';
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const icon = document.getElementById(
      'togglePasswordButton'
    ) as HTMLElement;

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
