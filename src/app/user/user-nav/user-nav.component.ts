import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignUpService } from '../../service/login-signup/login_signup.service';
import { TicketCountService } from '../../service/ticket-count/ticket-count.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent implements OnInit {       
    
    constructor(private _router: Router,
                private _loginSignUpService: LoginSignUpService,
                private _ticketCountService: TicketCountService) {}

    firstName = '';
    userId = 0;
    lastScrollTop = 0;
    isNavbarHidden = false;
    inProgressTicketsCount = 0;
    assignedTicketsCount = 0;
    approvedTicketsCount = 0;
    rejectedTicketsCount = 0;

    ngOnInit(): void {
        const CURRENT_USER = this._loginSignUpService.getCurrentUser();
        if (CURRENT_USER !== null) {
            this.firstName = CURRENT_USER.firstName;
            this.userId = CURRENT_USER.personid;
        }
        this.fetchTicketCount();
    }

    @HostListener('window:scroll', ['$event'])
    public onWindowScroll(): void {
        const SCROLL_TOP = window.scrollY || document.documentElement.scrollTop;
        if (SCROLL_TOP > this.lastScrollTop) {
            // Scroll down
            this.isNavbarHidden = true;
        } else {
            // Scroll up
            this.isNavbarHidden = false;
        }
        this.lastScrollTop = SCROLL_TOP <= 0 ? 0 : SCROLL_TOP;
    }

    public logout(): void {
        // localStorage.removeItem('currentUser');
        localStorage.setItem('firstTime', 'false');
        this._router.navigate(['login']);
    };

    private fetchTicketCount(): void {
        this._ticketCountService.getTicketCount(this.userId, 1) 
            .then(count => this.inProgressTicketsCount = count)
            .catch(error => console.error('Error fetching pending tickets count:', error));

        this._ticketCountService.getTicketCount(this.userId, 2)
            .then(count => this.assignedTicketsCount = count)
            .catch(error => console.error('Error fetching rejected tickets count:', error));

        this._ticketCountService.getTicketCount(this.userId, 3) 
            .then(count => this.rejectedTicketsCount = count)
            .catch(error => console.error('Error fetching approved tickets count:', error));
    
        this._ticketCountService.getTicketCount(this.userId, 4) 
            .then(count => this.approvedTicketsCount = count)
            .catch(error => console.error('Error fetching completed tickets count:', error));
    }
}
