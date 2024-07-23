import { Injectable } from '@angular/core';
import { UserHomeService } from '../user-home/user-home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketCountService {

constructor(private _userHomeService: UserHomeService) {}

    async getTicketCount(userId: number, statusId: number): Promise<number> {
        try {
            const COUNT = await this.fetchTicketCount(userId, statusId);
            return COUNT;
        } catch (error) {
            console.error(`Error fetching ticket count for status ${statusId}:`, error);
            throw error;
        }
    }

    private fetchTicketCount(userId: number, statusId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this._userHomeService.getTicketCount(userId, statusId).subscribe({
                next: (response: any) => {
                    resolve(response);
                },
                error: (e: HttpErrorResponse) => {
                    reject(e);
                },
            });
        });
    }
}
