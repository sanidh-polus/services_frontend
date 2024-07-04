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
  login(username: string, password: string) {
    // TypeScript code
    if (username=="" || password =="") {
        alert("Please enter valid details.");
        return;
    }
    // Example: Just log the values to console
    console.log('Username: ' + username);
    console.log('Password: ' + password);

    // You can perform further validation or processing here

    // Example: Redirect to another page after successful login
    // window.location.href = 'dashboard.html';
  }
}
