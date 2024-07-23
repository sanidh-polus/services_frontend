import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { LoginSignUpService } from '../../service/login-signup/login_signup.service';
import { UserHomeService } from '../../service/user-home/user-home.service';
import { Tickets } from './Tickets';

@Component({
  selector: 'app-in-progress-requests',
  templateUrl: './in-progress-requests.component.html',
  styleUrl: './in-progress-requests.component.css'
})
export class InProgressRequestsComponent implements OnInit {

    constructor(private _loginSignUpService: LoginSignUpService,
                private _userHomeService: UserHomeService) {}

    firstName = '';
    userId = 0;
    currentPage = 0;
    ticketsPerPage = 4;
    totalTicketCount = 0;
    pages: number[] = [];
    tickets: Tickets[] = [];
    categoryNames: string[] = [];
    // categoryNames: string[] = [ "System Repairs", "Security", "Internet problems", "Installation", "Leave Request", "Safety Issue", "Temperature Control" ];
    categoryMap = new Map<string, number>();
    editTicketDetails: Tickets = new Tickets();
    editError = '';
    selectedAdmin = '';
    adminNames: string[] = [];
    adminMap = new Map<string, number>();
    assignedTicketId = 0;

    ngOnInit(): void {
        const CURRENT_USER = this._loginSignUpService.getCurrentUser();
        // console.log('User: ', CURRENT_USER);
        this.userId = CURRENT_USER.personid;
        this.getPendingRequests(0);
        this.pagination();
        this.getAllCategories();
        this.getAllAdmins();
    }

    public getPendingRequests(pageNumber: number): void {
        this.currentPage = pageNumber;
        this._userHomeService.getTickets(this.userId, 1, pageNumber, this.ticketsPerPage).subscribe({
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

    private getAllCategories(): void {
        this._userHomeService.getCategories().subscribe({
            next: (response) => {
                // console.log(response);
                response.forEach((category: any) => {
                    this.categoryMap.set(category.categoryName, category.categoryId);
                    this.categoryNames.push(category.categoryName);
                });
                this.categoryNames.sort((a, b) => b.length - a.length);
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
            },
        });
    }

    private getAllAdmins(): void {
        this._userHomeService.getAdmins().subscribe({
            next: (response) => {
                // console.log(response);
                response.forEach((admin: any) => {
                    this.adminMap.set(admin.firstName + ' ' + admin.lastName, admin.id);
                    this.adminNames.push(admin.firstName + ' ' + admin.lastName);
                });
                this.adminNames.sort((a, b) => a.length - b.length);
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
            },
        });
    }

    public openEditTicket(ticketDetails: Tickets): void {
        this.editTicketDetails = { ...ticketDetails };
    }

    private editTicketService(): void {
        const EDIT_REQ_BODY = {
            "personId": this.userId,
            "ticketId": this.editTicketDetails.ticketId,
            "categoryId": this.editTicketDetails.categoryId,
            "ticketDescription": this.editTicketDetails.ticketDescription
        }
        this._userHomeService.createRequest(EDIT_REQ_BODY).subscribe({
            next: (response) => {
                console.log('Response: ', response);
                const EDITED_TICKET = this.tickets.find(ticket => ticket.ticketId === this.editTicketDetails.ticketId);
                if (EDITED_TICKET) {
                    EDITED_TICKET.categoryName = this.editTicketDetails.categoryName;
                    EDITED_TICKET.ticketDescription = this.editTicketDetails.ticketDescription;
                }
                swal({
                    title: 'Successfully Edited',
                    text: ' ',
                    icon: 'success',
                    buttons: [false],
                    timer: 2000
                });
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                console.log('Error: ', e.status, e.statusText);
            }
        });
    }

    public editTicket(): void {
        this.editError = '';
        if (this.editTicketDetails.ticketDescription === '') {
            this.editError = 'Please enter a description';
        }
        if (this.editTicketDetails.ticketDescription.length > 255) {
            this.editError = 'Please shorten the description, size is too large';
        }
        console.log(this.editError);
        if (this.editError !== '') {
            return
        }
        this.editTicketDetails.categoryId = this.categoryMap.get(this.editTicketDetails.categoryName);
        this.editTicketService();
    }

    private deleteTicketService(ticketId: number): void {
        this._userHomeService.deleteTicket(ticketId).subscribe({
            next: (response) => {
                console.log('Response: ', response);
                this.tickets = this.tickets.filter(ticket => ticket.ticketId !== ticketId);
                swal({
                    title: 'Successfully Deleted',
                    text: ' ',
                    icon: 'success',
                    buttons: [false],
                    timer: 2000
                });
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                console.log('Error: ', e.status, e.statusText);
            }
        });
    }

    public deleteTicket(ticketId: number): void {
        Swal.fire({
            title: "Confirm",
            text: 'Are you sure you want to delete this ticket?',
            showCancelButton: true,
            cancelButtonColor: '#aaa',
            confirmButtonColor: '#dc3545',
            confirmButtonText: 'Confirm',
            reverseButtons: true 
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteTicketService(ticketId);
            } else {
                console.log('Deletion canceled by user.');
            }
        });
    }

    private assignAdminService(adminId: number | undefined): void {
        const ASSIGN_REQ_BODY = {
            "ticketId": this.assignedTicketId,
            "assignedTo": adminId,
        }
        this._userHomeService.assignAdmin(ASSIGN_REQ_BODY).subscribe({
            next: (response) => {
                console.log('Response: ', response);
                this.tickets = this.tickets.filter(ticket => ticket.ticketId !== this.assignedTicketId);
                swal({
                    title: 'Successfully Assigned',
                    text: ' ',
                    icon: 'success',
                    buttons: [false],
                    timer: 2000
                });
            },
            error: (e: HttpErrorResponse) => {
                console.log(e);
                console.log('Error: ', e.status, e.statusText);
            }
        });
    }

    public assignAdmin(): void {
        const ADMIN_ID = this.adminMap.get(this.selectedAdmin);
        this.assignAdminService(ADMIN_ID);
        this.selectedAdmin = '';
    }

    private pagination(): void {
        this.getPendingTicketsCount().then((response: number) => {
            this.totalTicketCount = response;
            const TOTAL_PAGES = Math.ceil(this.totalTicketCount / this.ticketsPerPage);
            this.pages = Array.from({ length: TOTAL_PAGES }, (_, index) => index);
        }).catch((error) => {
            console.error('Error fetching ticket count:', error);
        });
    }
    

    private getPendingTicketsCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            this._userHomeService.getTicketCount(this.userId, 1).subscribe({
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
