import {
    AccountBalance as BillingIcon,
    Schedule as DueIcon,
    Grade as GradeIcon,
    Assignment as MarksIcon,
    Person as PersonIcon,
    Refresh as RefreshIcon,
    School as SchoolIcon,
    Remove as StableIcon,
    TrendingDown as TrendingDownIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import type {
    AnnualMark,
    DashboardBilling,
    DashboardData,
    PeriodMark,
    Registration,
} from '../../../../types/dashboard.types';
import type { Student } from '../../../../types/student.types';
import { useGetDashboard } from '../../_hooks/useParentWithStore';

/**
 * Props interface for DashboardOverview component
 */
interface DashboardOverviewProps {
    selectedStudent: Student | null;
    className?: string;
}

/**
 * Student Identity Information - Primary focus section
 */
interface StudentIdentity {
    photo: string | null;
    fullName: string;
    firstName: string;
    lastName: string;
    className: string;
    studentId: string;
    currentSchoolYear: string;
}

/**
 * Academic Situation Overview
 */
interface AcademicSituation {
    currentGeneralAverage: number | null;
    classRank: number | null;
    classSize: number;
    averageEvolution: {
        trend: 'up' | 'down' | 'stable';
        change: number;
        previousAverage: number | null;
    };
    teacherAssessment: {
        generalAppreciation: string | null;
        shortAppreciation: string | null;
        assessmentDate: string | null;
    };
    maxMark: number;
}

/**
 * Subject Mark Information
 */
interface SubjectMark {
    subjectName: string;
    mark: number | null;
    coefficient: number;
    maxMark: number;
}

/**
 * Term Mark Information
 */
interface TermMark {
    term: number;
    name: string;
    average: number | null;
    status: 'completed' | 'pending' | 'not-started';
    subjects: SubjectMark[];
}

/**
 * Annual Marks Information
 */
interface AnnualMarks {
    subjects: SubjectMark[];
    generalAverage: number | null;
    rank: number | null;
    classSize: number;
    isAvailable: boolean;
}

/**
 * Financial Situation Overview
 */
interface FinancialSituation {
    totalSchoolFees: number;
    totalPaid: number;
    remainingToPay: number;
    amountDue: number;
    nextPaymentDue: {
        amount: number;
        dueDate: string | null;
        description: string;
        isOverdue: boolean;
    } | null;
    paymentStatus: 'current' | 'overdue' | 'paid';
}

/**
 * Comprehensive Dashboard Data Structure
 */
interface EnhancedDashboardData {
    studentIdentity: StudentIdentity;
    academicSituation: AcademicSituation;
    termMarks: TermMark[];
    annualMarks: AnnualMarks;
    completedTerms: number;
    annualMarksAvailable: boolean;
    financialSituation: FinancialSituation;
    lastUpdated: string;
    schoolYear: {
        name: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
    };
}

/**
 * Process student identity from registration data
 */
const processStudentIdentity = (
    registration: Registration
): StudentIdentity => {
    if (!registration) {
        throw new Error('Registration data is required');
    }

    return {
        photo: registration.base64Picture || registration.picturePath || null,
        fullName:
            `${registration.firstName || ''} ${registration.lastName || ''}`.trim(),
        firstName: registration.firstName || 'N/A',
        lastName: registration.lastName || 'N/A',
        className: registration.schoolYearClassName || 'N/A',
        studentId: registration.studentCode || 'N/A',
        currentSchoolYear:
            registration.schoolYearName ||
            `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    };
};

/**
 * Process academic situation from registration data
 */
const processAcademicSituation = (
    registration: Registration
): AcademicSituation => {
    if (!registration) {
        throw new Error('Registration data is required');
    }

    const currentAverage =
        registration.currentAverageMark || registration.averageMark || null;
    const previousAverage = registration.averageMark || null;

    let trend: 'up' | 'down' | 'stable' = 'stable';
    let change = 0;

    if (registration.currentAverageMark && registration.averageMark) {
        if (registration.currentAverageMark > registration.averageMark) {
            trend = 'up';
        } else if (registration.currentAverageMark < registration.averageMark) {
            trend = 'down';
        }
        change = Math.abs(
            registration.currentAverageMark - registration.averageMark
        );
    }

    return {
        currentGeneralAverage: currentAverage,
        classRank: registration.currentRank || registration.rank || null,
        classSize: 28, // This could be derived from actual class data if available
        averageEvolution: {
            trend,
            change,
            previousAverage,
        },
        teacherAssessment: {
            generalAppreciation: registration.currentAppreciation || null,
            shortAppreciation: registration.currentShortAppreciation || null,
            assessmentDate: new Date().toISOString(),
        },
        maxMark: registration.reportCardMaxMark || 20,
    };
};

/**
 * Process period marks into term structure
 */
const processTermMarks = (periodMarks: PeriodMark[]): TermMark[] => {
    // Handle empty or null period marks
    const safeMarks = Array.isArray(periodMarks) ? periodMarks : [];

    // Group period marks by period/term
    const termGroups = new Map<number, PeriodMark[]>();

    safeMarks.forEach(mark => {
        if (mark && typeof mark.periodId === 'number') {
            const periodId = mark.periodId;
            if (!termGroups.has(periodId)) {
                termGroups.set(periodId, []);
            }
            termGroups.get(periodId)!.push(mark);
        }
    });

    const terms: TermMark[] = [];

    // Create standard 3 terms structure
    for (let i = 1; i <= 3; i++) {
        const termPeriodMarks =
            Array.from(termGroups.values()).find(
                (marks, index) => index + 1 === i
            ) || [];

        // Calculate average from actual marks
        let average: number | null = null;
        let status: 'completed' | 'pending' | 'not-started' = 'not-started';

        if (termPeriodMarks.length > 0) {
            const validMarks = termPeriodMarks.filter(
                mark => mark && typeof mark.mark === 'number' && mark.mark > 0
            );

            if (validMarks.length > 0) {
                // Calculate weighted average
                const totalWeightedSum = validMarks.reduce(
                    (sum, mark) => sum + mark.mark * (mark.coefficient || 1),
                    0
                );
                const totalCoefficients = validMarks.reduce(
                    (sum, mark) => sum + (mark.coefficient || 1),
                    0
                );
                average =
                    totalCoefficients > 0
                        ? totalWeightedSum / totalCoefficients
                        : null;
                status =
                    validMarks.length === termPeriodMarks.length
                        ? 'completed'
                        : 'pending';
            } else {
                status = 'pending';
            }
        }

        // Convert PeriodMark to SubjectMark (mock subject names for now)
        const subjects: SubjectMark[] = termPeriodMarks.map((mark, index) => ({
            subjectName: `Matière ${mark?.subjectId || index + 1}`, // This should be mapped from actual subject data
            mark:
                mark && typeof mark.mark === 'number' && mark.mark > 0
                    ? mark.mark
                    : null,
            coefficient: mark?.coefficient || 1,
            maxMark: 20, // Standard max mark
        }));

        terms.push({
            term: i,
            name: `Trimestre ${i}`,
            average,
            status,
            subjects,
        });
    }

    return terms;
};

/**
 * Process annual marks
 */
const processAnnualMarks = (
    annualMarks: AnnualMark[],
    termMarks: TermMark[]
): AnnualMarks => {
    const safeAnnualMarks = Array.isArray(annualMarks) ? annualMarks : [];
    const safeTermMarks = Array.isArray(termMarks) ? termMarks : [];

    const completedTerms = safeTermMarks.filter(
        term => term && term.status === 'completed'
    ).length;
    const isAvailable = completedTerms === 3 && safeAnnualMarks.length > 0;

    if (!isAvailable) {
        return {
            subjects: [],
            generalAverage: null,
            rank: null,
            classSize: 28,
            isAvailable: false,
        };
    }

    // Calculate general average from annual marks
    const validMarks = safeAnnualMarks.filter(
        mark => mark && typeof mark.mark === 'number' && mark.mark > 0
    );

    let generalAverage: number | null = null;

    if (validMarks.length > 0) {
        const totalWeightedSum = validMarks.reduce(
            (sum, mark) => sum + mark.mark * (mark.coefficient || 1),
            0
        );
        const totalCoefficients = validMarks.reduce(
            (sum, mark) => sum + (mark.coefficient || 1),
            0
        );
        generalAverage =
            totalCoefficients > 0 ? totalWeightedSum / totalCoefficients : null;
    }

    const subjects: SubjectMark[] = safeAnnualMarks.map((mark, index) => ({
        subjectName: `Matière ${mark?.subjectId || index + 1}`, // This should be mapped from actual subject data
        mark:
            mark && typeof mark.mark === 'number' && mark.mark > 0
                ? mark.mark
                : null,
        coefficient: mark?.coefficient || 1,
        maxMark: 20,
    }));

    return {
        subjects,
        generalAverage,
        rank: null, // This should come from actual ranking data
        classSize: 28,
        isAvailable: true,
    };
};

/**
 * Determines if a payment is overdue based on the due date
 * @param dueDate - The due date string to check
 * @returns True if the payment is overdue, false otherwise
 */
const isPaymentOverdue = (dueDate: string): boolean => {
    try {
        return new Date(dueDate) < new Date();
    } catch {
        return false;
    }
};

/**
 * Finds the next payment due from a list of billings
 * @param billings - Array of valid billings with unpaid amounts
 * @returns The next payment due or null if none found
 */
const findNextPaymentDue = (
    billings: DashboardBilling[]
): FinancialSituation['nextPaymentDue'] => {
    // Filter to billings with unpaid amounts and valid due dates
    const unpaidBillings = billings.filter(
        billing =>
            billing.unpaidAmount > 0 &&
            billing.billingDueDate &&
            !isNaN(new Date(billing.billingDueDate).getTime())
    );

    if (unpaidBillings.length === 0) {
        return null;
    }

    // Sort by due date (earliest first)
    const earliestDueBilling = unpaidBillings.sort((a, b) => {
        const dateA = new Date(a.billingDueDate).getTime();
        const dateB = new Date(b.billingDueDate).getTime();
        return dateA - dateB;
    })[0];

    const isOverdue = isPaymentOverdue(earliestDueBilling.billingDueDate);

    return {
        amount: earliestDueBilling.unpaidAmount,
        dueDate: earliestDueBilling.billingDueDate,
        description: earliestDueBilling.billingTypeName || 'Paiement dû',
        isOverdue,
    };
};

/**
 * Determines the overall payment status based on billing data
 * @param billings - Array of valid billings
 * @returns Payment status: 'paid', 'overdue', or 'current'
 */
const determinePaymentStatus = (
    billings: DashboardBilling[]
): 'current' | 'overdue' | 'paid' => {
    // Calculate total due amount
    const totalDueAmount = billings.reduce(
        (sum, billing) => sum + (billing.dueAmount || 0),
        0
    );

    // If no amount due, status is paid
    if (totalDueAmount <= 0) {
        return 'paid';
    }

    // Check if any payment with due amount is overdue
    const hasOverduePayment = billings.some(
        billing =>
            billing.dueAmount > 0 &&
            billing.billingDueDate &&
            isPaymentOverdue(billing.billingDueDate)
    );

    return hasOverduePayment ? 'overdue' : 'current';
};

/**
 * Process financial situation from real billing data with comprehensive aggregation
 *
 * This function calculates financial metrics using the actual billing data from the API,
 * following the same patterns used in BillingOverview component for consistency.
 *
 * @param registration - Registration data (kept for fallback compatibility)
 * @param billings - Array of billing items from the dashboard API
 * @returns Processed financial situation data
 *
 * @throws {Error} When registration data is missing or billing data is invalid
 */
const processFinancialSituation = (
    registration: Registration,
    billings: DashboardBilling[]
): FinancialSituation => {
    if (!registration) {
        throw new Error('Registration data is required');
    }

    // Validate and filter billings - exclude cancelled billings
    const validBillings = Array.isArray(billings)
        ? billings.filter(
              billing =>
                  billing &&
                  typeof billing.amount === 'number' &&
                  typeof billing.amountPaid === 'number' &&
                  typeof billing.unpaidAmount === 'number' &&
                  !billing.isCancelled
          )
        : [];

    // Handle empty billing array - use registration data as fallback
    if (validBillings.length === 0) {
        console.warn('No valid billing data found, falling back to registration data');

        const fallbackDueAmount = registration.dueAmount || 0;

        return {
            totalSchoolFees: registration.amount || 0,
            totalPaid: registration.amountPaid || 0,
            remainingToPay: registration.unpaidAmount || 0,
            amountDue: fallbackDueAmount,
            nextPaymentDue: fallbackDueAmount > 0 ? {
                amount: fallbackDueAmount,
                dueDate: null,
                description: 'Frais de scolarité',
                isOverdue: false,
            } : null,
            paymentStatus: fallbackDueAmount <= 0 ? 'paid' : 'current',
        };
    }

    // Calculate totals from actual billing data using reduce for performance
    const totalSchoolFees = validBillings.reduce(
        (sum, billing) => sum + billing.amount,
        0
    );

    const totalPaid = validBillings.reduce(
        (sum, billing) => sum + billing.amountPaid,
        0
    );

    const remainingToPay = validBillings.reduce(
        (sum, billing) => sum + billing.unpaidAmount,
        0
    );

    const amountDue = validBillings.reduce(
        (sum, billing) => sum + (billing.dueAmount || 0),
        0
    );

    // Find the next payment due using dedicated helper function
    const nextPaymentDue = findNextPaymentDue(validBillings);

    // Determine overall payment status using dedicated helper function
    const paymentStatus = determinePaymentStatus(validBillings);

    return {
        totalSchoolFees,
        totalPaid,
        remainingToPay,
        amountDue,
        nextPaymentDue,
        paymentStatus,
    };
};

/**
 * Create dashboard data from real API data
 *
 * Note: Financial situation is now processed separately via memoization
 * for better performance and caching granularity.
 */
const createDashboardDataFromRealData = (
    dashboardData: DashboardData | null
): EnhancedDashboardData | null => {
    if (!dashboardData?.registration) {
        console.warn('Dashboard data or registration is missing');
        return null;
    }

    try {
        const {
            registration,
            periodMarks = [],
            annualMarks = [],
            billings = [],
        } = dashboardData;

        const studentIdentity = processStudentIdentity(registration);
        const academicSituation = processAcademicSituation(registration);
        const termMarks = processTermMarks(periodMarks);
        const processedAnnualMarks = processAnnualMarks(annualMarks, termMarks);

        // Create a placeholder financial situation - the real one is calculated separately
        // This ensures the interface remains consistent while allowing for separate memoization
        const placeholderFinancialSituation: FinancialSituation = {
            totalSchoolFees: 0,
            totalPaid: 0,
            remainingToPay: 0,
            amountDue: 0,
            nextPaymentDue: null,
            paymentStatus: 'current',
        };

        const completedTerms = termMarks.filter(
            term => term && term.status === 'completed'
        ).length;
        const annualMarksAvailable = processedAnnualMarks.isAvailable;

        const currentYear = new Date().getFullYear();
        const schoolYearName =
            registration.schoolYearName || `${currentYear}-${currentYear + 1}`;

        return {
            studentIdentity,
            academicSituation,
            termMarks,
            annualMarks: processedAnnualMarks,
            completedTerms,
            annualMarksAvailable,
            financialSituation: placeholderFinancialSituation, // Placeholder - not used in UI
            lastUpdated: new Date().toISOString(),
            schoolYear: {
                name: schoolYearName,
                startDate: `${currentYear}-09-01T00:00:00Z`,
                endDate: `${currentYear + 1}-07-31T23:59:59Z`,
                isActive: true,
            },
        };
    } catch (error) {
        console.error('Error creating dashboard data from real data:', error);
        throw new Error(
            'Failed to process dashboard data: ' +
                (error instanceof Error ? error.message : 'Unknown error')
        );
    }
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const {
        data,
        isLoading: isDataLoading,
        error: dataError,
    } = useGetDashboard();
    const [error, setError] = useState<string | null>(null);

    // Process dashboard data using useMemo for performance optimization
    // This memoization prevents expensive recalculations on every render
    const dashboardData = useMemo(() => {
        if (!selectedStudent || !data) return null;

        try {
            return createDashboardDataFromRealData(data);
        } catch (err) {
            console.error('Error processing dashboard data:', err);
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to process dashboard data'
            );
            return null;
        }
    }, [selectedStudent, data]);

    // Memoize financial situation calculations separately for better granular caching
    // This prevents recalculating financial data when other dashboard data changes
    const financialSituation = useMemo(() => {
        if (!data?.registration || !data?.billings) return null;

        try {
            return processFinancialSituation(data.registration, data.billings);
        } catch (err) {
            console.error('Error processing financial situation:', err);
            return null;
        }
    }, [data?.registration, data?.billings]);

    // Combine loading states
    const isLoading = isDataLoading;

    // Handle data error
    useEffect(() => {
        if (dataError) {
            setError(
                dataError instanceof Error
                    ? dataError.message
                    : 'Failed to load dashboard data'
            );
        } else {
            setError(null);
        }
    }, [dataError]);

    // Compute final error state
    const finalError =
        error || (dataError ? 'Failed to load dashboard data' : null);

    // Utility functions for formatting
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF', // West African CFA franc - adjust as needed
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const formatLastUpdated = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) return "À l'instant";
        if (diffInHours < 24) return `Il y a ${diffInHours}h`;
        if (diffInHours < 48) return 'Hier';
        return formatDate(dateString);
    };

    const getTrendIcon = (
        trend: 'up' | 'down' | 'stable',
        size: number = 16
    ) => {
        const iconProps = { fontSize: size };

        switch (trend) {
            case 'up':
                return (
                    <TrendingUpIcon
                        sx={{ ...iconProps, color: 'success.main' }}
                    />
                );
            case 'down':
                return (
                    <TrendingDownIcon
                        sx={{ ...iconProps, color: 'error.main' }}
                    />
                );
            case 'stable':
                return (
                    <StableIcon
                        sx={{ ...iconProps, color: 'text.secondary' }}
                    />
                );
            default:
                return null;
        }
    };

    const getAverageColor = (average: number | null, maxMark: number = 20) => {
        if (!average) return 'text.secondary';
        const percentage = (average / maxMark) * 100;
        if (percentage >= 75) return 'success.main';
        if (percentage >= 50) return 'warning.main';
        return 'error.main';
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'current':
                return 'success.main';
            case 'overdue':
                return 'error.main';
            default:
                return 'warning.main';
        }
    };

    // Utility functions for term marks
    const getTermStatus = (
        termNumber: number
    ): 'completed' | 'pending' | 'not-started' => {
        if (!dashboardData) return 'not-started';
        const term = dashboardData.termMarks.find(t => t.term === termNumber);
        return term?.status || 'not-started';
    };

    const calculateTermAverage = (termMarks: SubjectMark[]): number | null => {
        if (!termMarks.length) return null;

        let totalWeightedSum = 0;
        let totalCoefficients = 0;

        for (const subject of termMarks) {
            if (subject.mark !== null) {
                totalWeightedSum += subject.mark * subject.coefficient;
                totalCoefficients += subject.coefficient;
            }
        }

        return totalCoefficients > 0
            ? totalWeightedSum / totalCoefficients
            : null;
    };

    const isAnnualMarksReady = (): boolean => {
        return dashboardData?.completedTerms === 3 || false;
    };

    const getTermStatusColor = (
        status: 'completed' | 'pending' | 'not-started'
    ) => {
        switch (status) {
            case 'completed':
                return 'success.main';
            case 'pending':
                return 'warning.main';
            case 'not-started':
                return 'grey.500';
            default:
                return 'grey.500';
        }
    };

    const getTermBackgroundColor = (
        status: 'completed' | 'pending' | 'not-started'
    ) => {
        switch (status) {
            case 'completed':
                return alpha(theme.palette.success.main, 0.05);
            case 'pending':
                return alpha(theme.palette.warning.main, 0.05);
            case 'not-started':
                return alpha(theme.palette.grey[500], 0.05);
            default:
                return alpha(theme.palette.grey[500], 0.05);
        }
    };

    const getTermBorderColor = (
        status: 'completed' | 'pending' | 'not-started'
    ) => {
        switch (status) {
            case 'completed':
                return alpha(theme.palette.success.main, 0.3);
            case 'pending':
                return alpha(theme.palette.warning.main, 0.3);
            case 'not-started':
                return alpha(theme.palette.grey[500], 0.2);
            default:
                return alpha(theme.palette.grey[500], 0.2);
        }
    };

    if (!selectedStudent) {
        return (
            <Card
                className={className}
                sx={{
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
                        <SchoolIcon
                            sx={{
                                fontSize: { xs: 48, md: 64 },
                                color: 'text.disabled',
                                mb: 2,
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                        >
                            Sélectionnez un élève pour voir son tableau de bord
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card
                className={className}
                sx={{
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
                        <LinearProgress
                            sx={{
                                mb: 2,
                                width: '100%',
                                borderRadius: '4px',
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Chargement des données du tableau de bord...
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (finalError) {
        return (
            <Card
                className={className}
                sx={{
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'error.main',
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
                        <Typography
                            variant="h6"
                            color="error.main"
                            sx={{ mb: 1 }}
                        >
                            Erreur de chargement
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {finalError}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 2 }}
                        >
                            Veuillez réessayer ou contacter le support si le
                            problème persiste.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (!dashboardData) {
        return (
            <Card
                className={className}
                sx={{
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
                        <SchoolIcon
                            sx={{
                                fontSize: { xs: 48, md: 64 },
                                color: 'text.disabled',
                                mb: 2,
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                        >
                            Données non disponibles
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Les données de l'élève sélectionné ne peuvent pas
                            être chargées pour le moment.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Container
            maxWidth="lg"
            className={className}
            sx={{ px: { xs: 2, md: 3 } }}
        >
            {/* 1. IDENTITÉ RAPIDE DE L'ÉLÈVE - Hero Section */}
            <Card
                sx={{
                    mb: 3,
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'grey.200',
                    background:
                        'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                background:
                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                            }}
                        >
                            Identité de l'Élève
                        </Typography>
                        <IconButton
                            size="small"
                            sx={{
                                backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                ),
                                '&:hover': {
                                    backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.2
                                    ),
                                },
                            }}
                        >
                            <RefreshIcon
                                sx={{ fontSize: 18, color: 'primary.main' }}
                            />
                        </IconButton>
                    </Box>

                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'row', md: 'column' },
                                    alignItems: 'center',
                                    gap: 2,
                                    textAlign: { xs: 'left', md: 'center' },
                                }}
                            >
                                <Avatar
                                    src={
                                        dashboardData.studentIdentity.photo ||
                                        undefined
                                    }
                                    sx={{
                                        width: { xs: 80, md: 120 },
                                        height: { xs: 80, md: 120 },
                                        border: 4,
                                        borderColor: 'primary.main',
                                        boxShadow: 3,
                                    }}
                                >
                                    <PersonIcon
                                        sx={{ fontSize: { xs: 40, md: 60 } }}
                                    />
                                </Avatar>
                                <Box sx={{ flex: { xs: 1, md: 'none' } }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1,
                                            fontSize: {
                                                xs: '1.5rem',
                                                md: '2rem',
                                            },
                                        }}
                                    >
                                        {dashboardData.studentIdentity.fullName}
                                    </Typography>
                                    <Chip
                                        label="Élève Actif"
                                        color="success"
                                        size="small"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 8 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '4px',
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.05
                                            ),
                                            border: 1,
                                            borderColor: alpha(
                                                theme.palette.primary.main,
                                                0.2
                                            ),
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            Classe
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {
                                                dashboardData.studentIdentity
                                                    .className
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '4px',
                                            backgroundColor: alpha(
                                                theme.palette.secondary.main,
                                                0.05
                                            ),
                                            border: 1,
                                            borderColor: 'grey.200',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            Matricule
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {
                                                dashboardData.studentIdentity
                                                    .studentId
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '4px',
                                            backgroundColor: alpha(
                                                theme.palette.info.main,
                                                0.05
                                            ),
                                            border: 1,
                                            borderColor: alpha(
                                                theme.palette.info.main,
                                                0.2
                                            ),
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            Année Scolaire en Cours
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {dashboardData.schoolYear.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* 2. NOTES PAR TRIMESTRE */}
            <Card
                sx={{
                    mb: 3,
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            mb: 3,
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <MarksIcon />
                        Notes par Trimestre
                    </Typography>

                    {/* Terms Grid */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {dashboardData.termMarks.map(term => {
                            const status = term.status;
                            return (
                                <Grid size={{ xs: 12, md: 4 }} key={term.term}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            borderRadius: '4px',
                                            boxShadow: 'none',
                                            border: 2,
                                            borderColor:
                                                getTermBorderColor(status),
                                            backgroundColor:
                                                getTermBackgroundColor(status),
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: 2,
                                            },
                                        }}
                                    >
                                        <CardContent
                                            sx={{ p: 3, textAlign: 'center' }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    color: getTermStatusColor(
                                                        status
                                                    ),
                                                }}
                                            >
                                                {term.name}
                                            </Typography>

                                            <Box sx={{ mb: 2 }}>
                                                <Chip
                                                    label={
                                                        status === 'completed'
                                                            ? 'Terminé'
                                                            : status ===
                                                                'pending'
                                                              ? 'En cours'
                                                              : 'Non démarré'
                                                    }
                                                    color={
                                                        status === 'completed'
                                                            ? 'success'
                                                            : status ===
                                                                'pending'
                                                              ? 'warning'
                                                              : 'default'
                                                    }
                                                    size="small"
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </Box>

                                            {term.average !== null ? (
                                                <Box>
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: getAverageColor(
                                                                term.average,
                                                                20
                                                            ),
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {term.average.toFixed(
                                                            2
                                                        )}
                                                        <Typography
                                                            component="span"
                                                            variant="h5"
                                                            color="text.secondary"
                                                        >
                                                            /20
                                                        </Typography>
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Moyenne Générale
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box>
                                                    <Typography
                                                        variant="h4"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'text.secondary',
                                                            mb: 1,
                                                        }}
                                                    >
                                                        --
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {status === 'pending'
                                                            ? 'En attente'
                                                            : 'Non démarré'}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {/* Subject count for completed terms */}
                                            {term.subjects.length > 0 && (
                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        pt: 2,
                                                        borderTop: 1,
                                                        borderColor: 'divider',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {term.subjects.length}{' '}
                                                        matières évaluées
                                                    </Typography>
                                                </Box>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* Annual Marks Section */}
                    <Card
                        sx={{
                            borderRadius: '4px',
                            boxShadow: 'none',
                            border: 2,
                            borderColor: isAnnualMarksReady()
                                ? alpha(theme.palette.success.main, 0.5)
                                : alpha(theme.palette.grey[500], 0.3),
                            backgroundColor: isAnnualMarksReady()
                                ? alpha(theme.palette.success.main, 0.05)
                                : alpha(theme.palette.grey[500], 0.05),
                        }}
                    >
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    mb: 3,
                                    color: isAnnualMarksReady()
                                        ? 'success.main'
                                        : 'text.secondary',
                                }}
                            >
                                Moyennes Annuelles
                            </Typography>

                            {isAnnualMarksReady() ? (
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Box>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: getAverageColor(
                                                        dashboardData
                                                            .annualMarks
                                                            .generalAverage,
                                                        20
                                                    ),
                                                    mb: 1,
                                                }}
                                            >
                                                {dashboardData.annualMarks.generalAverage?.toFixed(
                                                    2
                                                )}
                                                <Typography
                                                    component="span"
                                                    variant="h4"
                                                    color="text.secondary"
                                                >
                                                    /20
                                                </Typography>
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                            >
                                                Moyenne Générale Annuelle
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Box>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: 'info.main',
                                                    mb: 1,
                                                }}
                                            >
                                                {dashboardData.annualMarks.rank}
                                                <Typography
                                                    component="span"
                                                    variant="h4"
                                                    color="text.secondary"
                                                >
                                                    /
                                                    {
                                                        dashboardData
                                                            .annualMarks
                                                            .classSize
                                                    }
                                                </Typography>
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                            >
                                                Rang Annuel
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Box>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                            mb: 2,
                                        }}
                                    >
                                        En attente
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        Compléter tous les trimestres pour voir
                                        les moyennes annuelles
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        ({dashboardData.completedTerms}/3
                                        trimestres terminés)
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            {/* 3. SITUATION FINANCIÈRE */}
            <Card
                sx={{
                    mb: 3,
                    borderRadius: '4px',
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            mb: 3,
                            color: financialSituation
                                ? getPaymentStatusColor(
                                      financialSituation.paymentStatus
                                  )
                                : 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <BillingIcon />
                        Situation Financière
                    </Typography>

                    {financialSituation ? (
                        <>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '4px',
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.05
                                            ),
                                            border: 1,
                                            borderColor: alpha(
                                                theme.palette.primary.main,
                                                0.2
                                            ),
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            Frais Totaux
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'primary.main',
                                            }}
                                        >
                                            {formatCurrency(
                                                financialSituation.totalSchoolFees
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '4px',
                                            backgroundColor: alpha(
                                                theme.palette.success.main,
                                                0.05
                                            ),
                                            border: 1,
                                            borderColor: alpha(
                                                theme.palette.success.main,
                                                0.2
                                            ),
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            Montant Payé
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'success.main',
                                            }}
                                        >
                                            {formatCurrency(
                                                financialSituation.totalPaid
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '4px',
                                            backgroundColor: alpha(
                                                theme.palette.warning.main,
                                                0.05
                                            ),
                                            border: 1,
                                            borderColor: alpha(
                                                theme.palette.warning.main,
                                                0.2
                                            ),
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            Reste à Payer
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'warning.main',
                                            }}
                                        >
                                            {formatCurrency(
                                                financialSituation.remainingToPay
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '4px',
                                            backgroundColor: alpha(
                                                theme.palette.error.main,
                                                0.05
                                            ),
                                            border: 1,
                                            borderColor: alpha(
                                                theme.palette.error.main,
                                                0.2
                                            ),
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            Montant Dû
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'error.main',
                                            }}
                                        >
                                            {formatCurrency(
                                                financialSituation.amountDue
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Next Payment Due Alert */}
                            {financialSituation.nextPaymentDue && (
                                <Box
                                    sx={{
                                        mt: 3,
                                        p: 3,
                                        borderRadius: '4px',
                                        backgroundColor: financialSituation.nextPaymentDue.isOverdue
                                            ? alpha(theme.palette.error.main, 0.05)
                                            : alpha(theme.palette.warning.main, 0.05),
                                        border: 1,
                                        borderColor: financialSituation.nextPaymentDue.isOverdue
                                            ? alpha(theme.palette.error.main, 0.3)
                                            : alpha(theme.palette.warning.main, 0.3),
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <DueIcon
                                            sx={{
                                                color: financialSituation.nextPaymentDue.isOverdue
                                                    ? 'error.main'
                                                    : 'warning.main'
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: financialSituation.nextPaymentDue.isOverdue
                                                    ? 'error.main'
                                                    : 'warning.main',
                                            }}
                                        >
                                            {financialSituation.nextPaymentDue.isOverdue
                                                ? 'Paiement en Retard'
                                                : 'Prochaine Échéance'}
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {financialSituation.nextPaymentDue.description}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Échéance:{' '}
                                                {financialSituation.nextPaymentDue.dueDate
                                                    ? formatDate(
                                                          financialSituation.nextPaymentDue.dueDate
                                                      )
                                                    : 'Date non définie'}
                                                {financialSituation.nextPaymentDue.isOverdue && (
                                                    <Chip
                                                        label="EN RETARD"
                                                        color="error"
                                                        size="small"
                                                        sx={{ ml: 1, fontSize: '0.625rem', height: 20 }}
                                                    />
                                                )}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: financialSituation.nextPaymentDue.isOverdue
                                                            ? 'error.main'
                                                            : 'warning.main',
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        financialSituation.nextPaymentDue.amount
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {/* Payment Status Summary */}
                            {financialSituation.paymentStatus === 'paid' && (
                                <Box
                                    sx={{
                                        mt: 3,
                                        p: 3,
                                        borderRadius: '4px',
                                        backgroundColor: alpha(
                                            theme.palette.success.main,
                                            0.05
                                        ),
                                        border: 1,
                                        borderColor: alpha(
                                            theme.palette.success.main,
                                            0.3
                                        ),
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'success.main',
                                            mb: 1,
                                        }}
                                    >
                                        ✅ Tous les paiements sont à jour
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Aucun montant en souffrance pour cet élève
                                    </Typography>
                                </Box>
                            )}
                        </>
                    ) : (
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 4,
                                backgroundColor: alpha(
                                    theme.palette.warning.main,
                                    0.05
                                ),
                                borderRadius: '4px',
                                border: 1,
                                borderColor: alpha(
                                    theme.palette.warning.main,
                                    0.2
                                ),
                            }}
                        >
                            <BillingIcon
                                sx={{
                                    fontSize: 48,
                                    color: 'warning.main',
                                    mb: 2,
                                }}
                            />
                            <Typography
                                variant="h6"
                                color="warning.main"
                                sx={{ mb: 1, fontWeight: 600 }}
                            >
                                Données financières non disponibles
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Les informations de facturation ne peuvent pas être
                                chargées pour le moment. Veuillez réessayer plus tard.
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Last Updated */}
            <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Dernière mise à jour:{' '}
                    {formatLastUpdated(dashboardData.lastUpdated)}
                </Typography>
            </Box>
        </Container>
    );
};
