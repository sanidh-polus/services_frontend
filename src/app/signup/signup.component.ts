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
}
