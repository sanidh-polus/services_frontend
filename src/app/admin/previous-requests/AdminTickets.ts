export interface AdminTickets {
    ticketId: number;
    categoryId: number;
    fullName: string;
    ticketDescription: string;
    categoryName: string;
    ticketCreatedTime: string;
    assignedTo: Admin | null;
    ticketComments: Comment[] | null;
    ticketUpdatedAt: string;
}

interface Admin {
    designation: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
}

interface Comment {
    commentId: number;
    ticketId: number;
    comments: string;
    commentedBy: string;
    commentedAt: string;
}
