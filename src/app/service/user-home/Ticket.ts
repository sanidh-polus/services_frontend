export interface Ticket {
    ticketId: number;
    categoryId: number;
    ticketDescription: string;
    categoryName: string;
    ticketCreatedTime: string;
    assignedTo: string | null; 
}