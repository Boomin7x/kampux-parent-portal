import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Chip,
    Avatar,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    useTheme,
    alpha,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Badge,
    Tab,
    Tabs,
} from '@mui/material';
import {
    Quiz as ExamIcon,
    Announcement as AnnouncementIcon,
    Schedule as ScheduleIcon,
    LocationOn as VenueIcon,
    Person as TeacherIcon,
    CalendarToday as CalendarIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
    PriorityHigh as HighPriorityIcon,
    CheckCircle as CompletedIcon,
    Refresh as RefreshIcon,
    ExpandMore as ExpandMoreIcon,
    Download as DownloadIcon,
    Attachment as AttachmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Student } from '../../../../types/student.types';
import type {
    ExaminationOverview,
    UpcomingExam,
    ExamAnnouncement,
    ExamCalendarEvent
} from '../../../../types/examination.types';

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
                facilities: ['Air conditioning', 'Individual desks', 'CCTV monitoring'],
                instructions: ['Arrive 30 minutes early', 'Bring photo ID', 'No electronic devices'],
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
                'Read questions carefully before answering'
            ],
            materialsRequired: ['Black/Blue pen', 'Pencil', 'Eraser', 'Ruler', 'Scientific calculator'],
            materialsNotAllowed: ['Mobile phones', 'Smart watches', 'Notes', 'Formula sheets'],
            syllabusCovered: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
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
                facilities: ['Laboratory equipment', 'Practical setup', 'Emergency exits'],
                instructions: ['Laboratory safety rules apply', 'Wear closed shoes'],
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
                'Safety equipment will be provided'
            ],
            materialsRequired: ['Laboratory coat', 'Safety goggles', 'Black pen', 'Calculator'],
            materialsNotAllowed: ['Personal laboratory equipment', 'Formula books'],
            syllabusCovered: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity'],
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
            message: 'Please note that calculators will only be allowed for sections B and C of the Mathematics midterm exam. Students must bring their own scientific calculators. Graphing calculators are not permitted.',
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
            message: 'The Physics final examination venue has been changed from Science Lab 2 to Science Lab 1 due to equipment maintenance. Please check your examination slip for confirmation.',
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
            message: 'All students are reminded to arrive at least 30 minutes before their scheduled examination time. Late arrivals will not be permitted entry after 15 minutes from the start time.',
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
            description: 'Students must arrive at least 30 minutes before the examination start time.',
            priority: 'high',
            applicableFor: 'all_exams',
            icon: 'schedule',
        },
        {
            id: 'inst_2',
            category: 'general',
            title: 'Identification Required',
            description: 'Valid student ID card must be presented before entering the examination hall.',
            priority: 'high',
            applicableFor: 'all_exams',
            icon: 'badge',
        },
        {
            id: 'inst_3',
            category: 'general',
            title: 'Electronic Devices',
            description: 'Mobile phones, smart watches, and other electronic devices are strictly prohibited.',
            priority: 'high',
            applicableFor: 'all_exams',
            icon: 'phone',
        },
    ],
    lastUpdated: '2025-01-24T16:00:00Z',
};

export const ExaminationAnnouncements: React.FC<ExaminationAnnouncementsProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [examinationData, setExaminationData] = useState<ExaminationOverview | null>(null);
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

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })}`;
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
                return <HighPriorityIcon sx={{ color: theme.palette.error.main }} />;
            case 'medium':
                return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (!selectedStudent) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <ExamIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to view examination information
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (isLoading || !examinationData) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <LinearProgress sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Loading examination data...
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    const unreadAnnouncements = examinationData.examAnnouncements.filter(a => !a.isRead).length;

    return (
        <Box className={className}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Examinations
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {formatDate(examinationData.lastUpdated)}
                    </Typography>
                    <IconButton size="small">
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <ExamIcon sx={{ color: 'primary.main', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Upcoming Exams
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {examinationData.upcomingExams.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <AnnouncementIcon sx={{ color: 'warning.main', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    New Announcements
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {unreadAnnouncements}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <ScheduleIcon sx={{ color: 'info.main', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Next Exam
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {examinationData.upcomingExams.length > 0
                                    ? `${examinationData.upcomingExams[0].daysUntilExam} days`
                                    : 'None scheduled'
                                }
                            </Typography>
                            {examinationData.upcomingExams.length > 0 && (
                                <Typography variant="caption" color="text.secondary">
                                    {examinationData.upcomingExams[0].subject}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <CompletedIcon sx={{ color: 'success.main', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Recent Results
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {examinationData.recentExams.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 2 }}>
                        <Tab
                            label={
                                <Badge badgeContent={unreadAnnouncements} color="error">
                                    Announcements
                                </Badge>
                            }
                        />
                        <Tab label="Upcoming Exams" />
                        <Tab label="Exam Calendar" />
                        <Tab label="General Instructions" />
                    </Tabs>
                </Box>

                {/* Announcements Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <List sx={{ p: 0 }}>
                            {examinationData.examAnnouncements.map((announcement, index) => (
                                <React.Fragment key={announcement.id}>
                                    <ListItem
                                        sx={{
                                            px: 0,
                                            backgroundColor: !announcement.isRead ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                                            borderRadius: 1,
                                            mb: 1,
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{
                                                    backgroundColor: alpha(getPriorityColor(announcement.priority), 0.1),
                                                    color: getPriorityColor(announcement.priority),
                                                }}
                                            >
                                                {getPriorityIcon(announcement.priority)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: !announcement.isRead ? 600 : 400,
                                                        }}
                                                    >
                                                        {announcement.title}
                                                    </Typography>
                                                    <Chip
                                                        label={announcement.type.replace('_', ' ').toUpperCase()}
                                                        size="small"
                                                        sx={{
                                                            fontSize: '0.6875rem',
                                                            backgroundColor: alpha(getPriorityColor(announcement.priority), 0.1),
                                                            color: getPriorityColor(announcement.priority),
                                                        }}
                                                    />
                                                    {!announcement.isRead && (
                                                        <Chip
                                                            label="NEW"
                                                            size="small"
                                                            color="primary"
                                                            sx={{ fontSize: '0.6875rem' }}
                                                        />
                                                    )}
                                                </Box>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        {announcement.message}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        By {announcement.publishedBy.name} • {formatDateTime(announcement.publishedDate)}
                                                    </Typography>
                                                    {announcement.subjects && (
                                                        <Box sx={{ mt: 1 }}>
                                                            {announcement.subjects.map(subject => (
                                                                <Chip
                                                                    key={subject}
                                                                    label={subject}
                                                                    size="small"
                                                                    sx={{ mr: 0.5, fontSize: '0.6875rem' }}
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}
                                                    {announcement.attachments && announcement.attachments.length > 0 && (
                                                        <Box sx={{ mt: 1 }}>
                                                            <Button
                                                                size="small"
                                                                startIcon={<AttachmentIcon />}
                                                                sx={{ fontSize: '0.75rem' }}
                                                            >
                                                                {announcement.attachments.length} attachment(s)
                                                            </Button>
                                                        </Box>
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    {index < examinationData.examAnnouncements.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                </TabPanel>

                {/* Upcoming Exams Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Grid container spacing={3}>
                            {examinationData.upcomingExams.map((exam) => (
                                <Grid size={{ xs: 12 }} key={exam.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                        {exam.subject} - {exam.examType.replace('_', ' ').toUpperCase()}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <ScheduleIcon fontSize="small" color="action" />
                                                            <Typography variant="body2">
                                                                {formatDate(exam.examDate)} • {exam.startTime} - {exam.endTime}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <VenueIcon fontSize="small" color="action" />
                                                            <Typography variant="body2">
                                                                {exam.venue.name}, {exam.venue.building}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Chip
                                                        label={`${exam.daysUntilExam} days left`}
                                                        sx={{
                                                            backgroundColor: alpha(getExamTypeColor(exam.examType), 0.1),
                                                            color: getExamTypeColor(exam.examType),
                                                            fontWeight: 600,
                                                            mb: 1,
                                                        }}
                                                    />
                                                    <Typography variant="caption" display="block" color="text.secondary">
                                                        {exam.duration} minutes
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                        Exam Details:
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        Total Marks: {exam.totalMarks}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        Passing Marks: {exam.passingMarks}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Teacher: {exam.teacher.name}
                                                    </Typography>
                                                    {exam.examiner && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            Examiner: {exam.examiner.name}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                        Venue Information:
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        Capacity: {exam.venue.capacity} students
                                                    </Typography>
                                                    {exam.venue.floor && (
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            Floor: {exam.venue.floor}
                                                        </Typography>
                                                    )}
                                                    <Typography variant="body2" color="text.secondary">
                                                        Facilities: {exam.venue.facilities.join(', ')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Accordion sx={{ mt: 2 }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        Exam Instructions & Materials
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid size={{ xs: 12, md: 4 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'success.main' }}>
                                                                Required Materials:
                                                            </Typography>
                                                            <List dense sx={{ p: 0 }}>
                                                                {exam.materialsRequired.map((material, idx) => (
                                                                    <ListItem key={idx} sx={{ px: 0, py: 0.25 }}>
                                                                        <Typography variant="body2">• {material}</Typography>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>
                                                        <Grid size={{ xs: 12, md: 4 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'error.main' }}>
                                                                Not Allowed:
                                                            </Typography>
                                                            <List dense sx={{ p: 0 }}>
                                                                {exam.materialsNotAllowed.map((material, idx) => (
                                                                    <ListItem key={idx} sx={{ px: 0, py: 0.25 }}>
                                                                        <Typography variant="body2">• {material}</Typography>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>
                                                        <Grid size={{ xs: 12, md: 4 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'info.main' }}>
                                                                Syllabus Covered:
                                                            </Typography>
                                                            <List dense sx={{ p: 0 }}>
                                                                {exam.syllabusCovered.map((topic, idx) => (
                                                                    <ListItem key={idx} sx={{ px: 0, py: 0.25 }}>
                                                                        <Typography variant="body2">• {topic}</Typography>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>
                                                    </Grid>

                                                    <Box sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                            Special Instructions:
                                                        </Typography>
                                                        <List dense sx={{ p: 0 }}>
                                                            {exam.instructions.map((instruction, idx) => (
                                                                <ListItem key={idx} sx={{ px: 0, py: 0.25 }}>
                                                                    <Typography variant="body2">• {instruction}</Typography>
                                                                </ListItem>
                                                            ))}
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
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                            Examination calendar view will be implemented with a calendar component.
                        </Typography>
                        <Grid container spacing={2}>
                            {examinationData.examCalendar.map((event) => (
                                <Grid size={{ xs: 12, md: 6 }} key={event.id}>
                                    <Card variant="outlined" sx={{ borderLeft: `4px solid ${event.color}` }}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {event.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {event.subject} • {event.examType.replace('_', ' ').toUpperCase()}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <ScheduleIcon fontSize="small" color="action" />
                                                <Typography variant="body2">
                                                    {formatDate(event.startDate)} • {event.startTime} - {event.endTime}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <VenueIcon fontSize="small" color="action" />
                                                <Typography variant="body2">
                                                    {event.venue.name}, {event.venue.building}
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
                            {examinationData.generalInstructions.map((instruction) => (
                                <Grid size={{ xs: 12, md: 6 }} key={instruction.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                {getPriorityIcon(instruction.priority)}
                                                <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                                                    {instruction.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                {instruction.description}
                                            </Typography>
                                            <Chip
                                                label={instruction.category.replace('_', ' ').toUpperCase()}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </TabPanel>
            </Card>
        </Box>
    );
};