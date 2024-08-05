export class AdminTickets {
    ticketId: number;
    categoryId: number | undefined;
    fullName: string;
    ticketDescription: string;
    categoryName: string;
    ticketCreatedTime: string;
    assignedTo: Admin | null;
    ticketComments: Comment[] | null;
    ticketUpdatedAt: string;

    constructor() {
        this.ticketId = 0;
        this.categoryId = 0;
        this.fullName = '';
        this.ticketDescription = '';
        this.categoryName = '';
        this.ticketCreatedTime = '';
        this.assignedTo = null;
        this.ticketComments = [];
        this.ticketUpdatedAt = '';
    }
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
