import {
    AccountBalance as BillingIcon,
    CheckCircle as CheckIcon,
    DirectionsBus as BusIcon,
    Download as DownloadIcon,
    Error as ErrorIcon,
    Payment as PaymentIcon,
    Person as PersonIcon,
    Refresh as RefreshIcon,
    Schedule as ScheduleIcon,
    Visibility as ViewIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BillingOverview as BillingOverviewType } from '../../../../types/billing.types';
import type { Student } from '../../../../types/student.types';

interface BillingOverviewProps {
    selectedStudent: Student | null;
    className?: string;
}

// Mock billing data
const mockBillingData: BillingOverviewType = {
    studentId: 'student1',
    totalBalance: 15500.0,
    overallStatus: 'partial',
    tuitionFees: {
        id: 'tuition_2024_term1',
        term: 'Term 1',
        academicYear: '2024-2025',
        totalAmount: 12000.0,
        paidAmount: 8000.0,
        remainingAmount: 4000.0,
        dueDate: '2025-02-15T23:59:59Z',
        status: 'partial',
        installments: [
            {
                id: 'inst_1',
                installmentNumber: 1,
                amount: 4000.0,
                dueDate: '2024-09-15T23:59:59Z',
                paidDate: '2024-09-10T10:30:00Z',
                status: 'paid',
                paymentMethod: 'bank_transfer',
                referenceNumber: 'TXN123456789',
            },
            {
                id: 'inst_2',
                installmentNumber: 2,
                amount: 4000.0,
                dueDate: '2024-12-15T23:59:59Z',
                paidDate: '2024-12-14T14:20:00Z',
                status: 'paid',
                paymentMethod: 'bank_transfer',
                referenceNumber: 'TXN987654321',
            },
            {
                id: 'inst_3',
                installmentNumber: 3,
                amount: 4000.0,
                dueDate: '2025-02-15T23:59:59Z',
                status: 'pending',
            },
        ],
    },
    transportationFees: {
        id: 'transport_2024',
        routeName: 'Route A - Central District',
        pickupLocation: '123 Main Street',
        dropoffLocation: 'Excellence Academy',
        monthlyRate: 150.0,
        totalAmount: 1500.0,
        paidAmount: 750.0,
        remainingAmount: 750.0,
        dueDate: '2025-01-31T23:59:59Z',
        status: 'partial',
        isActive: true,
    },
    uniformFees: {
        id: 'uniform_2024',
        items: [
            {
                id: 'uni_1',
                name: 'Sports Jersey',
                type: 'sports_attire',
                quantity: 2,
                unitPrice: 45.0,
                totalPrice: 90.0,
                size: 'M',
                description: 'Blue and white sports jersey',
            },
            {
                id: 'uni_2',
                name: 'PE Shorts',
                type: 'sports_attire',
                quantity: 2,
                unitPrice: 25.0,
                totalPrice: 50.0,
                size: 'M',
                description: 'Navy blue PE shorts',
            },
            {
                id: 'uni_3',
                name: 'Science Textbook',
                type: 'books',
                quantity: 1,
                unitPrice: 85.0,
                totalPrice: 85.0,
                description: 'Grade 10 Physics Textbook',
            },
        ],
        totalAmount: 225.0,
        paidAmount: 225.0,
        remainingAmount: 0.0,
        status: 'paid',
        lastOrderDate: '2024-08-20T00:00:00Z',
    },
    miscellaneousFees: [
        {
            id: 'misc_1',
            name: 'Science Lab Equipment',
            description: 'Chemistry lab materials and equipment usage fee',
            category: 'equipment',
            amount: 75.0,
            paidAmount: 0.0,
            remainingAmount: 75.0,
            dueDate: '2025-01-30T23:59:59Z',
            status: 'pending',
            isOptional: false,
        },
    ],
    paymentHistory: [
        {
            id: 'pay_1',
            amount: 4000.0,
            paymentDate: '2024-12-14T14:20:00Z',
            paymentMethod: 'bank_transfer',
            referenceNumber: 'TXN987654321',
            feeCategory: 'tuition',
            feeItemId: 'inst_2',
            description: 'Tuition Fee - Term 1, Installment 2',
            status: 'completed',
        },
        {
            id: 'pay_2',
            amount: 225.0,
            paymentDate: '2024-08-25T11:15:00Z',
            paymentMethod: 'card',
            referenceNumber: 'TXN555444333',
            feeCategory: 'uniform',
            feeItemId: 'uniform_2024',
            description: 'Sports Attire and Textbooks',
            status: 'completed',
        },
        {
            id: 'pay_3',
            amount: 750.0,
            paymentDate: '2024-09-01T09:30:00Z',
            paymentMethod: 'bank_transfer',
            referenceNumber: 'TXN111222333',
            feeCategory: 'transportation',
            feeItemId: 'transport_2024',
            description: 'Transportation Fee - Sep-Dec 2024',
            status: 'completed',
        },
    ],
    upcomingDueDates: [
        {
            id: 'due_1',
            feeType: 'tuition',
            feeItemId: 'inst_3',
            description: 'Tuition Fee - Term 1, Installment 3',
            amount: 4000.0,
            dueDate: '2025-02-15T23:59:59Z',
            priority: 'high',
            daysUntilDue: 22,
            isOverdue: false,
        },
        {
            id: 'due_2',
            feeType: 'transportation',
            feeItemId: 'transport_2024',
            description: 'Transportation Fee - Jan-Apr 2025',
            amount: 750.0,
            dueDate: '2025-01-31T23:59:59Z',
            priority: 'medium',
            daysUntilDue: 7,
            isOverdue: false,
        },
        {
            id: 'due_3',
            feeType: 'miscellaneous',
            feeItemId: 'misc_1',
            description: 'Science Lab Equipment Fee',
            amount: 75.0,
            dueDate: '2025-01-30T23:59:59Z',
            priority: 'low',
            daysUntilDue: 6,
            isOverdue: false,
        },
    ],
    lastUpdated: '2025-01-24T15:30:00Z',
};

export const BillingOverview: React.FC<BillingOverviewProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [billingData, setBillingData] = useState<BillingOverviewType | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (selectedStudent) {
            setIsLoading(true);
            const timeoutId = setTimeout(() => {
                setBillingData(mockBillingData);
                setIsLoading(false);
            }, 600);
            return () => clearTimeout(timeoutId);
        } else {
            setBillingData(null);
        }
    }, [selectedStudent]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (amount: number) => {
        return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    };


    // Helper functions to categorize billing data
    const getOverduePayments = () => {
        if (!billingData) return [];
        return billingData.upcomingDueDates.filter(payment => payment.isOverdue);
    };

    const getDueSoonPayments = () => {
        if (!billingData) return [];
        return billingData.upcomingDueDates.filter(
            payment => !payment.isOverdue && payment.daysUntilDue <= 14
        );
    };

    const getRecentPayments = () => {
        if (!billingData) return [];
        return billingData.paymentHistory.slice(0, 5);
    };

    const getFuturePayments = () => {
        if (!billingData) return [];
        return billingData.upcomingDueDates.filter(
            payment => !payment.isOverdue && payment.daysUntilDue > 14
        );
    };

    const calculateTotals = () => {
        if (!billingData) return { paid: 0, outstanding: 0, overdue: 0, total: 0 };

        const paid = billingData.tuitionFees.paidAmount +
            (billingData.transportationFees?.paidAmount || 0) +
            billingData.uniformFees.paidAmount;

        const outstanding = billingData.tuitionFees.remainingAmount +
            (billingData.transportationFees?.remainingAmount || 0) +
            billingData.uniformFees.remainingAmount +
            billingData.miscellaneousFees.reduce((sum, fee) => sum + fee.remainingAmount, 0);

        const overdue = getOverduePayments().reduce((sum, payment) => sum + payment.amount, 0);

        return {
            paid,
            outstanding,
            overdue,
            total: paid + outstanding
        };
    };

    if (!selectedStudent) {
        return (
            <Box
                className={className}
                sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <PersonIcon sx={{ fontSize: 32, color: 'text.disabled', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    Select a student to view billing information
                </Typography>
            </Box>
        );
    }

    if (isLoading || !billingData) {
        return (
            <Box
                className={className}
                sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <LinearProgress sx={{ mb: 1.5, width: '160px', mx: 'auto' }} />
                <Typography variant="caption" color="text.secondary">
                    Loading billing data...
                </Typography>
            </Box>
        );
    }

    const totals = calculateTotals();
    const overduePayments = getOverduePayments();
    const dueSoonPayments = getDueSoonPayments();
    const recentPayments = getRecentPayments();
    const futurePayments = getFuturePayments();

    return (
        <Box className={className}>
            {/* Header - Billing At a Glance */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    py: 1.5,
                    px: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <BillingIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                            {selectedStudent.fullName}'s Billing Status
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {overduePayments.length > 0 ? (
                                <span style={{ color: theme.palette.error.main }}>
                                    {overduePayments.length} overdue •
                                </span>
                            ) : null}
                            {dueSoonPayments.length} due soon • {formatCurrency(totals.outstanding)} remaining
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem' }}>
                        Updated {formatDate(billingData.lastUpdated)}
                    </Typography>
                    <IconButton size="small" sx={{ p: 0.5 }}>
                        <RefreshIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Key Metrics - 4 Critical Areas */}
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
                {/* Overdue Payments */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: overduePayments.length > 0 ? 'error.50' : 'background.paper',
                            borderRadius: 1,
                            border: 1,
                            borderColor: overduePayments.length > 0 ? 'error.main' : 'grey.200',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                            <ErrorIcon sx={{ fontSize: 14, color: 'error.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem' }}>
                                OVERDUE
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'error.main' }}>
                            {overduePayments.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                            {formatCurrency(overduePayments.reduce((sum, p) => sum + p.amount, 0))}
                        </Typography>
                    </Box>
                </Grid>

                {/* Due Soon Payments */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: dueSoonPayments.length > 0 ? 'warning.50' : 'background.paper',
                            borderRadius: 1,
                            border: 1,
                            borderColor: dueSoonPayments.length > 0 ? 'warning.main' : 'grey.200',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                            <WarningIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem' }}>
                                DUE SOON
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                            {dueSoonPayments.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                            {formatCurrency(dueSoonPayments.reduce((sum, p) => sum + p.amount, 0))}
                        </Typography>
                    </Box>
                </Grid>

                {/* Paid On Time */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            border: 1,
                            borderColor: 'grey.200',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                            <CheckIcon sx={{ fontSize: 14, color: 'success.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem' }}>
                                PAID
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                            {formatCurrency(totals.paid)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                            {recentPayments.length} transactions
                        </Typography>
                    </Box>
                </Grid>

                {/* Total Outstanding */}
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'primary.50',
                            borderRadius: 1,
                            border: 1,
                            borderColor: 'primary.main',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                            <PaymentIcon sx={{ fontSize: 14, color: 'primary.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem' }}>
                                TOTAL
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {formatCurrency(totals.outstanding)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                            outstanding
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Status-Based Payment Organization */}
            <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'grey.200', mb: 2 }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                            fontSize: '0.75rem',
                            minHeight: 40,
                            textTransform: 'none',
                        },
                    }}
                >
                    <Tab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ErrorIcon sx={{ fontSize: 14 }} />
                                Overdue ({overduePayments.length})
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ScheduleIcon sx={{ fontSize: 14 }} />
                                Due Soon ({dueSoonPayments.length})
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CheckIcon sx={{ fontSize: 14 }} />
                                Paid ({recentPayments.length})
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ViewIcon sx={{ fontSize: 14 }} />
                                All Fees
                            </Box>
                        }
                    />
                </Tabs>

                <Box sx={{ p: 2 }}>
                    {/* Overdue Tab */}
                    {activeTab === 0 && (
                        <Box>
                            {overduePayments.length > 0 ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {overduePayments.map((payment) => (
                                        <Box
                                            key={payment.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                p: 1.5,
                                                backgroundColor: 'error.50',
                                                borderRadius: 1,
                                                border: 1,
                                                borderColor: 'error.main',
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {payment.description}
                                                </Typography>
                                                <Typography variant="caption" color="error.main">
                                                    Due: {formatDate(payment.dueDate)} ({Math.abs(payment.daysUntilDue)} days overdue)
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'error.main' }}>
                                                    {formatCurrency(payment.amount)}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    sx={{ fontSize: '0.75rem', minHeight: 28 }}
                                                >
                                                    Pay Now
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <CheckIcon sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        No overdue payments. Great job staying on track!
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Due Soon Tab */}
                    {activeTab === 1 && (
                        <Box>
                            {dueSoonPayments.length > 0 ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {dueSoonPayments.map((payment) => (
                                        <Box
                                            key={payment.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                p: 1.5,
                                                backgroundColor: 'warning.50',
                                                borderRadius: 1,
                                                border: 1,
                                                borderColor: 'warning.main',
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {payment.description}
                                                </Typography>
                                                <Typography variant="caption" color="warning.main">
                                                    Due: {formatDate(payment.dueDate)} ({payment.daysUntilDue} days)
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Chip
                                                    label={payment.priority}
                                                    size="small"
                                                    color={payment.priority === 'high' ? 'error' : 'warning'}
                                                    sx={{ fontSize: '0.625rem', height: 18 }}
                                                />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                                                    {formatCurrency(payment.amount)}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    color="warning"
                                                    sx={{ fontSize: '0.75rem', minHeight: 28 }}
                                                >
                                                    Pay Now
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <ScheduleIcon sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        No payments due in the next 14 days.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Paid Tab */}
                    {activeTab === 2 && (
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {recentPayments.map((payment) => (
                                    <Box
                                        key={payment.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 1.5,
                                            backgroundColor: 'grey.50',
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: 'grey.200',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Avatar
                                                sx={{
                                                    backgroundColor: 'success.100',
                                                    color: 'success.main',
                                                    width: 24,
                                                    height: 24,
                                                }}
                                            >
                                                <CheckIcon sx={{ fontSize: 12 }} />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {payment.description}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatDate(payment.paymentDate)} • {payment.paymentMethod.replace('_', ' ').toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                                                {formatCurrency(payment.amount)}
                                            </Typography>
                                            <Button
                                                size="small"
                                                startIcon={<DownloadIcon sx={{ fontSize: 12 }} />}
                                                sx={{ fontSize: '0.625rem', minHeight: 24 }}
                                            >
                                                Receipt
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* All Fees Tab */}
                    {activeTab === 3 && (
                        <Grid container spacing={1.5}>
                            {/* Tuition */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ p: 1.5, backgroundColor: 'primary.50', borderRadius: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <BillingIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            Tuition - {billingData.tuitionFees.term}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">
                                        {formatCurrency(billingData.tuitionFees.paidAmount)} of {formatCurrency(billingData.tuitionFees.totalAmount)} paid
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Remaining: {formatCurrency(billingData.tuitionFees.remainingAmount)}
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Transportation */}
                            {billingData.transportationFees && (
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box sx={{ p: 1.5, backgroundColor: 'info.50', borderRadius: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <BusIcon sx={{ fontSize: 16, color: 'info.main' }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                Transportation
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2">
                                            {billingData.transportationFees.routeName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Remaining: {formatCurrency(billingData.transportationFees.remainingAmount)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}

                            {/* Miscellaneous Fees */}
                            {billingData.miscellaneousFees.map((fee) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={fee.id}>
                                    <Box sx={{ p: 1.5, backgroundColor: 'grey.50', borderRadius: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {fee.name}
                                        </Typography>
                                        <Typography variant="body2">{fee.description}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Amount: {formatCurrency(fee.amount)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>

            {/* Quick Actions */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate('/portal/billing/payments')}
                    sx={{ fontSize: '0.75rem' }}
                >
                    Make Payment
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
                    sx={{ fontSize: '0.75rem' }}
                >
                    Download Statement
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ViewIcon sx={{ fontSize: 14 }} />}
                    onClick={() => navigate('/portal/billing/payments')}
                    sx={{ fontSize: '0.75rem' }}
                >
                    Payment History
                </Button>
            </Box>
        </Box>
    );
};
