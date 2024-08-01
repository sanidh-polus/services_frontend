import { TestBed } from '@angular/core/testing';

import { TicketCountService } from './ticket-count.service'

describe('TicketCountService', () => {
    let service: TicketCountService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(TicketCountService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
  