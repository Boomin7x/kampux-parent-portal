export interface BillingOverview {
    studentId: string;
    totalBalance: number;
    overallStatus: 'paid' | 'partial' | 'overdue' | 'pending';
    tuitionFees: TuitionFees;
    transportationFees: TransportationFees | null;
    uniformFees: UniformFees;
    miscellaneousFees: MiscellaneousFees[];
    paymentHistory: PaymentRecord[];
    upcomingDueDates: UpcomingPayment[];
    lastUpdated: string;
}

export interface TuitionFees {
    id: string;
    term: string;
    academicYear: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    dueDate: string;
    status: 'paid' | 'partial' | 'overdue' | 'pending';
    installments: FeeInstallment[];
}

export interface TransportationFees {
    id: string;
    routeName: string;
    pickupLocation: string;
    dropoffLocation: string;
    monthlyRate: number;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    dueDate: string;
    status: 'paid' | 'partial' | 'overdue' | 'pending';
    isActive: boolean;
}

export interface UniformFees {
    id: string;
    items: UniformItem[];
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    status: 'paid' | 'partial' | 'overdue' | 'pending';
    lastOrderDate?: string;
}

export interface UniformItem {
    id: string;
    name: string;
    type: 'sports_attire' | 'school_uniform' | 'accessories' | 'books';
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    size?: string;
    description?: string;
}

export interface MiscellaneousFees {
    id: string;
    name: string;
    description: string;
    category: 'activity' | 'event' | 'equipment' | 'service' | 'other';
    amount: number;
    paidAmount: number;
    remainingAmount: number;
    dueDate: string;
    status: 'paid' | 'partial' | 'overdue' | 'pending';
    isOptional: boolean;
}

export interface FeeInstallment {
    id: string;
    installmentNumber: number;
    amount: number;
    dueDate: string;
    paidDate?: string;
    status: 'paid' | 'overdue' | 'pending';
    paymentMethod?: string;
    referenceNumber?: string;
}

export interface PaymentRecord {
    id: string;
    amount: number;
    paymentDate: string;
    paymentMethod: 'bank_transfer' | 'cash' | 'check' | 'card' | 'mobile_money';
    referenceNumber: string;
    feeCategory: 'tuition' | 'transportation' | 'uniform' | 'miscellaneous';
    feeItemId: string;
    description: string;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
    receiptUrl?: string;
}

export interface UpcomingPayment {
    id: string;
    feeType: 'tuition' | 'transportation' | 'uniform' | 'miscellaneous';
    feeItemId: string;
    description: string;
    amount: number;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    daysUntilDue: number;
    isOverdue: boolean;
}

export interface PaymentSummary {
    totalPaid: number;
    totalPending: number;
    totalOverdue: number;
    nextPaymentDue: UpcomingPayment | null;
    paymentMethods: {
        bankTransfer: number;
        cash: number;
        check: number;
        card: number;
        mobileMoney: number;
    };
}