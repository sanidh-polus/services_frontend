export interface AdminTickets {
    ticketId: number;
    categoryId: number;
    fullName: string;
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
