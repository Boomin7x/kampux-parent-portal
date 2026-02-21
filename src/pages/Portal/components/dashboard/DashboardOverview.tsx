/* eslint-disable react-hooks/set-state-in-render */
import {
    AccountBalance as BillingIcon,
    Cake as BirthdayIcon,
    Schedule as DueIcon,
    Wc as GenderIcon,
    Language as LanguageIcon,
    Layers as LevelIcon,
    Assignment as MarksIcon,
    Flag as NationalityIcon,
    Person as PersonIcon,
    Refresh as RefreshIcon,
    School as SchoolIcon,
    MenuBook as StudyIcon,
} from '@mui/icons-material';
import {
    alpha,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
// import { useTranslation } from '../../../../hooks/useTranslation';
import { useTranslation } from 'react-i18next';
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
 * Parent/Guardian Contact Information
 */
interface ParentContact {
    name: string;
    phone: string | null;
    email: string | null;
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
    // Personal Information
    birthDate: string | null;
    age: number | null;
    birthPlace: string | null;
    gender: string | null;
    nationality: string | null;
    bloodType: string | null;
    rhesusFactor: string | null;
    // Academic Details
    studySection: string | null;
    studyLanguage: string | null;
    studyLevel: string | null;
    studyType: string | null;
    teacherName: string | null;
    isRepeater: boolean | null;
    isOldStudent: boolean | null;
    // Parent/Guardian Information
    father: ParentContact | null;
    mother: ParentContact | null;
    tutor: ParentContact | null;
    // School Services
    arriveOrGoesByBus: boolean | null;
    takeBrunch: boolean | null;
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
 * Calculate age from birth date
 */
const calculateAge = (birthDate: string): number | null => {
    if (!birthDate) return null;
    try {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    } catch {
        return null;
    }
};

/**
 * Process student identity from registration data
 */
const processStudentIdentity = (
    registration: Registration
): StudentIdentity => {
    if (!registration) {
        throw new Error('Registration data is required');
    }

    const birthDate = registration.birthDate || registration.dateOfBirth;

    // Process father information
    const father: ParentContact | null =
        registration.fatherFirstName || registration.fatherLastName
            ? {
                  name: `${registration.fatherFirstName || ''} ${registration.fatherLastName || ''}`.trim(),
                  phone: registration.fatherPortable1 || null,
                  email: registration.fatherEmail1 || null,
              }
            : null;

    // Process mother information
    const mother: ParentContact | null =
        registration.motherFirstName || registration.motherLastName
            ? {
                  name: `${registration.motherFirstName || ''} ${registration.motherLastName || ''}`.trim(),
                  phone: registration.motherPortable1 || null,
                  email: registration.motherEmail1 || null,
              }
            : null;

    // Process tutor information
    const tutor: ParentContact | null =
        registration.tutorFirstName || registration.tutorLastName
            ? {
                  name: `${registration.tutorFirstName || ''} ${registration.tutorLastName || ''}`.trim(),
                  phone: registration.tutorPortable1 || null,
                  email: registration.tutorEmail1 || null,
              }
            : null;

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
        // Personal Information
        birthDate: birthDate || null,
        age: birthDate ? calculateAge(birthDate) : null,
        birthPlace: registration.birthPlace || null,
        gender: registration.gender || null,
        nationality: registration.nationality || null,
        bloodType: registration.bloodType || null,
        rhesusFactor: registration.rhesusFactor || null,
        // Academic Details
        studySection: registration.studySection || null,
        studyLanguage: registration.studyLanguage || null,
        studyLevel: registration.studyLevel || null,
        studyType: registration.studyType || null,
        teacherName: registration.fullTeacherFullName || null,
        isRepeater: registration.isRepeater || null,
        isOldStudent: registration.isOldStudent || null,
        // Parent/Guardian Information
        father,
        mother,
        tutor,
        // School Services
        arriveOrGoesByBus: registration.arriveOrGoesByBus || null,
        takeBrunch: registration.takeBrunch || null,
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
 * Process period marks into term structure using real API data
 */
const processTermMarks = (periodMarks: PeriodMark[]): TermMark[] => {
    // Handle empty or null period marks
    const safeMarks = Array.isArray(periodMarks) ? periodMarks : [];

    // Group period marks by period name/alias to create terms
    const termGroups = new Map<string, PeriodMark>();

    safeMarks.forEach(mark => {
        if (mark && mark.schoolYearPeriodName) {
            // Use the period name as the key (e.g., "Trimestre 1", "Trimestre 2", etc.)
            termGroups.set(mark.schoolYearPeriodName, mark);
        }
    });

    const terms: TermMark[] = [];

    // Create standard 3 terms structure
    for (let i = 1; i <= 3; i++) {
        const termName = `Trimestre ${i}`;
        const periodMark = termGroups.get(termName);

        let average: number | null = null;
        let status: 'completed' | 'pending' | 'not-started' = 'not-started';

        if (periodMark) {
            // Use the actual average mark from the API
            if (
                typeof periodMark.averageMark === 'number' &&
                periodMark.averageMark > 0
            ) {
                average = periodMark.averageMark;
                status = 'completed';
            } else if (
                periodMark.averageMark === 0 ||
                periodMark.isMarkExcluded
            ) {
                // If mark is 0 or excluded, consider it as pending
                status = 'pending';
            }
        }

        // For now, we don't have subject-level data in the period marks
        // This should be expanded when subject-level data becomes available
        const subjects: SubjectMark[] = [];

        terms.push({
            term: i,
            name: termName,
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
        console.warn(
            'No valid billing data found, falling back to registration data'
        );

        const fallbackDueAmount = registration.dueAmount || 0;

        return {
            totalSchoolFees: registration.amount || 0,
            totalPaid: registration.amountPaid || 0,
            remainingToPay: registration.unpaidAmount || 0,
            amountDue: fallbackDueAmount,
            nextPaymentDue:
                fallbackDueAmount > 0
                    ? {
                          amount: fallbackDueAmount,
                          dueDate: null,
                          description: 'Frais de scolarité',
                          isOverdue: false,
                      }
                    : null,
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
            // billings = [],
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

/**
 * Modern Student Identity Card - Prominent Photo Display
 */
const StudentIdCard: React.FC<{ student: StudentIdentity }> = ({ student }) => {
    const theme = useTheme();
    const { t } = useTranslation('dashboard');

    /**
     * Format date to locale string
     */
    const formatDateDisplay = (dateString: string): string => {
        try {
            return new Intl.DateTimeFormat('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).format(new Date(dateString));
        } catch {
            return dateString;
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 1,
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                color: 'white',
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.dark, 0.2),
            }}
        >
            <Grid container spacing={2}>
                {/* Large Student Photo Section */}
                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <Box
                        sx={{
                            width: '100%',
                            paddingTop: '120%',
                            position: 'relative',
                            borderRadius: 1,
                            overflow: 'hidden',
                            border: `3px solid ${alpha(theme.palette.common.white, 0.3)}`,
                            backgroundColor: alpha(
                                theme.palette.common.white,
                                0.1
                            ),
                        }}
                    >
                        {student.photo ? (
                            <Box
                                component="img"
                                src={student.photo}
                                alt={student.fullName}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: alpha(
                                        theme.palette.common.white,
                                        0.15
                                    ),
                                }}
                            >
                                <PersonIcon
                                    sx={{
                                        fontSize: 80,
                                        color: alpha(
                                            theme.palette.common.white,
                                            0.6
                                        ),
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>

                {/* Student Information Section */}
                <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                    <Stack spacing={2}>
                        {/* Student Name and Status */}
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    mb: 0.5,
                                }}
                            >
                                {student.fullName}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                flexWrap="wrap"
                            >
                                <Chip
                                    label={t('studentIdentity.activeStudent')}
                                    size="small"
                                    sx={{
                                        height: 22,
                                        backgroundColor: alpha(
                                            theme.palette.common.white,
                                            0.25
                                        ),
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}
                                />
                                {student.isRepeater && (
                                    <Chip
                                        label={t('studentIdentity.repeater')}
                                        size="small"
                                        sx={{
                                            height: 22,
                                            backgroundColor: alpha(
                                                theme.palette.warning.main,
                                                0.9
                                            ),
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                        }}
                                    />
                                )}
                                {student.isOldStudent && (
                                    <Chip
                                        label={t('studentIdentity.oldStudent')}
                                        size="small"
                                        sx={{
                                            height: 22,
                                            backgroundColor: alpha(
                                                theme.palette.info.main,
                                                0.9
                                            ),
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                        }}
                                    />
                                )}
                            </Stack>
                        </Box>

                        {/* Student Details Grid - Basic Info */}
                        <Grid container spacing={1.5}>
                            <Grid size={{ xs: 6, md: 4 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    <SchoolIcon
                                        sx={{ fontSize: 14, opacity: 0.8 }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ opacity: 0.8, display: 'block' }}
                                    >
                                        {t('studentIdentity.class')}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600, lineHeight: 1.3 }}
                                >
                                    {student.className}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 4 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    <PersonIcon
                                        sx={{ fontSize: 14, opacity: 0.8 }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ opacity: 0.8, display: 'block' }}
                                    >
                                        {t('studentIdentity.studentId')}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600, lineHeight: 1.3 }}
                                >
                                    {student.studentId}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography
                                    variant="caption"
                                    sx={{ opacity: 0.8, display: 'block' }}
                                >
                                    {t('studentIdentity.schoolYear')}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600, lineHeight: 1.3 }}
                                >
                                    {student.currentSchoolYear}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Personal Information Section */}
                        <Box
                            sx={{
                                pt: 1.5,
                                borderTop: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                            }}
                        >
                            <Grid container spacing={1.5}>
                                {student.birthDate && (
                                    <Grid size={{ xs: 6, md: 4 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <BirthdayIcon
                                                sx={{
                                                    fontSize: 14,
                                                    opacity: 0.8,
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.8,
                                                    display: 'block',
                                                }}
                                            >
                                                {t('studentIdentity.birthDate')}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {formatDateDisplay(
                                                student.birthDate
                                            )}
                                            {student.age !== null && (
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    sx={{
                                                        ml: 0.5,
                                                        opacity: 0.8,
                                                    }}
                                                >
                                                    ({student.age}{' '}
                                                    {t('studentIdentity.years')}
                                                    )
                                                </Typography>
                                            )}
                                        </Typography>
                                    </Grid>
                                )}

                                {student.gender && (
                                    <Grid size={{ xs: 6, md: 4 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <GenderIcon
                                                sx={{
                                                    fontSize: 14,
                                                    opacity: 0.8,
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.8,
                                                    display: 'block',
                                                }}
                                            >
                                                {t('studentIdentity.gender')}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {student.gender}
                                        </Typography>
                                    </Grid>
                                )}

                                {student.nationality && (
                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <NationalityIcon
                                                sx={{
                                                    fontSize: 14,
                                                    opacity: 0.8,
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.8,
                                                    display: 'block',
                                                }}
                                            >
                                                {t(
                                                    'studentIdentity.nationality'
                                                )}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {student.nationality}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>

                        {/* Parent/Guardian Information Section */}
                        {(student.father ||
                            student.mother ||
                            student.tutor) && (
                            <Box
                                sx={{
                                    pt: 1.5,
                                    borderTop: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        opacity: 0.8,
                                        display: 'block',
                                        mb: 1.5,
                                        fontWeight: 600,
                                    }}
                                >
                                    {t('studentIdentity.parentalInformation')}
                                </Typography>
                                <Grid container spacing={1.5}>
                                    {student.father && (
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        opacity: 0.8,
                                                        display: 'block',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {t(
                                                        'studentIdentity.father'
                                                    )}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        lineHeight: 1.3,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {student.father.name}
                                                </Typography>
                                                {student.father.phone && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            opacity: 0.8,
                                                            lineHeight: 1.2,
                                                        }}
                                                    >
                                                        {t(
                                                            'studentIdentity.phone'
                                                        )}
                                                        : {student.father.phone}
                                                    </Typography>
                                                )}
                                                {student.father.email && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            opacity: 0.8,
                                                            lineHeight: 1.2,
                                                        }}
                                                    >
                                                        {t(
                                                            'studentIdentity.email'
                                                        )}
                                                        : {student.father.email}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    )}

                                    {student.mother && (
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        opacity: 0.8,
                                                        display: 'block',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {t(
                                                        'studentIdentity.mother'
                                                    )}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        lineHeight: 1.3,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {student.mother.name}
                                                </Typography>
                                                {student.mother.phone && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            opacity: 0.8,
                                                            lineHeight: 1.2,
                                                        }}
                                                    >
                                                        {t(
                                                            'studentIdentity.phone'
                                                        )}
                                                        : {student.mother.phone}
                                                    </Typography>
                                                )}
                                                {student.mother.email && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            opacity: 0.8,
                                                            lineHeight: 1.2,
                                                        }}
                                                    >
                                                        {t(
                                                            'studentIdentity.email'
                                                        )}
                                                        : {student.mother.email}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    )}

                                    {student.tutor && (
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        opacity: 0.8,
                                                        display: 'block',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {t('studentIdentity.tutor')}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        lineHeight: 1.3,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {student.tutor.name}
                                                </Typography>
                                                {student.tutor.phone && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            opacity: 0.8,
                                                            lineHeight: 1.2,
                                                        }}
                                                    >
                                                        {t(
                                                            'studentIdentity.phone'
                                                        )}
                                                        : {student.tutor.phone}
                                                    </Typography>
                                                )}
                                                {student.tutor.email && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            display: 'block',
                                                            opacity: 0.8,
                                                            lineHeight: 1.2,
                                                        }}
                                                    >
                                                        {t(
                                                            'studentIdentity.email'
                                                        )}
                                                        : {student.tutor.email}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        )}

                        {/* Academic Details Section */}
                        {(student.studySection ||
                            student.studyLanguage ||
                            student.studyLevel) && (
                            <Box
                                sx={{
                                    pt: 1.5,
                                    borderTop: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                                }}
                            >
                                <Grid container spacing={1.5}>
                                    {student.studySection && (
                                        <Grid size={{ xs: 6, md: 4 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <StudyIcon
                                                    sx={{
                                                        fontSize: 14,
                                                        opacity: 0.8,
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        opacity: 0.8,
                                                        display: 'block',
                                                    }}
                                                >
                                                    {t(
                                                        'studentIdentity.section'
                                                    )}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {student.studySection}
                                            </Typography>
                                        </Grid>
                                    )}

                                    {student.studyLanguage && (
                                        <Grid size={{ xs: 6, md: 4 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <LanguageIcon
                                                    sx={{
                                                        fontSize: 14,
                                                        opacity: 0.8,
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        opacity: 0.8,
                                                        display: 'block',
                                                    }}
                                                >
                                                    {t(
                                                        'studentIdentity.language'
                                                    )}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {student.studyLanguage}
                                            </Typography>
                                        </Grid>
                                    )}

                                    {student.studyLevel && (
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <LevelIcon
                                                    sx={{
                                                        fontSize: 14,
                                                        opacity: 0.8,
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        opacity: 0.8,
                                                        display: 'block',
                                                    }}
                                                >
                                                    {t('studentIdentity.level')}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {student.studyLevel}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const { t } = useTranslation('dashboard');
    const {
        data,
        isLoading: isDataLoading,
        error: dataError,
    } = useGetDashboard();
    const [error, setError] = useState<string | null>(null);

    // Process dashboard data using useMemo for performance optimization
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

    // Memoize financial situation calculations separately
    const financialSituation = useMemo(() => {
        if (!data?.registration || !data?.billings) return null;

        try {
            return processFinancialSituation(data.registration, data.billings);
        } catch (err) {
            console.error('Error processing financial situation:', err);
            return null;
        }
    }, [data?.registration, data?.billings]);

    const isLoading = isDataLoading;

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

    const finalError =
        error || (dataError ? 'Failed to load dashboard data' : null);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
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

        if (diffInHours < 1) return t('common.justNow');
        if (diffInHours < 24)
            return t('common.hoursAgo').replace(
                '{hours}',
                diffInHours.toString()
            );
        if (diffInHours < 48) return t('common.yesterday');
        return formatDate(dateString);
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
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <SchoolIcon
                            sx={{
                                fontSize: 48,
                                color: 'text.disabled',
                                mb: 1.5,
                            }}
                        />
                        <Typography variant="subtitle1" color="text.secondary">
                            {t('common.selectStudent')}
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
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <LinearProgress
                            sx={{
                                mb: 1.5,
                                width: '100%',
                                borderRadius: 1,
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {t('common.loadingData')}
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
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'error.main',
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography
                            variant="subtitle1"
                            color="error.main"
                            sx={{ mb: 0.5, fontWeight: 600 }}
                        >
                            {t('common.loadingError')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {finalError}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1.5 }}
                        >
                            {t('common.tryAgainOrContact')}
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
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <SchoolIcon
                            sx={{
                                fontSize: 48,
                                color: 'text.disabled',
                                mb: 1.5,
                            }}
                        />
                        <Typography variant="subtitle1" color="text.secondary">
                            {t('common.dataNotAvailable')}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            {t('common.studentDataNotLoaded')}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box className={className} sx={{ px: { xs: 2, md: 3 } }}>
            {/* Student Identity Section */}
            <Box sx={{ mb: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1.5,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            color: 'primary.dark',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 18 }} />
                        {t('studentIdentity.title')}
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
                            sx={{ fontSize: 16, color: 'primary.main' }}
                        />
                    </IconButton>
                </Box>
                <StudentIdCard student={dashboardData.studentIdentity} />
            </Box>

            {/* Term Marks Section */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        mb: 1.5,
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <MarksIcon sx={{ fontSize: 18 }} />
                    {t('academic.termMarks')}
                </Typography>

                <Grid container spacing={1.5} sx={{ mb: 2 }}>
                    {dashboardData.termMarks.map(term => {
                        const status = term.status;
                        return (
                            <Grid size={{ xs: 12, sm: 4 }} key={term.term}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: getTermBorderColor(status),
                                        backgroundColor:
                                            getTermBackgroundColor(status),
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            borderColor:
                                                getTermStatusColor(status),
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: getTermStatusColor(
                                                    status
                                                ),
                                            }}
                                        >
                                            {term.name}
                                        </Typography>
                                        <Chip
                                            label={
                                                status === 'completed'
                                                    ? t('academic.completed')
                                                    : status === 'pending'
                                                      ? t('academic.pending')
                                                      : t('academic.notStarted')
                                            }
                                            size="small"
                                            sx={{
                                                height: 20,
                                                fontSize: '0.6875rem',
                                                fontWeight: 600,
                                                backgroundColor:
                                                    status === 'completed'
                                                        ? alpha(
                                                              theme.palette
                                                                  .success.main,
                                                              0.15
                                                          )
                                                        : status === 'pending'
                                                          ? alpha(
                                                                theme.palette
                                                                    .warning
                                                                    .main,
                                                                0.15
                                                            )
                                                          : alpha(
                                                                theme.palette
                                                                    .grey[500],
                                                                0.15
                                                            ),
                                                color: getTermStatusColor(
                                                    status
                                                ),
                                            }}
                                        />
                                    </Box>

                                    {term.average !== null ? (
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: getAverageColor(
                                                        term.average,
                                                        20
                                                    ),
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {term.average.toFixed(2)}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    /20
                                                </Typography>
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {t('academic.generalAverage')}
                                            </Typography>
                                            {term.subjects.length > 0 && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        display: 'block',
                                                        mt: 1,
                                                        pt: 1,
                                                        borderTop: 1,
                                                        borderColor: 'divider',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    {term.subjects.length}{' '}
                                                    {t('academic.subjects')}
                                                </Typography>
                                            )}
                                        </Box>
                                    ) : (
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'text.disabled',
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                --
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ fontStyle: 'italic' }}
                                            >
                                                {status === 'pending'
                                                    ? t('academic.waiting')
                                                    : t('academic.notStarted')}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Annual Marks */}
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        border: 1,
                        borderColor: isAnnualMarksReady()
                            ? alpha(theme.palette.success.main, 0.5)
                            : alpha(theme.palette.grey[500], 0.3),
                        backgroundColor: isAnnualMarksReady()
                            ? alpha(theme.palette.success.main, 0.05)
                            : alpha(theme.palette.grey[500], 0.05),
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            mb: 1.5,
                            color: isAnnualMarksReady()
                                ? 'success.main'
                                : 'text.secondary',
                        }}
                    >
                        {t('academic.annualMarks')}
                    </Typography>

                    {isAnnualMarksReady() ? (
                        <Grid container spacing={1.5}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 700,
                                            color: getAverageColor(
                                                dashboardData.annualMarks
                                                    .generalAverage,
                                                20
                                            ),
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {dashboardData.annualMarks.generalAverage?.toFixed(
                                            2
                                        )}
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            /20
                                        </Typography>
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('academic.annualGeneralAverage')}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'info.main',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {dashboardData.annualMarks.rank}
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            /
                                            {
                                                dashboardData.annualMarks
                                                    .classSize
                                            }
                                        </Typography>
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('academic.annualRank')}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    mb: 1,
                                }}
                            >
                                {t('academic.waiting')}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontStyle: 'italic' }}
                            >
                                {t('academic.completeAllTerms')}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mt: 0.5 }}
                            >
                                ({dashboardData.completedTerms}/3{' '}
                                {t('academic.termsCompleted')})
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Financial Situation Section */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        mb: 1.5,
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
                    <BillingIcon sx={{ fontSize: 18 }} />
                    {t('financial.title')}
                </Typography>

                {financialSituation ? (
                    <>
                        <Grid container spacing={1.5} sx={{ mb: 2 }}>
                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.08
                                        ),
                                        border: '1px solid',
                                        borderColor: alpha(
                                            theme.palette.primary.main,
                                            0.15
                                        ),
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mb: 0.5 }}
                                    >
                                        {t('financial.totalFees')}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
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

                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: alpha(
                                            theme.palette.success.main,
                                            0.08
                                        ),
                                        border: '1px solid',
                                        borderColor: alpha(
                                            theme.palette.success.main,
                                            0.15
                                        ),
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mb: 0.5 }}
                                    >
                                        {t('financial.amountPaid')}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
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

                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: alpha(
                                            theme.palette.warning.main,
                                            0.08
                                        ),
                                        border: '1px solid',
                                        borderColor: alpha(
                                            theme.palette.warning.main,
                                            0.15
                                        ),
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mb: 0.5 }}
                                    >
                                        {t('financial.remainingToPay')}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
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

                            <Grid size={{ xs: 6, sm: 3 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: alpha(
                                            theme.palette.error.main,
                                            0.08
                                        ),
                                        border: '1px solid',
                                        borderColor: alpha(
                                            theme.palette.error.main,
                                            0.15
                                        ),
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mb: 0.5 }}
                                    >
                                        {t('financial.amountDue')}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
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

                        {/* Amount Not Paid and Due Amount Summary */}
                        {(financialSituation.remainingToPay > 0 ||
                            financialSituation.amountDue > 0) && (
                            <Grid container spacing={1.5}>
                                {financialSituation.remainingToPay > 0 && (
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 1,
                                                backgroundColor: alpha(
                                                    theme.palette.warning.main,
                                                    0.08
                                                ),
                                                border: 1,
                                                borderColor: alpha(
                                                    theme.palette.warning.main,
                                                    0.3
                                                ),
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: 1,
                                                        backgroundColor: alpha(
                                                            theme.palette
                                                                .warning.main,
                                                            0.15
                                                        ),
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        color: 'warning.main',
                                                    }}
                                                >
                                                    <BillingIcon
                                                        sx={{ fontSize: 16 }}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'warning.main',
                                                            lineHeight: 1.3,
                                                        }}
                                                    >
                                                        {t(
                                                            'financial.unpaidAmount'
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {t(
                                                            'financial.unpaidAmountDescription'
                                                        )}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: 'warning.main',
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        financialSituation.remainingToPay
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}

                                {financialSituation.amountDue > 0 && (
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 1,
                                                backgroundColor: alpha(
                                                    theme.palette.error.main,
                                                    0.08
                                                ),
                                                border: 1,
                                                borderColor: alpha(
                                                    theme.palette.error.main,
                                                    0.3
                                                ),
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: 1,
                                                        backgroundColor: alpha(
                                                            theme.palette.error
                                                                .main,
                                                            0.15
                                                        ),
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        color: 'error.main',
                                                    }}
                                                >
                                                    <DueIcon
                                                        sx={{ fontSize: 16 }}
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'error.main',
                                                            lineHeight: 1.3,
                                                        }}
                                                    >
                                                        {t(
                                                            'financial.dueAmount'
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {t(
                                                            'financial.dueAmountDescription'
                                                        )}
                                                        {financialSituation
                                                            .nextPaymentDue
                                                            ?.dueDate && (
                                                            <span>
                                                                {' '}
                                                                -{' '}
                                                                {t(
                                                                    'financial.dueDate'
                                                                )}
                                                                :{' '}
                                                                {formatDate(
                                                                    financialSituation
                                                                        .nextPaymentDue
                                                                        .dueDate
                                                                )}
                                                            </span>
                                                        )}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: 'error.main',
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        financialSituation.amountDue
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        )}

                        {/* Payment Status Summary */}
                        {financialSituation.paymentStatus === 'paid' && (
                            <Box
                                sx={{
                                    mt: 1.5,
                                    p: 1.5,
                                    borderRadius: 1,
                                    backgroundColor: alpha(
                                        theme.palette.success.main,
                                        0.08
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
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'success.main',
                                    }}
                                >
                                    {t('financial.allPaymentsCurrent')}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {t('financial.noOutstandingAmount')}
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
                                0.08
                            ),
                            borderRadius: 1,
                            border: 1,
                            borderColor: alpha(
                                theme.palette.warning.main,
                                0.15
                            ),
                        }}
                    >
                        <BillingIcon
                            sx={{
                                fontSize: 36,
                                color: 'warning.main',
                                mb: 1,
                            }}
                        />
                        <Typography
                            variant="subtitle2"
                            color="warning.main"
                            sx={{ mb: 0.5, fontWeight: 600 }}
                        >
                            {t('financial.dataNotAvailable')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {t('financial.billingInfoNotLoaded')}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Last Updated */}
            <Box sx={{ textAlign: 'center', py: 1.5 }}>
                <Typography variant="caption" color="text.secondary">
                    {t('common.lastUpdated')}:{' '}
                    {formatLastUpdated(dashboardData.lastUpdated)}
                </Typography>
            </Box>
        </Box>
    );
};
