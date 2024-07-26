/* eslint-disable no-useless-catch */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import { UserHomeService } from '../user-home/user-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSignUpService } from '../login_signup/login_signup.service';
import { TicketsCount } from './TicketsCount';

@Injectable({
    providedIn: 'root'
})

export class TicketCountService {

    private userId = 0;
    private inProgressTicketsCountSubject = new BehaviorSubject<number>(0);
    private assignedTicketsCountSubject = new BehaviorSubject<number>(0);
    private approvedTicketsCountSubject = new BehaviorSubject<number>(0);
    private rejectedTicketsCountSubject = new BehaviorSubject<number>(0);

    constructor( private _userHomeService: UserHomeService,
                 private _loginSignUpService: LoginSignUpService ) {
                    this.userId = this._loginSignUpService.getCurrentUser().personid;
                    this.fetchTicketCounts(); 
                }

    public async fetchTicketCounts(): Promise<void> {
        try {
            const TICKETS_COUNT = await this.getTicketCount(this.userId);
            
            this.inProgressTicketsCountSubject.next(TICKETS_COUNT.inProgressCount);
            this.assignedTicketsCountSubject.next(TICKETS_COUNT.assignedCount);
            this.approvedTicketsCountSubject.next(TICKETS_COUNT.approvedCount);
            this.rejectedTicketsCountSubject.next(TICKETS_COUNT.rejectedCount);
        } catch (error) {
            console.error('Error fetching ticket counts: ', error);
        }
    }

    public async getTicketCount(userId: number): Promise<TicketsCount> {
        try {
            return await new Promise((resolve, reject) => {
                this._userHomeService.getTicketCount(userId).subscribe({
                    next: (response: any) => {
                        resolve(response);
                    },
                    error: (e: HttpErrorResponse) => {
                        reject(e);
                    },
                });
            });
        } catch (error) {
            throw error;
        }
    }

    getInProgressTicketsCount(): Observable<number> {
        return this.inProgressTicketsCountSubject.asObservable();
    }
    
    getAssignedTicketsCount(): Observable<number> {
        return this.assignedTicketsCountSubject.asObservable();
    }

    getApprovedTicketsCount(): Observable<number> {
        return this.approvedTicketsCountSubject.asObservable();
    }

    getRejectedTicketsCount(): Observable<number> {
        return this.rejectedTicketsCountSubject.asObservable();
    }
}
