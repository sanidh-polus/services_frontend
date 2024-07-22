export class Tickets {
    ticketId: number;
    categoryId: number;
    ticketDescription: string;
    categoryName: string;
    ticketCreatedTime: string;
    assignedTo: string | null; 

    constructor() {
        this.ticketId = 0;
        this.categoryId = 0;
        this.ticketDescription = '';
        this.categoryName = '';
        this.ticketCreatedTime = '';
        this.assignedTo = '';
    }
}
