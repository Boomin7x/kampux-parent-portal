export interface IBilling {
    id: number;
    studentId: string;
    amount: number;
    dueDate: string; // ISO date string
    status: 'paid' | 'pending' | 'overdue';
    description: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface IBillingSearch {
    studentId?: string;
    status?: 'paid' | 'pending' | 'overdue';
    startDate?: string; // ISO date string
    endDate?: string; // ISO date string
}
