import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ticket } from './Ticket';

@Injectable({
    providedIn: 'root'
})

export class AdminHomeService {

    constructor(private _http: HttpClient) {}

    getAdminsAssignedTickets(pageDetails: any): Observable<Ticket[]> {
        return this._http.post<Ticket[]>(`/service/admintickets`, pageDetails);
    }

    approveOrRejectTicket(ticketDetails: any): Observable<any> {
        return this._http.post<any>(`/service/updatestatus`, ticketDetails);
    }

    getAdminsOrUsers(roleId: number): Observable<any> {
        return this._http.get<any>(`/service/roles/${roleId}`);
    }

    makeAdmin(adminId: number, userId: number): Observable<any> {
        return this._http.post<any>(`/service/makeadmin/${adminId}/${userId}`, {});
    }

    removeAdmin(adminId: number, userId: number): Observable<any> {
        return this._http.delete<any>(`/service/removeadmin/${adminId}/${userId}`);
    }
}
