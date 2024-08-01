import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tickets } from './Tickets';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ticket-card.component.html',
    styleUrl: './ticket-card.component.css'
})

export class TicketCardComponent {
    
    @Input() ticket: Tickets = new Tickets();
    @Input() status: string = '';
}
