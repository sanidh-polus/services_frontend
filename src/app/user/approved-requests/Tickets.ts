export interface Tickets {
    ticketId: number;
    categoryId: number;
    ticketDescription: string;
    categoryName: string;
    ticketCreatedTime: string;
    assignedTo: Admin | null;
    ticketUpdatedAt: string;
}

interface Admin {
    designation: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
}
