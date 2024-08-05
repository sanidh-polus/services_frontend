import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LoginSignUpService } from '../../service/login-signup/login-signup.service';
import { TicketCountService } from '../../service/ticket-count/ticket-count.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-admin-nav',
    templateUrl: './admin-nav.component.html',
    styleUrl: './admin-nav.component.css'
})

export class AdminNavComponent implements OnInit {

    @ViewChild('skipLink') skipLink!: ElementRef<HTMLAnchorElement>;

    userId = 0;
    firstName = '';
    lastScrollTop = 0;
    isNavbarHidden = false;
    
    constructor(private _loginSignUpService: LoginSignUpService,
                private _ticketCountService: TicketCountService,
                private _router: Router) {}

    ngOnInit(): void {
        const CURRENT_USER = this._loginSignUpService.getCurrentUser();
        if (CURRENT_USER) {
            this.userId = CURRENT_USER.personid;
            this.firstName = CURRENT_USER.firstName;
        }
        this.getCurrentContent();
    }

    // public async switchToUser(): Promise<void> {
    //     console.log('Switching to user');
    //     await this._ticketCountService.fetchTicketCounts();
    //     this._router.navigate(['user']);
    // }
    
    private getCurrentContent(): void {
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // let currentUrl = event.urlAfterRedirects;
                // console.log('Current URL:', currentUrl);
                this.skipLink.nativeElement.focus();
            }
        });
    }

    public logout(): void {
        this._loginSignUpService.logout();
        localStorage.setItem('firstTime', 'false');
        this._router.navigate(['login']);
    };

    @HostListener('window:scroll', ['$event'])
    public onWindowScroll(): void {
        const SCROLL_TOP = window.scrollY || document.documentElement.scrollTop;
        if (SCROLL_TOP > this.lastScrollTop) {
            this.isNavbarHidden = true;
        } else {
            this.isNavbarHidden = false;
        }
        this.lastScrollTop = SCROLL_TOP <= 0 ? 0 : SCROLL_TOP;
    }
}
