import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Tickets } from './Tickets';
import { UserHomeService } from '../../service/user-home/user-home.service';
import { LoginSignUpService } from '../../service/login-signup/login_signup.service';

@Component({
  selector: 'app-rejected-requests',
  templateUrl: './rejected-requests.component.html',
  styleUrl: './rejected-requests.component.css'
})
export class RejectedRequestsComponent implements OnInit {
    
    constructor(private _loginSignUpService: LoginSignUpService,
                private _userHomeService: UserHomeService) {}

    userId = 0;
    tickets: Tickets[] = [];
    page = 0;
    ticketsPerPage = 10;
    totalTicketCount = 0;
    
    ngOnInit(): void {
        const CURRENT_USER = this._loginSignUpService.getCurrentUser();
        // console.log('User: ', CURRENT_USER);
        this.userId = CURRENT_USER.personid;
        this.getRejectedRequests();

        this.getRejectedTicketsCount().then((response: number) => {
            this.totalTicketCount = response;
        });
    }

    private getRejectedRequests(): void {
    this._userHomeService.getTickets(this.userId, 4, this.page, this.ticketsPerPage).subscribe({
            next: (response) => {
                console.log(response);
                this.tickets = response;
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                // if (e.status == 500) {
                //     swal({
                //         title: "Server down",
                //         text: "Please try again later",
                //         icon: "error"
                //     });
                // }
            },
        });
    }

    private getRejectedTicketsCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            this._userHomeService.getTicketCount(this.userId, 4).subscribe({
                next: (response) => {
                    console.log(response);
                    resolve(response); 
                },
                error: (e: HttpErrorResponse) => {
                    console.log(e);
                    reject(e); 
                },
            });
        });
    }
}
