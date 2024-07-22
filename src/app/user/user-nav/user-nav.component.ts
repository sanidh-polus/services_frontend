import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  standalone: false,
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {       
    currentActive = 'home';

    constructor(private _router: Router) {}

    public setActive(link: string): void {
        this.currentActive = link;
    }

    public logout(): void {
        // localStorage.removeItem('currentUser');
        localStorage.setItem('firstTime', 'false');
        this._router.navigate(['login']);
    };
}
