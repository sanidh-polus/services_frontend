import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import { LoginSignUpService } from '../../service/login-signup/login-signup.service';
import { AdminHomeService } from '../../service/admin-home/admin-home.service';
import { TicketCountService } from '../../service/ticket-count/ticket-count.service';
import { AdminTickets } from './AdminTickets';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.css'
})

export class AdminHomeComponent implements OnInit {

    userId = 0;
    pageNo = 0;
    size = 20;
    tickets: AdminTickets[] = [];
    comments = '';
    currentTicketId = 0;
    assignedToMeCount = 0;
    isEmpty = false;

    constructor(private _loginSignUpService: LoginSignUpService,
                private _adminHomeService: AdminHomeService,
                private _ticketCountService: TicketCountService) {}

    ngOnInit(): void {
        const CURRENT_USER = this._loginSignUpService.getCurrentUser();
        if (CURRENT_USER) {
            this.userId = CURRENT_USER.personid;
        }
        this.getAdminsAssignedRequests(this.pageNo, this.size);
        this._ticketCountService.fetchTicketCounts();
        this.getAssignedCount();
    }

    public getAssignedCount(): void {
        this._ticketCountService.getAssignedToMeTicketsCount().subscribe(count => this.assignedToMeCount = count);
    }

    public getAdminsAssignedRequests( pageNo: number, size: number ): void {
        const TICKETS_PAYLOAD = {
            "page": pageNo,
            "size": size,
            "assignedTo": this.userId,
            "statusId": 2
        };
        this._adminHomeService.getAdminsAssignedTickets(TICKETS_PAYLOAD).subscribe({
            next: (response) => {
                console.log(response);
                this.tickets = response;
                this.isEmpty = response.length === 0;
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
    
    public handleTicketAction(status: 'approve' | 'reject'): void {
        const STATUS_ID = status === 'approve' ? 3 : 4;
        const CHANGE_STATUS_BODY = {
            "ticketId": this.currentTicketId,
            "assignedTo": this.userId,
            "comments": status === 'reject' ? this.comments : null, 
            "statusId": STATUS_ID
        };
        this._adminHomeService.approveOrRejectTicket(CHANGE_STATUS_BODY).subscribe({
            next: (response) => {
                console.log(response);
                this.tickets = this.tickets.filter(ticket => ticket.ticketId !== this.currentTicketId);
                const MESSAGE = status === 'approve' ? 'Successfully Approved' : 'Successfully Rejected';                
                swal({
                    title: MESSAGE,
                    text: ' ',
                    icon: 'success',
                    buttons: [false],
                    timer: 2000
                });
                if (status === 'reject') {
                    this.comments = '';
                }
                this._ticketCountService.fetchTicketCounts();
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
            },
        });
    }
}
