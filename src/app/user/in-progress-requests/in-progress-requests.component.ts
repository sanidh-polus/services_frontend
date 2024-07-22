import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import swal from 'sweetalert';
import { LoginSignUpService } from '../../service/login-signup/login_signup.service';
import { UserHomeService } from '../../service/user-home/user-home.service';
import { Tickets } from './Tickets';

@Component({
  selector: 'app-in-progress-requests',
  standalone: false,
  templateUrl: './in-progress-requests.component.html',
  styleUrl: './in-progress-requests.component.css'
})
export class InProgressRequestsComponent implements OnInit {

    constructor(private _route: ActivatedRoute,
                private _loginSignupService: LoginSignUpService,
                private _userHomeService: UserHomeService) {}

    firstName = '';
    userId = 0;
    tickets: Tickets[] = [];
    page = 0;
    ticketsPerPage = 10;
    editTicketDetails: Tickets = new Tickets();
    categoryNames: string[] = [];
    // categoryNames: string[] = [ "System Repairs", "Security", "Internet problems", "Installation", "Leave Request", "Safety Issue", "Temperature Control" ];
    categories = new Map<string, number>();

    ngOnInit(): void {
        const CURRENT_USER = this._loginSignupService.getCurrentUser();
        console.log('User: ', CURRENT_USER);
        this.userId = CURRENT_USER.personid;
   
        this.getPendingRequests();
        
        this.getAllCategories();
    }

    private getPendingRequests(): void {
        this._userHomeService.getTickets(this.userId, 1, this.page, this.ticketsPerPage).subscribe({
            next: (response) => {
                console.log(response);
                this.tickets = response;
                // this.tickets.sort((a, b) => new Date(b.ticketCreatedTime).getTime() - new Date(a.ticketCreatedTime).getTime());
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

    public editTicket(ticketDetails: Tickets) {
        console.log();
        this.editTicketDetails = ticketDetails;
    }

    private getAllCategories(): void {
        this._userHomeService.getCategories().subscribe({
            next: (response) => {
                console.log(response);
                response.forEach((category: any) => {
                    this.categories.set(category.categoryName, category.categoryId);
                    this.categoryNames.push(category.categoryName);
                });
                this.categoryNames.sort((a, b) => a.length - b.length);
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
            },
        });
    }
}
