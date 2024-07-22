import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceCategory } from './ServiceCategory';
import { NewRequest } from '../../user/user-home/NewRequest';
import { Ticket } from './Ticket';

@Injectable({
  providedIn: 'root'
})
export class UserHomeService {

  constructor(private _http: HttpClient) {}

    getCategories(): Observable<ServiceCategory[]> {
        return this._http.get<ServiceCategory[]>('/service/categories');
    }

    createRequest(requestDetails: NewRequest): Observable<NewRequest> {
        return this._http.post<NewRequest>('/service/new', requestDetails);
    }

    getTickets(id: number, status: number, page: number, offset: number): Observable<Ticket[]> {
        return this._http.get<Ticket[]>(`/service/tickets/${id}/${status}/${page}/${offset}`);
    }
}
