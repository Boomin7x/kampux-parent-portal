import {
    Assignment as AssignmentIcon,
    AccountBalance as BillingIcon,
    DirectionsBus as BusIcon,
    CheckCircle as CheckIcon,
    Download as DownloadIcon,
    Error as ErrorIcon,
    Payment as PaymentIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    School as SchoolIcon,
    Visibility as ViewIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSelectedStudentBillings } from '../../_hooks/useParentWithStore';
import type { Billing, Student } from '../../_service/parentService';

interface BillingOverviewProps {
    selectedStudent: Student | null;
    className?: string;
}

// Helper function to check if payment is overdue
const isPaymentOverdue = (dueDate: string): boolean => {
    return new Date(dueDate) < new Date();
};

// Helper function to calculate days until due
const getDaysUntilDue = (dueDate: string): number => {
    const due = new Date(dueDate);
    const now = new Date();
    return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

// Helper function to get fee category icon
const getFeeIcon = (billing: Billing) => {
    if (billing.isRegistration) return <AssignmentIcon sx={{ fontSize: 16 }} />;
    if (billing.isTransport) return <BusIcon sx={{ fontSize: 16 }} />;
    if (billing.isArticle) return <SchoolIcon sx={{ fontSize: 16 }} />;
    return <BillingIcon sx={{ fontSize: 16 }} />;
};

// Helper function to get fee category name
const getFeeCategoryName = (billing: Billing): string => {
    if (billing.isRegistration) return 'Registration';
    if (billing.isTransport) return 'Transportation';
    if (billing.isArticle) return 'School Supplies';
    if (billing.amountSchoolFees && billing.amountSchoolFees > 0)
        return 'School Fees';
    return 'Other Fees';
};

export const BillingOverview: React.FC<BillingOverviewProps> = ({
    selectedStudent,
    className = '',
}) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    // Fetch billing data using the API hook
    const {
        data: billingData,
        isLoading,
        error: billingError,
    } = useGetSelectedStudentBillings();

    // Calculate billing totals and categorize data
    const { totals, overdue, dueSoon, paid } = useMemo(() => {
        if (!billingData || billingData.length === 0) {
            return {
                totals: { total: 0, paid: 0, outstanding: 0, overdue: 0 },
                overdue: [],
                dueSoon: [],
                paid: [],
            };
        }

        const totals = {
            total: billingData.reduce((sum, item) => sum + item.amount, 0),
            paid: billingData.reduce((sum, item) => sum + item.amountPaid, 0),
            outstanding: billingData.reduce(
                (sum, item) => sum + item.unpaidAmount,
                0
            ),
            overdue: 0,
        };

        const overdue = billingData.filter(
            item =>
                item.unpaidAmount > 0 && isPaymentOverdue(item.billingDueDate)
        );

        const dueSoon = billingData.filter(item => {
            if (item.unpaidAmount <= 0) return false;
            const days = getDaysUntilDue(item.billingDueDate);
            return days > 0 && days <= 14;
        });

        const paid = billingData.filter(item => item.amountPaid > 0);

        totals.overdue = overdue.reduce(
            (sum, item) => sum + item.unpaidAmount,
            0
        );

        return { totals, overdue, dueSoon, paid };
    }, [billingData]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (
        amount: number,
        currency: string = 'XAF',
        locale: string = 'fr-FR'
    ): string => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    // Handle error state
    if (billingError) {
        return (
            <Box
                className={className}
                sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'error.main',
                }}
            >
                <ErrorIcon sx={{ fontSize: 32, color: 'error.main', mb: 1 }} />
                <Typography variant="subtitle2" color="error" sx={{ mb: 0.5 }}>
                    Failed to load billing data
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {billingError.message || 'An unexpected error occurred'}
                </Typography>
            </Box>
        );
    }

    // If no student selected
    if (!selectedStudent) {
        return (
            <Box
                className={className}
                sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <PersonIcon
                    sx={{ fontSize: 32, color: 'text.disabled', mb: 1 }}
                />
                <Typography variant="subtitle2" color="text.secondary">
                    Select a student to view billing information
                </Typography>
            </Box>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <Box
                className={className}
                sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <LinearProgress sx={{ mb: 1, width: '160px', mx: 'auto' }} />
                <Typography variant="caption" color="text.secondary">
                    Loading billing data...
                </Typography>
            </Box>
        );
    }

    // No data state
    if (!billingData || billingData.length === 0) {
        return (
            <Box
                className={className}
                sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'warning.50',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'warning.main',
                }}
            >
                <WarningIcon
                    sx={{ fontSize: 32, color: 'warning.main', mb: 1 }}
                />
                <Typography
                    variant="subtitle2"
                    color="warning.main"
                    sx={{ mb: 0.5 }}
                >
                    No billing data available
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    No billing information found for this student.
                </Typography>
            </Box>
        );
    }

    return (
        <Box className={className}>
            {/* Header - Compact Student Billing Overview */}
            <Box
                sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                    >
                        <BillingIcon
                            sx={{ fontSize: 18, color: 'primary.main' }}
                        />
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, lineHeight: 1.2 }}
                            >
                                {selectedStudent.firstName}{' '}
                                {selectedStudent.lastName}'s Billing
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {selectedStudent.schoolYearClassName} •{' '}
                                {selectedStudent.schoolYearName}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'primary.main',
                                lineHeight: 1.1,
                            }}
                        >
                            {formatCurrency(totals.outstanding)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Outstanding
                        </Typography>
                    </Box>
                </Box>

                {/* Status Chips */}
                {(overdue.length > 0 || dueSoon.length > 0) && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                        {overdue.length > 0 && (
                            <Chip
                                label={`${overdue.length} Overdue`}
                                color="error"
                                size="small"
                                sx={{ fontSize: '0.6875rem', height: 20 }}
                            />
                        )}
                        {dueSoon.length > 0 && (
                            <Chip
                                label={`${dueSoon.length} Due Soon`}
                                color="warning"
                                size="small"
                                sx={{ fontSize: '0.6875rem', height: 20 }}
                            />
                        )}
                    </Box>
                )}
            </Box>

            {/* Compact Metrics Grid */}
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor:
                                overdue.length > 0
                                    ? 'error.50'
                                    : 'background.paper',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor:
                                overdue.length > 0 ? 'error.main' : 'divider',
                            textAlign: 'center',
                        }}
                    >
                        <ErrorIcon
                            sx={{
                                fontSize: 20,
                                color:
                                    overdue.length > 0
                                        ? 'error.main'
                                        : 'text.disabled',
                                mb: 0.5,
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, lineHeight: 1.1 }}
                        >
                            {overdue.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Overdue
                        </Typography>
                        {overdue.length > 0 && (
                            <Typography
                                variant="caption"
                                color="error.main"
                                sx={{ display: 'block', fontWeight: 600 }}
                            >
                                {formatCurrency(
                                    overdue.reduce(
                                        (sum, item) => sum + item.unpaidAmount,
                                        0
                                    )
                                )}
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor:
                                dueSoon.length > 0
                                    ? 'warning.50'
                                    : 'background.paper',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor:
                                dueSoon.length > 0 ? 'warning.main' : 'divider',
                            textAlign: 'center',
                        }}
                    >
                        <ScheduleIcon
                            sx={{
                                fontSize: 20,
                                color:
                                    dueSoon.length > 0
                                        ? 'warning.main'
                                        : 'text.disabled',
                                mb: 0.5,
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, lineHeight: 1.1 }}
                        >
                            {dueSoon.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Due Soon
                        </Typography>
                        {dueSoon.length > 0 && (
                            <Typography
                                variant="caption"
                                color="warning.main"
                                sx={{ display: 'block', fontWeight: 600 }}
                            >
                                {formatCurrency(
                                    dueSoon.reduce(
                                        (sum, item) => sum + item.unpaidAmount,
                                        0
                                    )
                                )}
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'success.50',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'success.main',
                            textAlign: 'center',
                        }}
                    >
                        <CheckIcon
                            sx={{
                                fontSize: 20,
                                color: 'success.main',
                                mb: 0.5,
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                lineHeight: 1.1,
                                color: 'success.main',
                            }}
                        >
                            {formatCurrency(totals.paid)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Paid
                        </Typography>
                    </Box>
                </Grid>

                <Grid size={{ xs: 6, md: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: 'primary.50',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'primary.main',
                            textAlign: 'center',
                        }}
                    >
                        <PaymentIcon
                            sx={{
                                fontSize: 20,
                                color: 'primary.main',
                                mb: 0.5,
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                lineHeight: 1.1,
                                color: 'primary.main',
                            }}
                        >
                            {formatCurrency(totals.total)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Total
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Billing Details - Compact Layout */}
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1.5 }}
                    >
                        Billing Details
                    </Typography>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        sx={{
                            minHeight: 'auto',
                            '& .MuiTab-root': {
                                fontSize: '0.75rem',
                                minHeight: 32,
                                textTransform: 'none',
                                py: 0.5,
                            },
                        }}
                    >
                        <Tab label={`All (${billingData.length})`} />
                        <Tab label={`Overdue (${overdue.length})`} />
                        <Tab label={`Due Soon (${dueSoon.length})`} />
                        <Tab label={`Paid (${paid.length})`} />
                    </Tabs>
                </Box>

                <Divider />

                <Box sx={{ p: 2 }}>
                    {/* All Items Tab */}
                    {activeTab === 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {billingData.map(billing => (
                                <Box
                                    key={billing.id}
                                    sx={{
                                        p: 1.5,
                                        backgroundColor:
                                            billing.unpaidAmount > 0
                                                ? isPaymentOverdue(
                                                      billing.billingDueDate
                                                  )
                                                    ? 'error.50'
                                                    : getDaysUntilDue(
                                                            billing.billingDueDate
                                                        ) <= 14
                                                      ? 'warning.50'
                                                      : 'background.paper'
                                                : 'success.50',
                                        borderRadius: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 1.5,
                                            }}
                                        >
                                            {getFeeIcon(billing)}
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    {billing.billingTypeName}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {getFeeCategoryName(
                                                        billing
                                                    )}
                                                </Typography>
                                                {billing.deliveryDescription && (
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{
                                                            display: 'block',
                                                        }}
                                                    >
                                                        {
                                                            billing.deliveryDescription
                                                        }
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    lineHeight: 1.1,
                                                }}
                                            >
                                                {formatCurrency(billing.amount)}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 0.5,
                                                    mt: 0.5,
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <Chip
                                                    label={formatCurrency(
                                                        billing.amountPaid
                                                    )}
                                                    color={
                                                        billing.amountPaid > 0
                                                            ? 'success'
                                                            : 'default'
                                                    }
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.625rem',
                                                        height: 16,
                                                    }}
                                                />
                                                {billing.unpaidAmount > 0 && (
                                                    <Chip
                                                        label={formatCurrency(
                                                            billing.unpaidAmount
                                                        )}
                                                        color={
                                                            isPaymentOverdue(
                                                                billing.billingDueDate
                                                            )
                                                                ? 'error'
                                                                : 'warning'
                                                        }
                                                        size="small"
                                                        sx={{
                                                            fontSize:
                                                                '0.625rem',
                                                            height: 16,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                Due:{' '}
                                                {formatDate(
                                                    billing.billingDueDate
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Overdue Tab */}
                    {activeTab === 1 && (
                        <Box>
                            {overdue.length > 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    {overdue.map(billing => (
                                        <Box
                                            key={billing.id}
                                            sx={{
                                                p: 1.5,
                                                backgroundColor: 'error.50',
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'error.main',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.5,
                                                    }}
                                                >
                                                    <ErrorIcon
                                                        sx={{
                                                            color: 'error.main',
                                                            fontSize: 16,
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {
                                                                billing.billingTypeName
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="error.main"
                                                        >
                                                            Due:{' '}
                                                            {formatDate(
                                                                billing.billingDueDate
                                                            )}
                                                            (
                                                            {Math.abs(
                                                                getDaysUntilDue(
                                                                    billing.billingDueDate
                                                                )
                                                            )}{' '}
                                                            days overdue)
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{ textAlign: 'right' }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        color="error.main"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {formatCurrency(
                                                            billing.unpaidAmount
                                                        )}
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="error"
                                                        sx={{
                                                            mt: 0.5,
                                                            fontSize:
                                                                '0.6875rem',
                                                        }}
                                                    >
                                                        Pay Now
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <CheckIcon
                                        sx={{
                                            fontSize: 32,
                                            color: 'success.main',
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No overdue payments. Great job staying
                                        on track!
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Due Soon Tab */}
                    {activeTab === 2 && (
                        <Box>
                            {dueSoon.length > 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    {dueSoon.map(billing => (
                                        <Box
                                            key={billing.id}
                                            sx={{
                                                p: 1.5,
                                                backgroundColor: 'warning.50',
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'warning.main',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.5,
                                                    }}
                                                >
                                                    <WarningIcon
                                                        sx={{
                                                            color: 'warning.main',
                                                            fontSize: 16,
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {
                                                                billing.billingTypeName
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="warning.main"
                                                        >
                                                            Due:{' '}
                                                            {formatDate(
                                                                billing.billingDueDate
                                                            )}
                                                            (
                                                            {getDaysUntilDue(
                                                                billing.billingDueDate
                                                            )}{' '}
                                                            days)
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{ textAlign: 'right' }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        color="warning.main"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {formatCurrency(
                                                            billing.unpaidAmount
                                                        )}
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="warning"
                                                        sx={{
                                                            mt: 0.5,
                                                            fontSize:
                                                                '0.6875rem',
                                                        }}
                                                    >
                                                        Pay Now
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <ScheduleIcon
                                        sx={{
                                            fontSize: 32,
                                            color: 'info.main',
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No payments due in the next 14 days.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Paid Items Tab */}
                    {activeTab === 3 && (
                        <Box>
                            {paid.length > 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    {paid.map(billing => (
                                        <Box
                                            key={billing.id}
                                            sx={{
                                                p: 1.5,
                                                backgroundColor: 'success.50',
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'success.main',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.5,
                                                    }}
                                                >
                                                    <CheckIcon
                                                        sx={{
                                                            color: 'success.main',
                                                            fontSize: 16,
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {
                                                                billing.billingTypeName
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            Due:{' '}
                                                            {formatDate(
                                                                billing.billingDueDate
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{ textAlign: 'right' }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        color="success.main"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {formatCurrency(
                                                            billing.amountPaid
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        Paid
                                                    </Typography>
                                                    {billing.unpaidAmount >
                                                        0 && (
                                                        <Typography
                                                            variant="caption"
                                                            color="warning.main"
                                                            sx={{
                                                                display:
                                                                    'block',
                                                            }}
                                                        >
                                                            {formatCurrency(
                                                                billing.unpaidAmount
                                                            )}{' '}
                                                            remaining
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <PaymentIcon
                                        sx={{
                                            fontSize: 32,
                                            color: 'text.disabled',
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No payments have been made yet.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Compact Action Bar */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/portal/billing/payments')}
                    disabled={totals.outstanding === 0}
                    sx={{ fontSize: '0.75rem' }}
                >
                    Make Payment
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
                    sx={{ fontSize: '0.75rem' }}
                >
                    Statement
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<ViewIcon sx={{ fontSize: 14 }} />}
                    onClick={() => navigate('/portal/billing/history')}
                    sx={{ fontSize: '0.75rem' }}
                >
                    History
                </Button>
            </Box>
        </Box>
    );
};
