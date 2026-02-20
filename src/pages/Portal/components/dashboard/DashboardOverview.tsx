/* eslint-disable react-hooks/set-state-in-effect */
import {
    ArrowForward as ArrowForwardIcon,
    CalendarMonth as AttendanceIcon,
    AccountBalance as BillingIcon,
    Quiz as ExaminationIcon,
    Grade as GradeIcon,
    MoreHoriz as MoreHorizIcon,
    Payment as PaymentIcon,
    Person as PersonIcon,
    Refresh as RefreshIcon,
    Assessment as ResultsIcon,
    Schedule as ScheduleIcon,
    School as SchoolIcon,
    TrendingDown as TrendingDownIcon,
    TrendingUp as TrendingUpIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Student } from '../../../../types/student.types';
import { useGetDashboard } from '../../_hooks/useParentWithStore';

interface DashboardOverviewProps {
    selectedStudent: Student | null;
    className?: string;
}

interface DashboardStats {
    currentGPA: number;
    gpaTrend: 'up' | 'down' | 'stable';
    gpaChange: number;
    attendanceRate: number;
    attendanceTrend: 'up' | 'down' | 'stable';
    attendanceChange: number;

    // Billing Summary
    totalOutstanding: number;
    nextPaymentDue: {
        amount: number;
        description: string;
        dueDate: string;
        daysUntilDue: number;
    } | null;
    recentPayments: number;

    // Examination Summary
    upcomingExams: number;
    nextExamDate: string | null;
    unreadExamAnnouncements: number;

    // Results Summary
    newGrades: number;
    lastGradeReceived: {
        subject: string;
        grade: string;
        date: string;
    } | null;

    // Attendance Summary
    weeklyAttendance: number;
    missedClasses: number;

    alertSummary: AlertSummary;
    lastUpdated: string;
}

// interface RecentGrade {
//     id: string;
//     subject: string;
//     assignment: string;
//     grade: string;
//     points: string;
//     teacher: string;
//     dateGraded: string;
//     isNew: boolean;
// }

// interface UpcomingEvent {
//     id: string;
//     title: string;
//     date: string;
//     type: 'assignment' | 'test' | 'event' | 'meeting';
//     subject?: string;
//     teacher?: string;
//     priority: 'low' | 'medium' | 'high';
// }

interface AlertSummary {
    total: number;
    high: number;
    medium: number;
    low: number;
    categories: {
        academic: number;
        attendance: number;
        behavior: number;
    };
}

// interface SubjectPerformanceSummary {
//     subject: string;
//     teacher: string;
//     currentGrade: string;
//     percentage: number;
//     trend: 'up' | 'down' | 'stable';
//     trendChange: number;
//     missingAssignments: number;
//     nextAssignment?: {
//         name: string;
//         dueDate: string;
//     };
// }

// Mock dashboard data
const mockDashboardData: DashboardStats = {
    currentGPA: 3.7,
    gpaTrend: 'up',
    gpaChange: 0.2,
    attendanceRate: 95.2,
    attendanceTrend: 'down',
    attendanceChange: -1.5,

    // Billing Summary
    totalOutstanding: 4825.0,
    nextPaymentDue: {
        amount: 4000.0,
        description: 'Tuition Fee - Term 1, Installment 3',
        dueDate: '2025-02-15T23:59:59Z',
        daysUntilDue: 22,
    },
    recentPayments: 2,

    // Examination Summary
    upcomingExams: 2,
    nextExamDate: '2025-02-05T09:00:00Z',
    unreadExamAnnouncements: 1,

    // Results Summary
    newGrades: 3,
    lastGradeReceived: {
        subject: 'Mathematics',
        grade: 'A-',
        date: '2025-01-18T10:30:00Z',
    },

    // Attendance Summary
    weeklyAttendance: 95.2,
    missedClasses: 2,

    alertSummary: {
        total: 2,
        high: 0,
        medium: 1,
        low: 1,
        categories: {
            academic: 1,
            attendance: 0,
            behavior: 0,
        },
    },
    lastUpdated: '2025-01-24T11:30:00Z',
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data } = useGetDashboard();
    console.log({ data });
    const [dashboardData, setDashboardData] = useState<DashboardStats | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (selectedStudent) {
            // Simulate API call
            setIsLoading(true);
            setTimeout(() => {
                setDashboardData(mockDashboardData);
                setIsLoading(false);
            }, 1000);
        }
    }, [selectedStudent]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        return date.toLocaleDateString();
    };

    const formatCurrency = (amount: number) => {
        return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    };

    const formatUpcomingDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.ceil(
            (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Tomorrow';
        if (diffInDays < 7) return `In ${diffInDays} days`;
        return date.toLocaleDateString();
    };

    // const getGradeColor = (percentage: number) => {
    //     if (percentage >= 90) return theme.palette.success.main;
    //     if (percentage >= 80) return theme.palette.warning.main;
    //     return theme.palette.error.main;
    // };

    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up':
                return (
                    <TrendingUpIcon
                        sx={{ color: theme.palette.success.main, fontSize: 16 }}
                    />
                );
            case 'down':
                return (
                    <TrendingDownIcon
                        sx={{ color: theme.palette.error.main, fontSize: 16 }}
                    />
                );
            default:
                return null;
        }
    };

    if (!selectedStudent) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <SchoolIcon
                            sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
                        />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to view their dashboard
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (isLoading || !dashboardData) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <LinearProgress sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Loading dashboard data...
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box className={className}>
            {/* Compact Header with Student Info */}
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
                    <Avatar
                        src={selectedStudent.avatar}
                        sx={{ width: 32, height: 32 }}
                    >
                        <PersonIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, lineHeight: 1.2 }}
                        >
                            {selectedStudent.fullName}'s Dashboard
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {selectedStudent.grade} •{' '}
                            {selectedStudent.studentId}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.6875rem' }}
                    >
                        Updated {formatDate(dashboardData.lastUpdated)}
                    </Typography>
                    <IconButton size="small" sx={{ p: 0.5 }}>
                        <RefreshIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Summary Metrics - Compact 2x2 Grid */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Billing Summary */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            border: 1,
                            borderColor: 'grey.200',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: 1,
                            },
                        }}
                        onClick={() => navigate('/portal/billing')}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <BillingIcon
                                    sx={{ fontSize: 18, color: 'error.main' }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Outstanding
                                </Typography>
                            </Box>
                            <ArrowForwardIcon
                                sx={{ fontSize: 14, color: 'text.disabled' }}
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'error.main',
                                mb: 0.5,
                            }}
                        >
                            {formatCurrency(dashboardData.totalOutstanding)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Due in{' '}
                            {dashboardData.nextPaymentDue?.daysUntilDue || 0}{' '}
                            days
                        </Typography>
                    </Box>
                </Grid>

                {/* Academic Performance */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            border: 1,
                            borderColor: 'grey.200',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: 'success.main',
                                boxShadow: 1,
                            },
                        }}
                        onClick={() => navigate('/portal/results')}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <ResultsIcon
                                    sx={{ fontSize: 18, color: 'success.main' }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Current GPA
                                </Typography>
                                {dashboardData.newGrades > 0 && (
                                    <Chip
                                        label={`${dashboardData.newGrades} new`}
                                        size="small"
                                        color="success"
                                        sx={{
                                            height: 18,
                                            fontSize: '0.6875rem',
                                        }}
                                    />
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                {getTrendIcon(dashboardData.gpaTrend)}
                                <ArrowForwardIcon
                                    sx={{
                                        fontSize: 14,
                                        color: 'text.disabled',
                                    }}
                                />
                            </Box>
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'success.main',
                                mb: 0.5,
                            }}
                        >
                            {dashboardData.currentGPA.toFixed(1)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {dashboardData.lastGradeReceived
                                ? `Latest: ${dashboardData.lastGradeReceived.subject} - ${dashboardData.lastGradeReceived.grade}`
                                : 'No recent grades'}
                        </Typography>
                    </Box>
                </Grid>

                {/* Examinations */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            border: 1,
                            borderColor: 'grey.200',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: 'warning.main',
                                boxShadow: 1,
                            },
                        }}
                        onClick={() => navigate('/portal/examinations')}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <ExaminationIcon
                                    sx={{ fontSize: 18, color: 'warning.main' }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Upcoming Exams
                                </Typography>
                                {dashboardData.unreadExamAnnouncements > 0 && (
                                    <Chip
                                        label={`${dashboardData.unreadExamAnnouncements} new`}
                                        size="small"
                                        color="warning"
                                        sx={{
                                            height: 18,
                                            fontSize: '0.6875rem',
                                        }}
                                    />
                                )}
                            </Box>
                            <ArrowForwardIcon
                                sx={{ fontSize: 14, color: 'text.disabled' }}
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'warning.main',
                                mb: 0.5,
                            }}
                        >
                            {dashboardData.upcomingExams}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Next:{' '}
                            {dashboardData.nextExamDate
                                ? formatUpcomingDate(dashboardData.nextExamDate)
                                : 'None scheduled'}
                        </Typography>
                    </Box>
                </Grid>

                {/* Attendance */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            border: 1,
                            borderColor: 'grey.200',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: 'info.main',
                                boxShadow: 1,
                            },
                        }}
                        onClick={() => navigate('/portal/attendance')}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <AttendanceIcon
                                    sx={{ fontSize: 18, color: 'info.main' }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Attendance
                                </Typography>
                                {getTrendIcon(dashboardData.attendanceTrend)}
                            </Box>
                            <ArrowForwardIcon
                                sx={{ fontSize: 14, color: 'text.disabled' }}
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'info.main',
                                mb: 0.5,
                            }}
                        >
                            {dashboardData.weeklyAttendance.toFixed(1)}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {dashboardData.missedClasses} missed this week
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Priority Alerts - Compact Banner Style */}
            {(dashboardData.nextPaymentDue ||
                dashboardData.nextExamDate ||
                dashboardData.newGrades > 0 ||
                dashboardData.missedClasses > 0) && (
                <Box sx={{ mb: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                        >
                            Priority Items
                        </Typography>
                        <Chip
                            label={`${dashboardData.alertSummary.total} active`}
                            color={
                                dashboardData.alertSummary.total > 0
                                    ? 'warning'
                                    : 'success'
                            }
                            size="small"
                            sx={{ height: 18, fontSize: '0.6875rem' }}
                        />
                    </Box>

                    <Grid container spacing={1.5}>
                        {/* Payment Due Alert */}
                        {dashboardData.nextPaymentDue && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        backgroundColor: alpha(
                                            theme.palette.error.main,
                                            0.05
                                        ),
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: alpha(
                                            theme.palette.error.main,
                                            0.2
                                        ),
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.error.main,
                                                0.1
                                            ),
                                        },
                                    }}
                                    onClick={() => navigate('/portal/billing')}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 0.5,
                                        }}
                                    >
                                        <PaymentIcon
                                            sx={{
                                                fontSize: 16,
                                                color: 'error.main',
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'error.main',
                                            }}
                                        >
                                            Payment Due Soon
                                        </Typography>
                                        <Box sx={{ ml: 'auto' }}>
                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: 'error.main',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: '0.8125rem', mb: 0.5 }}
                                    >
                                        {formatCurrency(
                                            dashboardData.nextPaymentDue.amount
                                        )}{' '}
                                        •{' '}
                                        {
                                            dashboardData.nextPaymentDue
                                                .daysUntilDue
                                        }{' '}
                                        days
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.6875rem' }}
                                    >
                                        {
                                            dashboardData.nextPaymentDue
                                                .description
                                        }
                                    </Typography>
                                </Box>
                            </Grid>
                        )}

                        {/* Exam Reminder */}
                        {dashboardData.nextExamDate && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        backgroundColor: alpha(
                                            theme.palette.warning.main,
                                            0.05
                                        ),
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: alpha(
                                            theme.palette.warning.main,
                                            0.2
                                        ),
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.warning.main,
                                                0.1
                                            ),
                                        },
                                    }}
                                    onClick={() =>
                                        navigate('/portal/examinations')
                                    }
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 0.5,
                                        }}
                                    >
                                        <ScheduleIcon
                                            sx={{
                                                fontSize: 16,
                                                color: 'warning.main',
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'warning.main',
                                            }}
                                        >
                                            Upcoming Exam
                                        </Typography>
                                        <Box sx={{ ml: 'auto' }}>
                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: 'warning.main',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: '0.8125rem', mb: 0.5 }}
                                    >
                                        Mathematics Midterm •{' '}
                                        {formatUpcomingDate(
                                            dashboardData.nextExamDate
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.6875rem' }}
                                    >
                                        Examination Hall A
                                    </Typography>
                                </Box>
                            </Grid>
                        )}

                        {/* New Grades Alert */}
                        {dashboardData.newGrades > 0 && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        backgroundColor: alpha(
                                            theme.palette.success.main,
                                            0.05
                                        ),
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: alpha(
                                            theme.palette.success.main,
                                            0.2
                                        ),
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.success.main,
                                                0.1
                                            ),
                                        },
                                    }}
                                    onClick={() => navigate('/portal/results')}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 0.5,
                                        }}
                                    >
                                        <GradeIcon
                                            sx={{
                                                fontSize: 16,
                                                color: 'success.main',
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'success.main',
                                            }}
                                        >
                                            New Grades Available
                                        </Typography>
                                        <Box sx={{ ml: 'auto' }}>
                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: 'success.main',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: '0.8125rem', mb: 0.5 }}
                                    >
                                        {dashboardData.newGrades} new grade
                                        {dashboardData.newGrades > 1
                                            ? 's'
                                            : ''}{' '}
                                        posted
                                    </Typography>
                                    {dashboardData.lastGradeReceived && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontSize: '0.6875rem' }}
                                        >
                                            Latest:{' '}
                                            {
                                                dashboardData.lastGradeReceived
                                                    .subject
                                            }{' '}
                                            -{' '}
                                            {
                                                dashboardData.lastGradeReceived
                                                    .grade
                                            }
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        )}

                        {/* Attendance Notice */}
                        {dashboardData.missedClasses > 0 && (
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        backgroundColor: alpha(
                                            theme.palette.info.main,
                                            0.05
                                        ),
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: alpha(
                                            theme.palette.info.main,
                                            0.2
                                        ),
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.info.main,
                                                0.1
                                            ),
                                        },
                                    }}
                                    onClick={() =>
                                        navigate('/portal/attendance')
                                    }
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 0.5,
                                        }}
                                    >
                                        <WarningIcon
                                            sx={{
                                                fontSize: 16,
                                                color: 'info.main',
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'info.main',
                                            }}
                                        >
                                            Attendance Notice
                                        </Typography>
                                        <Box sx={{ ml: 'auto' }}>
                                            <ArrowForwardIcon
                                                sx={{
                                                    fontSize: 14,
                                                    color: 'info.main',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: '0.8125rem', mb: 0.5 }}
                                    >
                                        {dashboardData.missedClasses} class
                                        {dashboardData.missedClasses > 1
                                            ? 'es'
                                            : ''}{' '}
                                        missed this week
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.6875rem' }}
                                    >
                                        Current attendance:{' '}
                                        {dashboardData.weeklyAttendance.toFixed(
                                            1
                                        )}
                                        %
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )}

            {/* Recent Activity Timeline - Compact */}
            <Box
                sx={{
                    p: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'grey.200',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1.5,
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Recent Activity
                    </Typography>
                    <IconButton size="small" sx={{ p: 0.5 }}>
                        <MoreHorizIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>

                {/* Compact activity list */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            py: 0.5,
                        }}
                    >
                        <GradeIcon
                            sx={{ fontSize: 14, color: 'success.main' }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: '0.8125rem' }}
                            >
                                New grade posted in Mathematics
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.6875rem' }}
                            >
                                2 hours ago
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'success.main',
                                fontSize: '0.8125rem',
                            }}
                        >
                            A-
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 0.5 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            py: 0.5,
                        }}
                    >
                        <AttendanceIcon
                            sx={{ fontSize: 14, color: 'info.main' }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: '0.8125rem' }}
                            >
                                Attended all classes today
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.6875rem' }}
                            >
                                6 hours ago
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'info.main',
                                fontSize: '0.8125rem',
                            }}
                        >
                            100%
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 0.5 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            py: 0.5,
                        }}
                    >
                        <ExaminationIcon
                            sx={{ fontSize: 14, color: 'warning.main' }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: '0.8125rem' }}
                            >
                                Math exam scheduled
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.6875rem' }}
                            >
                                Yesterday
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'warning.main',
                                fontSize: '0.8125rem',
                            }}
                        >
                            Feb 5
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
