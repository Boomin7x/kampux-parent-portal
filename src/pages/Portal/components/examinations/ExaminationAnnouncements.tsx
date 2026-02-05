/* eslint-disable react-hooks/set-state-in-effect */
import {
    Announcement as AnnouncementIcon,
    Attachment as AttachmentIcon,
    CalendarToday as CalendarIcon,
    CheckCircle,
    CheckCircle as CompletedIcon,
    Quiz as ExamIcon,
    ExpandMore as ExpandMoreIcon,
    PriorityHigh as HighPriorityIcon,
    Info as InfoIcon,
    NavigateBefore,
    NavigateNext,
    Refresh as RefreshIcon,
    Schedule as ScheduleIcon,
    LocationOn as VenueIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    alpha,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    Paper,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { ExaminationOverview } from '../../../../types/examination.types';
import type { Student } from '../../../../types/student.types';

interface ExaminationAnnouncementsProps {
    selectedStudent: Student | null;
    className?: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`exam-tabpanel-${index}`}
            aria-labelledby={`exam-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

// Mock examination data
const mockExaminationData: ExaminationOverview = {
    studentId: 'student1',
    currentTerm: 'Term 1',
    academicYear: '2024-2025',
    upcomingExams: [
        {
            id: 'exam_1',
            subject: 'Mathematics',
            examType: 'midterm',
            examDate: '2025-02-05T09:00:00Z',
            startTime: '09:00',
            endTime: '11:00',
            duration: 120,
            venue: {
                id: 'venue_1',
                name: 'Examination Hall A',
                building: 'Academic Block',
                floor: 2,
                capacity: 150,
                facilities: [
                    'Air conditioning',
                    'Individual desks',
                    'CCTV monitoring',
                ],
                instructions: [
                    'Arrive 30 minutes early',
                    'Bring photo ID',
                    'No electronic devices',
                ],
            },
            teacher: {
                id: 'teacher_1',
                name: 'Ms. Rodriguez',
                title: 'Senior Mathematics Teacher',
                subject: 'Mathematics',
                department: 'Mathematics Department',
                email: 'mrodriguez@excellenceacademy.edu',
                phone: '+1-555-0123',
            },
            examiner: {
                id: 'examiner_1',
                name: 'Dr. Johnson',
                title: 'Mathematics Department Head',
                subject: 'Mathematics',
                department: 'Mathematics Department',
                email: 'djohnson@excellenceacademy.edu',
            },
            instructions: [
                'Calculators are allowed for sections B and C only',
                'Show all working clearly',
                'Use pen for final answers, pencil for rough work',
                'Read questions carefully before answering',
            ],
            materialsRequired: [
                'Black/Blue pen',
                'Pencil',
                'Eraser',
                'Ruler',
                'Scientific calculator',
            ],
            materialsNotAllowed: [
                'Mobile phones',
                'Smart watches',
                'Notes',
                'Formula sheets',
            ],
            syllabusCovered: [
                'Algebra',
                'Geometry',
                'Trigonometry',
                'Statistics',
            ],
            totalMarks: 100,
            passingMarks: 50,
            status: 'scheduled',
            priority: 'high',
            daysUntilExam: 12,
        },
        {
            id: 'exam_2',
            subject: 'Physics',
            examType: 'final',
            examDate: '2025-02-10T14:00:00Z',
            startTime: '14:00',
            endTime: '16:30',
            duration: 150,
            venue: {
                id: 'venue_2',
                name: 'Science Laboratory 1',
                building: 'Science Block',
                floor: 1,
                capacity: 40,
                facilities: [
                    'Laboratory equipment',
                    'Practical setup',
                    'Emergency exits',
                ],
                instructions: [
                    'Laboratory safety rules apply',
                    'Wear closed shoes',
                ],
            },
            teacher: {
                id: 'teacher_2',
                name: 'Dr. Thompson',
                title: 'Physics Teacher',
                subject: 'Physics',
                department: 'Science Department',
                email: 'dthompson@excellenceacademy.edu',
            },
            instructions: [
                'Practical component worth 40% of total marks',
                'Theoretical component worth 60% of total marks',
                'Safety equipment will be provided',
            ],
            materialsRequired: [
                'Laboratory coat',
                'Safety goggles',
                'Black pen',
                'Calculator',
            ],
            materialsNotAllowed: [
                'Personal laboratory equipment',
                'Formula books',
            ],
            syllabusCovered: [
                'Mechanics',
                'Thermodynamics',
                'Optics',
                'Electricity',
            ],
            totalMarks: 100,
            passingMarks: 50,
            status: 'scheduled',
            priority: 'high',
            daysUntilExam: 17,
        },
    ],
    recentExams: [
        {
            id: 'recent_1',
            subject: 'English',
            examType: 'quiz',
            examDate: '2025-01-15T10:00:00Z',
            venue: {
                id: 'venue_3',
                name: 'Classroom 205',
                building: 'Academic Block',
                capacity: 30,
                facilities: [],
            },
            teacher: {
                id: 'teacher_3',
                name: 'Ms. Davis',
                title: 'English Teacher',
                subject: 'English',
                department: 'Languages Department',
                email: 'mdavis@excellenceacademy.edu',
            },
            marksObtained: 45,
            totalMarks: 50,
            grade: 'A',
            percentage: 90,
            status: 'graded',
        },
    ],
    examAnnouncements: [
        {
            id: 'announcement_1',
            title: 'Mathematics Midterm Exam - Important Instructions',
            message:
                'Please note that calculators will only be allowed for sections B and C of the Mathematics midterm exam. Students must bring their own scientific calculators. Graphing calculators are not permitted.',
            type: 'subject_specific',
            priority: 'high',
            targetAudience: 'specific_subject',
            subjects: ['Mathematics'],
            publishedDate: '2025-01-20T10:00:00Z',
            publishedBy: {
                id: 'teacher_1',
                name: 'Ms. Rodriguez',
                title: 'Senior Mathematics Teacher',
                subject: 'Mathematics',
                department: 'Mathematics Department',
                email: 'mrodriguez@excellenceacademy.edu',
            },
            isRead: false,
        },
        {
            id: 'announcement_2',
            title: 'Examination Hall Venue Change',
            message:
                'The Physics final examination venue has been changed from Science Lab 2 to Science Lab 1 due to equipment maintenance. Please check your examination slip for confirmation.',
            type: 'venue_change',
            priority: 'medium',
            targetAudience: 'specific_subject',
            subjects: ['Physics'],
            publishedDate: '2025-01-22T14:30:00Z',
            effectiveDate: '2025-02-10T14:00:00Z',
            publishedBy: {
                id: 'teacher_2',
                name: 'Dr. Thompson',
                title: 'Physics Teacher',
                subject: 'Physics',
                department: 'Science Department',
                email: 'dthompson@excellenceacademy.edu',
            },
            isRead: true,
        },
        {
            id: 'announcement_3',
            title: 'General Examination Guidelines',
            message:
                'All students are reminded to arrive at least 30 minutes before their scheduled examination time. Late arrivals will not be permitted entry after 15 minutes from the start time.',
            type: 'general',
            priority: 'medium',
            targetAudience: 'all_students',
            publishedDate: '2025-01-18T09:00:00Z',
            publishedBy: {
                id: 'admin_1',
                name: 'Mr. Wilson',
                title: 'Examinations Coordinator',
                subject: 'Administration',
                department: 'Academic Affairs',
                email: 'kwilson@excellenceacademy.edu',
            },
            isRead: true,
        },
    ],
    examCalendar: [
        {
            id: 'cal_1',
            title: 'Mathematics Midterm',
            subject: 'Mathematics',
            examType: 'midterm',
            startDate: '2025-02-05T09:00:00Z',
            endDate: '2025-02-05T11:00:00Z',
            startTime: '09:00',
            endTime: '11:00',
            venue: {
                id: 'venue_1',
                name: 'Examination Hall A',
                building: 'Academic Block',
                capacity: 150,
                facilities: [],
            },
            color: '#1976d2',
            isAllDay: false,
        },
        {
            id: 'cal_2',
            title: 'Physics Final',
            subject: 'Physics',
            examType: 'final',
            startDate: '2025-02-10T14:00:00Z',
            endDate: '2025-02-10T16:30:00Z',
            startTime: '14:00',
            endTime: '16:30',
            venue: {
                id: 'venue_2',
                name: 'Science Laboratory 1',
                building: 'Science Block',
                capacity: 40,
                facilities: [],
            },
            color: '#d32f2f',
            isAllDay: false,
        },
    ],
    generalInstructions: [
        {
            id: 'inst_1',
            category: 'general',
            title: 'Arrival Time',
            description:
                'Students must arrive at least 30 minutes before the examination start time.',
            priority: 'high',
            applicableFor: 'all_exams',
            icon: 'schedule',
        },
        {
            id: 'inst_2',
            category: 'general',
            title: 'Identification Required',
            description:
                'Valid student ID card must be presented before entering the examination hall.',
            priority: 'high',
            applicableFor: 'all_exams',
            icon: 'badge',
        },
        {
            id: 'inst_3',
            category: 'general',
            title: 'Electronic Devices',
            description:
                'Mobile phones, smart watches, and other electronic devices are strictly prohibited.',
            priority: 'high',
            applicableFor: 'all_exams',
            icon: 'phone',
        },
    ],
    lastUpdated: '2025-01-24T16:00:00Z',
};

// Mock data for upcoming exams in the new tabs
const mockUpcomingExams = [
    {
        id: 'upcoming_1',
        subject: 'Physics',
        type: 'Final',
        date: '2025-02-10',
        time: '09:00 AM',
        venue: 'Lab Block - Room 201',
        status: 'upcoming',
        preparedness: 75,
    },
    {
        id: 'upcoming_2',
        subject: 'Chemistry',
        type: 'Practical',
        date: '2025-02-12',
        time: '02:00 PM',
        venue: 'Lab Block - Room 301',
        status: 'preparing',
        preparedness: 60,
    },
    {
        id: 'upcoming_3',
        subject: 'English',
        type: 'Essay',
        date: '2025-02-15',
        time: '10:00 AM',
        venue: 'Main Building - Hall C',
        status: 'upcoming',
        preparedness: 85,
    },
    {
        id: 'upcoming_4',
        subject: 'History',
        type: 'Oral',
        date: '2025-02-18',
        time: '11:00 AM',
        venue: 'Arts Building - Room 105',
        status: 'preparing',
        preparedness: 50,
    },
];

// Helper function to get status color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'upcoming':
            return '#2563eb'; // blue
        case 'preparing':
            return '#d97706'; // orange
        case 'completed':
            return '#059669'; // green
        case 'in_progress':
            return '#dc2626'; // red
        default:
            return '#6b7280'; // gray
    }
};

export const ExaminationAnnouncements: React.FC<
    ExaminationAnnouncementsProps
> = ({ selectedStudent, className = '' }) => {
    const theme = useTheme();
    const [examinationData, setExaminationData] =
        useState<ExaminationOverview | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (selectedStudent) {
            setIsLoading(true);
            setTimeout(() => {
                setExaminationData(mockExaminationData);
                setIsLoading(false);
            }, 1000);
        }
    }, [selectedStudent]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    // const formatTime = (dateString: string) => {
    //     return new Date(dateString).toLocaleTimeString('en-US', {
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         hour12: true,
    //     });
    // };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString(
            'en-US',
            {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }
        )}`;
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return theme.palette.error.main;
            case 'medium':
                return theme.palette.warning.main;
            default:
                return theme.palette.info.main;
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high':
                return (
                    <HighPriorityIcon
                        sx={{ color: theme.palette.error.main }}
                    />
                );
            case 'medium':
                return (
                    <WarningIcon sx={{ color: theme.palette.warning.main }} />
                );
            default:
                return <InfoIcon sx={{ color: theme.palette.info.main }} />;
        }
    };

    const getExamTypeColor = (examType: string) => {
        switch (examType) {
            case 'final':
                return theme.palette.error.main;
            case 'midterm':
                return theme.palette.warning.main;
            case 'quiz':
                return theme.palette.info.main;
            default:
                return theme.palette.primary.main;
        }
    };

    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: number
    ) => {
        setTabValue(newValue);
    };

    if (!selectedStudent) {
        return (
            <Paper
                className={className}
                sx={{
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                }}
            >
                <Box sx={{ textAlign: 'center', p: 3 }}>
                    <ExamIcon
                        sx={{ fontSize: 48, color: 'text.disabled', mb: 1.5 }}
                    />
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                    >
                        Select a student to view examination information
                    </Typography>
                </Box>
            </Paper>
        );
    }

    if (isLoading || !examinationData) {
        return (
            <Paper
                className={className}
                sx={{
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                }}
            >
                <Box sx={{ textAlign: 'center', p: 3 }}>
                    <LinearProgress
                        sx={{ mb: 1.5, height: 3, borderRadius: 1.5 }}
                    />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.8125rem' }}
                    >
                        Loading examination data...
                    </Typography>
                </Box>
            </Paper>
        );
    }

    const unreadAnnouncements = examinationData.examAnnouncements.filter(
        a => !a.isRead
    ).length;

    return (
        <Box className={className}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'primary.50',
                            border: '1px solid',
                            borderColor: 'primary.200',
                        }}
                    >
                        <ExamIcon
                            sx={{ color: 'primary.main', fontSize: '1.25rem' }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, fontSize: '1.25rem' }}
                        >
                            Examinations
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                        >
                            {examinationData.currentTerm} •{' '}
                            {examinationData.academicYear}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        Updated {formatDate(examinationData.lastUpdated)}
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'action.hover' },
                        }}
                    >
                        <RefreshIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Paper
                        sx={{
                            p: 2,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                bgcolor: 'primary.main',
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        fontSize: '1.5rem',
                                    }}
                                >
                                    {examinationData.upcomingExams.length}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    UPCOMING EXAMS
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: 'primary.50',
                                    border: '1px solid',
                                    borderColor: 'primary.200',
                                }}
                            >
                                <ExamIcon
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: '1.25rem',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                    <Paper
                        sx={{
                            p: 2,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                bgcolor: 'warning.main',
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'warning.main',
                                        fontSize: '1.5rem',
                                    }}
                                >
                                    {unreadAnnouncements}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    NEW ALERTS
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: 'warning.50',
                                    border: '1px solid',
                                    borderColor: 'warning.200',
                                }}
                            >
                                <AnnouncementIcon
                                    sx={{
                                        color: 'warning.main',
                                        fontSize: '1.25rem',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                    <Paper
                        sx={{
                            p: 2,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                bgcolor: 'info.main',
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'info.main',
                                        fontSize: '1.25rem',
                                    }}
                                >
                                    {examinationData.upcomingExams.length > 0
                                        ? `${examinationData.upcomingExams[0].daysUntilExam}d`
                                        : 'None'}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    NEXT EXAM
                                </Typography>
                                {examinationData.upcomingExams.length > 0 && (
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        sx={{
                                            fontSize: '0.6875rem',
                                            color: 'text.secondary',
                                            mt: 0.25,
                                        }}
                                    >
                                        {
                                            examinationData.upcomingExams[0]
                                                .subject
                                        }
                                    </Typography>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: 'info.50',
                                    border: '1px solid',
                                    borderColor: 'info.200',
                                }}
                            >
                                <ScheduleIcon
                                    sx={{
                                        color: 'info.main',
                                        fontSize: '1.25rem',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                    <Paper
                        sx={{
                            p: 2,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                bgcolor: 'success.main',
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'success.main',
                                        fontSize: '1.5rem',
                                    }}
                                >
                                    {examinationData.recentExams.length}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    RECENT RESULTS
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: 'success.50',
                                    border: '1px solid',
                                    borderColor: 'success.200',
                                }}
                            >
                                <CompletedIcon
                                    sx={{
                                        color: 'success.main',
                                        fontSize: '1.25rem',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Paper
                sx={{
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        bgcolor: 'grey.50',
                    }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                            px: 2,
                            '& .MuiTab-root': {
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'text.secondary',
                                '&.Mui-selected': {
                                    color: 'primary.main',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                height: 3,
                            },
                        }}
                    >
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <AnnouncementIcon
                                        sx={{ fontSize: '1rem' }}
                                    />
                                    <span>Announcements</span>
                                    {unreadAnnouncements > 0 && (
                                        <Chip
                                            label={unreadAnnouncements}
                                            size="small"
                                            sx={{
                                                height: 18,
                                                fontSize: '0.6875rem',
                                                bgcolor: 'error.main',
                                                color: 'white',
                                                '& .MuiChip-label': {
                                                    px: 0.75,
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <ScheduleIcon sx={{ fontSize: '1rem' }} />
                                    <span>Upcoming Exams</span>
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <CalendarIcon sx={{ fontSize: '1rem' }} />
                                    <span>Calendar</span>
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <InfoIcon sx={{ fontSize: '1rem' }} />
                                    <span>Instructions</span>
                                </Box>
                            }
                        />
                    </Tabs>
                </Box>

                {/* Announcements Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ p: 2 }}>
                        {examinationData.examAnnouncements.map(
                            (announcement, _index) => (
                                <Paper
                                    key={announcement.id}
                                    sx={{
                                        p: 2,
                                        mb: 1.5,
                                        boxShadow: 'none',
                                        border: '1px solid',
                                        borderColor: !announcement.isRead
                                            ? 'primary.200'
                                            : 'divider',
                                        borderRadius: 1,
                                        bgcolor: !announcement.isRead
                                            ? 'primary.50'
                                            : 'transparent',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {!announcement.isRead && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: 3,
                                                bgcolor: 'primary.main',
                                            }}
                                        />
                                    )}
                                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                                        <Box
                                            sx={{
                                                p: 0.75,
                                                borderRadius: 1,
                                                bgcolor: alpha(
                                                    getPriorityColor(
                                                        announcement.priority
                                                    ),
                                                    0.1
                                                ),
                                                border: '1px solid',
                                                borderColor: alpha(
                                                    getPriorityColor(
                                                        announcement.priority
                                                    ),
                                                    0.2
                                                ),
                                                minWidth: 36,
                                                height: 36,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {getPriorityIcon(
                                                announcement.priority
                                            )}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    mb: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight:
                                                            !announcement.isRead
                                                                ? 700
                                                                : 600,
                                                        fontSize: '0.875rem',
                                                        flex: 1,
                                                    }}
                                                >
                                                    {announcement.title}
                                                </Typography>
                                                <Chip
                                                    label={announcement.type.replace(
                                                        '_',
                                                        ' '
                                                    )}
                                                    size="small"
                                                    sx={{
                                                        height: 20,
                                                        fontSize: '0.6875rem',
                                                        fontWeight: 600,
                                                        textTransform:
                                                            'uppercase',
                                                        bgcolor: alpha(
                                                            getPriorityColor(
                                                                announcement.priority
                                                            ),
                                                            0.1
                                                        ),
                                                        color: getPriorityColor(
                                                            announcement.priority
                                                        ),
                                                        border: '1px solid',
                                                        borderColor: alpha(
                                                            getPriorityColor(
                                                                announcement.priority
                                                            ),
                                                            0.2
                                                        ),
                                                    }}
                                                />
                                                {!announcement.isRead && (
                                                    <Chip
                                                        label="UNREAD"
                                                        size="small"
                                                        sx={{
                                                            height: 20,
                                                            fontSize:
                                                                '0.6875rem',
                                                            fontWeight: 600,
                                                            bgcolor:
                                                                'primary.main',
                                                            color: 'white',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 1,
                                                    fontSize: '0.8125rem',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {announcement.message}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                    flexWrap: 'wrap',
                                                    gap: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ fontSize: '0.75rem' }}
                                                >
                                                    By{' '}
                                                    {
                                                        announcement.publishedBy
                                                            .name
                                                    }{' '}
                                                    •{' '}
                                                    {formatDateTime(
                                                        announcement.publishedDate
                                                    )}
                                                </Typography>
                                                {announcement.subjects && (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        {announcement.subjects.map(
                                                            subject => (
                                                                <Chip
                                                                    key={
                                                                        subject
                                                                    }
                                                                    label={
                                                                        subject
                                                                    }
                                                                    size="small"
                                                                    sx={{
                                                                        height: 18,
                                                                        fontSize:
                                                                            '0.6875rem',
                                                                        bgcolor:
                                                                            'grey.100',
                                                                        color: 'text.secondary',
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                )}
                                            </Box>
                                            {announcement.attachments &&
                                                announcement.attachments
                                                    .length > 0 && (
                                                    <Box sx={{ mt: 1 }}>
                                                        <Chip
                                                            icon={
                                                                <AttachmentIcon
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.875rem',
                                                                    }}
                                                                />
                                                            }
                                                            label={`${announcement.attachments.length} attachment${announcement.attachments.length > 1 ? 's' : ''}`}
                                                            size="small"
                                                            clickable
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                height: 24,
                                                                bgcolor:
                                                                    'info.50',
                                                                color: 'info.main',
                                                                border: '1px solid',
                                                                borderColor:
                                                                    'info.200',
                                                                '&:hover': {
                                                                    bgcolor:
                                                                        'info.100',
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                )}
                                        </Box>
                                    </Box>
                                </Paper>
                            )
                        )}
                    </Box>
                </TabPanel>

                {/* Upcoming Exams Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Grid container spacing={3}>
                            {examinationData.upcomingExams.map(exam => (
                                <Grid size={{ xs: 12 }} key={exam.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'flex-start',
                                                    mb: 2,
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {exam.subject} -{' '}
                                                        {exam.examType
                                                            .replace('_', ' ')
                                                            .toUpperCase()}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 2,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <ScheduleIcon
                                                                fontSize="small"
                                                                color="action"
                                                            />
                                                            <Typography variant="body2">
                                                                {formatDate(
                                                                    exam.examDate
                                                                )}{' '}
                                                                •{' '}
                                                                {exam.startTime}{' '}
                                                                - {exam.endTime}
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <VenueIcon
                                                                fontSize="small"
                                                                color="action"
                                                            />
                                                            <Typography variant="body2">
                                                                {
                                                                    exam.venue
                                                                        .name
                                                                }
                                                                ,{' '}
                                                                {
                                                                    exam.venue
                                                                        .building
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{ textAlign: 'right' }}
                                                >
                                                    <Chip
                                                        label={`${exam.daysUntilExam} days left`}
                                                        sx={{
                                                            backgroundColor:
                                                                alpha(
                                                                    getExamTypeColor(
                                                                        exam.examType
                                                                    ),
                                                                    0.1
                                                                ),
                                                            color: getExamTypeColor(
                                                                exam.examType
                                                            ),
                                                            fontWeight: 600,
                                                            mb: 1,
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        display="block"
                                                        color="text.secondary"
                                                    >
                                                        {exam.duration} minutes
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        Exam Details:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        Total Marks:{' '}
                                                        {exam.totalMarks}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        Passing Marks:{' '}
                                                        {exam.passingMarks}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Teacher:{' '}
                                                        {exam.teacher.name}
                                                    </Typography>
                                                    {exam.examiner && (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Examiner:{' '}
                                                            {exam.examiner.name}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        Venue Information:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        Capacity:{' '}
                                                        {exam.venue.capacity}{' '}
                                                        students
                                                    </Typography>
                                                    {exam.venue.floor && (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ mb: 0.5 }}
                                                        >
                                                            Floor:{' '}
                                                            {exam.venue.floor}
                                                        </Typography>
                                                    )}
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Facilities:{' '}
                                                        {exam.venue.facilities.join(
                                                            ', '
                                                        )}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Accordion sx={{ mt: 2 }}>
                                                <AccordionSummary
                                                    expandIcon={
                                                        <ExpandMoreIcon />
                                                    }
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        Exam Instructions &
                                                        Materials
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            size={{
                                                                xs: 12,
                                                                md: 4,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 1,
                                                                    color: 'success.main',
                                                                }}
                                                            >
                                                                Required
                                                                Materials:
                                                            </Typography>
                                                            <List
                                                                dense
                                                                sx={{ p: 0 }}
                                                            >
                                                                {exam.materialsRequired.map(
                                                                    (
                                                                        material,
                                                                        idx
                                                                    ) => (
                                                                        <ListItem
                                                                            key={
                                                                                idx
                                                                            }
                                                                            sx={{
                                                                                px: 0,
                                                                                py: 0.25,
                                                                            }}
                                                                        >
                                                                            <Typography variant="body2">
                                                                                •{' '}
                                                                                {
                                                                                    material
                                                                                }
                                                                            </Typography>
                                                                        </ListItem>
                                                                    )
                                                                )}
                                                            </List>
                                                        </Grid>
                                                        <Grid
                                                            size={{
                                                                xs: 12,
                                                                md: 4,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 1,
                                                                    color: 'error.main',
                                                                }}
                                                            >
                                                                Not Allowed:
                                                            </Typography>
                                                            <List
                                                                dense
                                                                sx={{ p: 0 }}
                                                            >
                                                                {exam.materialsNotAllowed.map(
                                                                    (
                                                                        material,
                                                                        idx
                                                                    ) => (
                                                                        <ListItem
                                                                            key={
                                                                                idx
                                                                            }
                                                                            sx={{
                                                                                px: 0,
                                                                                py: 0.25,
                                                                            }}
                                                                        >
                                                                            <Typography variant="body2">
                                                                                •{' '}
                                                                                {
                                                                                    material
                                                                                }
                                                                            </Typography>
                                                                        </ListItem>
                                                                    )
                                                                )}
                                                            </List>
                                                        </Grid>
                                                        <Grid
                                                            size={{
                                                                xs: 12,
                                                                md: 4,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 1,
                                                                    color: 'info.main',
                                                                }}
                                                            >
                                                                Syllabus
                                                                Covered:
                                                            </Typography>
                                                            <List
                                                                dense
                                                                sx={{ p: 0 }}
                                                            >
                                                                {exam.syllabusCovered.map(
                                                                    (
                                                                        topic,
                                                                        idx
                                                                    ) => (
                                                                        <ListItem
                                                                            key={
                                                                                idx
                                                                            }
                                                                            sx={{
                                                                                px: 0,
                                                                                py: 0.25,
                                                                            }}
                                                                        >
                                                                            <Typography variant="body2">
                                                                                •{' '}
                                                                                {
                                                                                    topic
                                                                                }
                                                                            </Typography>
                                                                        </ListItem>
                                                                    )
                                                                )}
                                                            </List>
                                                        </Grid>
                                                    </Grid>

                                                    <Box sx={{ mt: 2 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontWeight: 600,
                                                                mb: 1,
                                                            }}
                                                        >
                                                            Special
                                                            Instructions:
                                                        </Typography>
                                                        <List
                                                            dense
                                                            sx={{ p: 0 }}
                                                        >
                                                            {exam.instructions.map(
                                                                (
                                                                    instruction,
                                                                    idx
                                                                ) => (
                                                                    <ListItem
                                                                        key={
                                                                            idx
                                                                        }
                                                                        sx={{
                                                                            px: 0,
                                                                            py: 0.25,
                                                                        }}
                                                                    >
                                                                        <Typography variant="body2">
                                                                            •{' '}
                                                                            {
                                                                                instruction
                                                                            }
                                                                        </Typography>
                                                                    </ListItem>
                                                                )
                                                            )}
                                                        </List>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </TabPanel>

                {/* Exam Calendar Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 2, textAlign: 'center' }}
                        >
                            Examination calendar view will be implemented with a
                            calendar component.
                        </Typography>
                        <Grid container spacing={2}>
                            {examinationData.examCalendar.map(event => (
                                <Grid size={{ xs: 12, md: 6 }} key={event.id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            borderLeft: `4px solid ${event.color}`,
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {event.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 1 }}
                                            >
                                                {event.subject} •{' '}
                                                {event.examType
                                                    .replace('_', ' ')
                                                    .toUpperCase()}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    mb: 1,
                                                }}
                                            >
                                                <ScheduleIcon
                                                    fontSize="small"
                                                    color="action"
                                                />
                                                <Typography variant="body2">
                                                    {formatDate(
                                                        event.startDate
                                                    )}{' '}
                                                    • {event.startTime} -{' '}
                                                    {event.endTime}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}
                                            >
                                                <VenueIcon
                                                    fontSize="small"
                                                    color="action"
                                                />
                                                <Typography variant="body2">
                                                    {event.venue.name},{' '}
                                                    {event.venue.building}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </TabPanel>

                {/* General Instructions Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Grid container spacing={3}>
                            {examinationData.generalInstructions.map(
                                instruction => (
                                    <Grid
                                        size={{ xs: 12, md: 6 }}
                                        key={instruction.id}
                                    >
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        mb: 2,
                                                    }}
                                                >
                                                    {getPriorityIcon(
                                                        instruction.priority
                                                    )}
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            ml: 1,
                                                        }}
                                                    >
                                                        {instruction.title}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ mb: 2 }}
                                                >
                                                    {instruction.description}
                                                </Typography>
                                                <Chip
                                                    label={instruction.category
                                                        .replace('_', ' ')
                                                        .toUpperCase()}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Box>
                </TabPanel>

                {/* Upcoming Exams Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ p: 0 }}>
                        {/* Header with filter chips */}
                        <Box
                            sx={{
                                mb: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    flexWrap: 'wrap',
                                }}
                            >
                                {[
                                    'All',
                                    'This Week',
                                    'Next Week',
                                    'This Month',
                                ].map(filter => (
                                    <Chip
                                        key={filter}
                                        label={filter}
                                        size="small"
                                        variant={
                                            filter === 'All'
                                                ? 'filled'
                                                : 'outlined'
                                        }
                                        sx={{
                                            fontSize: '0.6875rem',
                                            height: 28,
                                            bgcolor:
                                                filter === 'All'
                                                    ? 'primary.main'
                                                    : 'transparent',
                                            color:
                                                filter === 'All'
                                                    ? 'white'
                                                    : 'text.secondary',
                                            borderColor:
                                                filter === 'All'
                                                    ? 'primary.main'
                                                    : 'divider',
                                            '&:hover': {
                                                bgcolor:
                                                    filter === 'All'
                                                        ? 'primary.dark'
                                                        : 'action.hover',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                }}
                            >
                                {mockUpcomingExams.length} upcoming exams
                            </Typography>
                        </Box>

                        {/* Timeline View */}
                        <Box sx={{ position: 'relative' }}>
                            {/* Timeline line */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: 24,
                                    top: 0,
                                    bottom: 0,
                                    width: 2,
                                    bgcolor: 'divider',
                                    zIndex: 0,
                                }}
                            />

                            {mockUpcomingExams.map((exam, _index) => (
                                <Box
                                    key={exam.id}
                                    sx={{ position: 'relative', mb: 3 }}
                                >
                                    {/* Timeline dot */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: 16,
                                            top: 12,
                                            width: 16,
                                            height: 16,
                                            borderRadius: '50%',
                                            bgcolor: getStatusColor(
                                                exam.status
                                            ),
                                            zIndex: 1,
                                            border: '3px solid white',
                                            boxShadow: `0 0 0 3px ${alpha(getStatusColor(exam.status), 0.2)}`,
                                        }}
                                    />

                                    {/* Exam card */}
                                    <Box sx={{ ml: 6, position: 'relative' }}>
                                        <Card
                                            sx={{
                                                boxShadow: 'none',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    transform:
                                                        'translateY(-2px)',
                                                    transition:
                                                        'all 0.2s ease-in-out',
                                                },
                                            }}
                                        >
                                            {/* Status accent bar */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: 4,
                                                    bgcolor: getStatusColor(
                                                        exam.status
                                                    ),
                                                }}
                                            />

                                            <CardContent sx={{ p: 3 }}>
                                                {/* Header */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems:
                                                            'flex-start',
                                                        justifyContent:
                                                            'space-between',
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontSize:
                                                                    '1rem',
                                                                fontWeight: 700,
                                                                color: 'primary.main',
                                                                mb: 0.5,
                                                            }}
                                                        >
                                                            {exam.subject}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize:
                                                                    '0.8125rem',
                                                                color: 'text.secondary',
                                                                textTransform:
                                                                    'capitalize',
                                                            }}
                                                        >
                                                            {exam.type}{' '}
                                                            Examination
                                                        </Typography>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            textAlign: 'right',
                                                        }}
                                                    >
                                                        <Chip
                                                            label={exam.status}
                                                            size="small"
                                                            sx={{
                                                                fontSize:
                                                                    '0.6875rem',
                                                                height: 24,
                                                                bgcolor: alpha(
                                                                    getStatusColor(
                                                                        exam.status
                                                                    ),
                                                                    0.1
                                                                ),
                                                                color: getStatusColor(
                                                                    exam.status
                                                                ),
                                                                border: `1px solid ${alpha(getStatusColor(exam.status), 0.2)}`,
                                                                textTransform:
                                                                    'capitalize',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                                {/* Details Grid */}
                                                <Box
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns:
                                                            'repeat(auto-fit, minmax(150px, 1fr))',
                                                        gap: 2,
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            bgcolor: 'grey.50',
                                                            p: 1.5,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <CalendarIcon
                                                            sx={{
                                                                fontSize: 16,
                                                                color: 'primary.main',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                    color: 'text.secondary',
                                                                    display:
                                                                        'block',
                                                                }}
                                                            >
                                                                Date
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {exam.date}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            bgcolor: 'grey.50',
                                                            p: 1.5,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <ScheduleIcon
                                                            sx={{
                                                                fontSize: 16,
                                                                color: 'warning.main',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                    color: 'text.secondary',
                                                                    display:
                                                                        'block',
                                                                }}
                                                            >
                                                                Time
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {exam.time}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 1,
                                                            bgcolor: 'grey.50',
                                                            p: 1.5,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <VenueIcon
                                                            sx={{
                                                                fontSize: 16,
                                                                color: 'info.main',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                    color: 'text.secondary',
                                                                    display:
                                                                        'block',
                                                                }}
                                                            >
                                                                Venue
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {exam.venue}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                {/* Preparation Progress */}
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            alignItems:
                                                                'center',
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            Preparation Progress
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: getStatusColor(
                                                                    exam.status
                                                                ),
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {exam.preparedness}%
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={
                                                            exam.preparedness
                                                        }
                                                        sx={{
                                                            height: 6,
                                                            borderRadius: 3,
                                                            bgcolor: 'grey.200',
                                                            '& .MuiLinearProgress-bar':
                                                                {
                                                                    bgcolor:
                                                                        getStatusColor(
                                                                            exam.status
                                                                        ),
                                                                    borderRadius: 3,
                                                                },
                                                        }}
                                                    />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </TabPanel>

                {/* Calendar Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ p: 0 }}>
                        {/* Calendar Header */}
                        <Box sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <CalendarIcon
                                        sx={{
                                            fontSize: 20,
                                            color: 'primary.main',
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                        }}
                                    >
                                        February 2025
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                        }}
                                    >
                                        <NavigateBefore sx={{ fontSize: 16 }} />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                        }}
                                    >
                                        <NavigateNext sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Calendar Legend */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexWrap: 'wrap',
                                }}
                            >
                                {[
                                    {
                                        label: 'Upcoming',
                                        color: '#2563eb',
                                        count: 3,
                                    },
                                    {
                                        label: 'In Progress',
                                        color: '#dc2626',
                                        count: 1,
                                    },
                                    {
                                        label: 'Completed',
                                        color: '#059669',
                                        count: 2,
                                    },
                                ].map(item => (
                                    <Box
                                        key={item.label}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: item.color,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {item.label} ({item.count})
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Mini Calendar Grid */}
                        <Card
                            sx={{
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                mb: 3,
                            }}
                        >
                            <CardContent sx={{ p: 0 }}>
                                {/* Calendar Grid Header */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        bgcolor: 'grey.50',
                                    }}
                                >
                                    {[
                                        'Sun',
                                        'Mon',
                                        'Tue',
                                        'Wed',
                                        'Thu',
                                        'Fri',
                                        'Sat',
                                    ].map(day => (
                                        <Box
                                            key={day}
                                            sx={{
                                                p: 1.5,
                                                textAlign: 'center',
                                                borderBottom: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.6875rem',
                                                    fontWeight: 600,
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {day}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Calendar Days */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                    }}
                                >
                                    {Array.from({ length: 35 }, (_, i) => {
                                        const day = i - 2; // Start calendar from day -2 to show previous month
                                        const isCurrentMonth =
                                            day >= 1 && day <= 28;
                                        const hasExam = [
                                            5, 10, 12, 15, 18, 22, 25,
                                        ].includes(day);
                                        const examStatus =
                                            day === 5
                                                ? 'completed'
                                                : day === 10
                                                  ? 'in_progress'
                                                  : 'upcoming';
                                        const isToday = day === 8;

                                        return (
                                            <Box
                                                key={i}
                                                sx={{
                                                    position: 'relative',
                                                    p: 1,
                                                    height: 48,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderBottom: '1px solid',
                                                    borderRight: '1px solid',
                                                    borderColor: 'divider',
                                                    bgcolor: isToday
                                                        ? 'primary.50'
                                                        : 'transparent',
                                                    '&:hover': hasExam
                                                        ? {
                                                              bgcolor:
                                                                  'action.hover',
                                                          }
                                                        : {},
                                                    cursor: hasExam
                                                        ? 'pointer'
                                                        : 'default',
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: isToday
                                                            ? 700
                                                            : isCurrentMonth
                                                              ? 500
                                                              : 400,
                                                        color: isToday
                                                            ? 'primary.main'
                                                            : isCurrentMonth
                                                              ? 'text.primary'
                                                              : 'text.disabled',
                                                    }}
                                                >
                                                    {day > 0 ? day : day + 31}
                                                </Typography>

                                                {hasExam && (
                                                    <Box
                                                        sx={{
                                                            position:
                                                                'absolute',
                                                            bottom: 2,
                                                            width: 4,
                                                            height: 4,
                                                            borderRadius: '50%',
                                                            bgcolor:
                                                                getStatusColor(
                                                                    examStatus
                                                                ),
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Monthly Timeline */}
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    mb: 2,
                                }}
                            >
                                This Month's Schedule
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5,
                                }}
                            >
                                {[
                                    {
                                        date: '5',
                                        day: 'Wed',
                                        subject: 'Mathematics',
                                        type: 'Final',
                                        time: '09:00 AM',
                                        status: 'completed',
                                    },
                                    {
                                        date: '10',
                                        day: 'Mon',
                                        subject: 'Physics',
                                        type: 'Practical',
                                        time: '02:00 PM',
                                        status: 'in_progress',
                                    },
                                    {
                                        date: '12',
                                        day: 'Wed',
                                        subject: 'Chemistry',
                                        type: 'Theory',
                                        time: '10:00 AM',
                                        status: 'upcoming',
                                    },
                                    {
                                        date: '15',
                                        day: 'Sat',
                                        subject: 'English',
                                        type: 'Essay',
                                        time: '09:00 AM',
                                        status: 'upcoming',
                                    },
                                    {
                                        date: '18',
                                        day: 'Tue',
                                        subject: 'History',
                                        type: 'Oral',
                                        time: '11:00 AM',
                                        status: 'upcoming',
                                    },
                                ].map(exam => (
                                    <Card
                                        key={exam.date}
                                        sx={{
                                            boxShadow: 'none',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            '&:hover': {
                                                borderColor: getStatusColor(
                                                    exam.status
                                                ),
                                                bgcolor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 2 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}
                                            >
                                                {/* Date Circle */}
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        bgcolor: alpha(
                                                            getStatusColor(
                                                                exam.status
                                                            ),
                                                            0.1
                                                        ),
                                                        border: `2px solid ${getStatusColor(exam.status)}`,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize:
                                                                '0.8125rem',
                                                            fontWeight: 700,
                                                            color: getStatusColor(
                                                                exam.status
                                                            ),
                                                        }}
                                                    >
                                                        {exam.date}
                                                    </Typography>
                                                </Box>

                                                {/* Exam Details */}
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize:
                                                                '0.8125rem',
                                                            fontWeight: 600,
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {exam.subject} -{' '}
                                                        {exam.type}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: 'text.secondary',
                                                            }}
                                                        >
                                                            {exam.day}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize:
                                                                    '0.75rem',
                                                                color: 'text.secondary',
                                                            }}
                                                        >
                                                            {exam.time}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                {/* Status Badge */}
                                                <Chip
                                                    label={exam.status.replace(
                                                        '_',
                                                        ' '
                                                    )}
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.6875rem',
                                                        height: 20,
                                                        bgcolor: alpha(
                                                            getStatusColor(
                                                                exam.status
                                                            ),
                                                            0.1
                                                        ),
                                                        color: getStatusColor(
                                                            exam.status
                                                        ),
                                                        border: `1px solid ${alpha(getStatusColor(exam.status), 0.2)}`,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>

                {/* Instructions Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Box sx={{ p: 0 }}>
                        {/* Quick Actions Header */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    mb: 2,
                                }}
                            >
                                Examination Guidelines & Resources
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1.5,
                                    flexWrap: 'wrap',
                                }}
                            >
                                {[
                                    {
                                        label: 'Download Handbook',
                                        icon: (
                                            <AttachmentIcon
                                                sx={{ fontSize: 14 }}
                                            />
                                        ),
                                        color: 'primary',
                                    },
                                    {
                                        label: 'Rules & Regulations',
                                        icon: (
                                            <InfoIcon sx={{ fontSize: 14 }} />
                                        ),
                                        color: 'warning',
                                    },
                                    {
                                        label: 'Emergency Contacts',
                                        icon: (
                                            <WarningIcon
                                                sx={{ fontSize: 14 }}
                                            />
                                        ),
                                        color: 'error',
                                    },
                                    {
                                        label: 'FAQs',
                                        icon: (
                                            <ExamIcon sx={{ fontSize: 14 }} />
                                        ),
                                        color: 'info',
                                    },
                                ].map(action => (
                                    <Chip
                                        key={action.label}
                                        icon={action.icon}
                                        label={action.label}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            fontSize: '0.6875rem',
                                            height: 28,
                                            borderColor: `${action.color}.main`,
                                            color: `${action.color}.main`,
                                            '&:hover': {
                                                bgcolor: `${action.color}.50`,
                                                borderColor: `${action.color}.main`,
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Interactive Instruction Cards */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    md: 'repeat(2, 1fr)',
                                },
                                gap: 3,
                                mb: 3,
                            }}
                        >
                            {/* Pre-Exam Checklist */}
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Header with gradient */}
                                <Box
                                    sx={{
                                        background:
                                            'linear-gradient(135deg, #059669, #10b981)',
                                        color: 'white',
                                        p: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <CheckCircle sx={{ fontSize: 20 }} />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '0.9375rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Pre-Exam Checklist
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            opacity: 0.9,
                                        }}
                                    >
                                        Complete these tasks before exam day
                                    </Typography>
                                </Box>

                                <CardContent sx={{ p: 0 }}>
                                    {[
                                        {
                                            task: 'Arrive 30 minutes before exam time',
                                            completed: true,
                                        },
                                        {
                                            task: 'Bring valid student ID card',
                                            completed: true,
                                        },
                                        {
                                            task: 'Prepare required stationery',
                                            completed: false,
                                        },
                                        {
                                            task: 'Review examination venue details',
                                            completed: false,
                                        },
                                        {
                                            task: 'Get adequate rest (8+ hours)',
                                            completed: false,
                                        },
                                        {
                                            task: 'Eat a healthy breakfast',
                                            completed: false,
                                        },
                                    ].map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                borderBottom:
                                                    index < 5
                                                        ? '1px solid'
                                                        : 'none',
                                                borderColor: 'divider',
                                                bgcolor: item.completed
                                                    ? 'success.50'
                                                    : 'transparent',
                                                '&:hover': {
                                                    bgcolor: 'action.hover',
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: '50%',
                                                    bgcolor: item.completed
                                                        ? 'success.main'
                                                        : 'grey.200',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {item.completed && (
                                                    <CheckCircle
                                                        sx={{
                                                            fontSize: 12,
                                                            color: 'white',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.8125rem',
                                                    textDecoration:
                                                        item.completed
                                                            ? 'line-through'
                                                            : 'none',
                                                    color: item.completed
                                                        ? 'text.secondary'
                                                        : 'text.primary',
                                                }}
                                            >
                                                {item.task}
                                            </Typography>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Exam Day Guidelines */}
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Header with gradient */}
                                <Box
                                    sx={{
                                        background:
                                            'linear-gradient(135deg, #dc2626, #ef4444)',
                                        color: 'white',
                                        p: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <ExamIcon sx={{ fontSize: 20 }} />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '0.9375rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Exam Day Guidelines
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            opacity: 0.9,
                                        }}
                                    >
                                        Important rules during examination
                                    </Typography>
                                </Box>

                                <CardContent sx={{ p: 0 }}>
                                    {[
                                        {
                                            rule: 'Read all instructions carefully before starting',
                                            priority: 'high',
                                        },
                                        {
                                            rule: 'Manage your time effectively throughout',
                                            priority: 'high',
                                        },
                                        {
                                            rule: 'No electronic devices are allowed',
                                            priority: 'critical',
                                        },
                                        {
                                            rule: 'Raise your hand for any assistance',
                                            priority: 'medium',
                                        },
                                        {
                                            rule: 'Stay in your assigned seat only',
                                            priority: 'medium',
                                        },
                                        {
                                            rule: 'Submit papers before time expires',
                                            priority: 'high',
                                        },
                                    ].map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                borderBottom:
                                                    index < 5
                                                        ? '1px solid'
                                                        : 'none',
                                                borderColor: 'divider',
                                                '&:hover': {
                                                    bgcolor: 'action.hover',
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 6,
                                                    height: 24,
                                                    borderRadius: 3,
                                                    bgcolor:
                                                        item.priority ===
                                                        'critical'
                                                            ? 'error.main'
                                                            : item.priority ===
                                                                'high'
                                                              ? 'warning.main'
                                                              : 'info.main',
                                                }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.8125rem',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {item.rule}
                                                </Typography>
                                                <Chip
                                                    label={item.priority}
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.6875rem',
                                                        height: 18,
                                                        bgcolor:
                                                            item.priority ===
                                                            'critical'
                                                                ? 'error.100'
                                                                : item.priority ===
                                                                    'high'
                                                                  ? 'warning.100'
                                                                  : 'info.100',
                                                        color:
                                                            item.priority ===
                                                            'critical'
                                                                ? 'error.main'
                                                                : item.priority ===
                                                                    'high'
                                                                  ? 'warning.main'
                                                                  : 'info.main',
                                                        textTransform:
                                                            'uppercase',
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Box>

                        {/* Emergency Information Panel */}
                        <Card
                            sx={{
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'error.main',
                                borderRadius: 2,
                                mb: 3,
                                bgcolor: alpha('#dc2626', 0.02),
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            bgcolor: 'error.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <WarningIcon
                                            sx={{
                                                color: 'white',
                                                fontSize: 20,
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '0.9375rem',
                                                fontWeight: 700,
                                                mb: 1,
                                                color: 'error.main',
                                            }}
                                        >
                                            Emergency Contacts & Support
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.8125rem',
                                                mb: 2,
                                                color: 'text.secondary',
                                            }}
                                        >
                                            In case of any emergency or need for
                                            assistance during examinations:
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: {
                                                    xs: '1fr',
                                                    sm: 'repeat(2, 1fr)',
                                                },
                                                gap: 2,
                                            }}
                                        >
                                            {[
                                                {
                                                    title: 'Examination Office',
                                                    number: '+1 (555) 123-4567',
                                                    available: '24/7 Support',
                                                },
                                                {
                                                    title: 'Campus Security',
                                                    number: '+1 (555) 987-6543',
                                                    available: 'Emergency Only',
                                                },
                                                {
                                                    title: 'Student Services',
                                                    number: '+1 (555) 456-7890',
                                                    available:
                                                        'Mon-Fri 8AM-5PM',
                                                },
                                                {
                                                    title: 'Health Center',
                                                    number: '+1 (555) 321-0987',
                                                    available:
                                                        'Medical Emergency',
                                                },
                                            ].map(contact => (
                                                <Box
                                                    key={contact.title}
                                                    sx={{
                                                        p: 2,
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 1,
                                                        bgcolor: 'white',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize:
                                                                '0.8125rem',
                                                            fontWeight: 600,
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {contact.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                            display: 'block',
                                                            mb: 0.5,
                                                            color: 'primary.main',
                                                            fontFamily:
                                                                'monospace',
                                                        }}
                                                    >
                                                        {contact.number}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize:
                                                                '0.6875rem',
                                                            color: 'text.secondary',
                                                        }}
                                                    >
                                                        {contact.available}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Additional Resources */}
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    mb: 2,
                                }}
                            >
                                Additional Resources
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(3, 1fr)',
                                    },
                                    gap: 2,
                                }}
                            >
                                {[
                                    {
                                        title: 'Study Materials',
                                        description:
                                            'Access past papers and study guides',
                                        icon: (
                                            <AttachmentIcon
                                                sx={{
                                                    fontSize: 20,
                                                    color: 'primary.main',
                                                }}
                                            />
                                        ),
                                        action: 'View Resources',
                                    },
                                    {
                                        title: 'Exam Schedule',
                                        description:
                                            'Check your complete exam timetable',
                                        icon: (
                                            <CalendarIcon
                                                sx={{
                                                    fontSize: 20,
                                                    color: 'info.main',
                                                }}
                                            />
                                        ),
                                        action: 'View Schedule',
                                    },
                                    {
                                        title: 'Results Portal',
                                        description:
                                            'Access your examination results',
                                        icon: (
                                            <CheckCircle
                                                sx={{
                                                    fontSize: 20,
                                                    color: 'success.main',
                                                }}
                                            />
                                        ),
                                        action: 'Check Results',
                                    },
                                ].map(resource => (
                                    <Card
                                        key={resource.title}
                                        sx={{
                                            boxShadow: 'none',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                transform: 'translateY(-2px)',
                                                transition:
                                                    'all 0.2s ease-in-out',
                                            },
                                        }}
                                    >
                                        <CardContent
                                            sx={{ p: 2, textAlign: 'center' }}
                                        >
                                            <Box sx={{ mb: 1 }}>
                                                {resource.icon}
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 600,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {resource.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                    mb: 1.5,
                                                    display: 'block',
                                                }}
                                            >
                                                {resource.description}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.6875rem',
                                                    color: 'primary.main',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {resource.action} →
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
};
