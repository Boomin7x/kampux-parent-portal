import {
    Assignment as AssignmentIcon,
    CheckCircle as CompletedIcon,
    Download as DownloadIcon,
    Star as ExcellentIcon,
    ExpandMore as ExpandMoreIcon,
    Grade as GradeIcon,
    Refresh as RefreshIcon,
    Assessment as ResultsIcon,
    TrendingDown as TrendingDownIcon,
    TrendingFlat as TrendingFlatIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AcademicResultsOverview } from '../../../../types/results.types';
import type { Student } from '../../../../types/student.types';

interface ResultsOverviewProps {
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
            id={`results-tabpanel-${index}`}
            aria-labelledby={`results-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

// Mock academic results data
const mockResultsData: AcademicResultsOverview = {
    studentId: 'student1',
    currentTerm: 'Term 1',
    academicYear: '2024-2025',
    overallPerformance: {
        currentGPA: 3.7,
        currentGrade: 'B+',
        classRank: 8,
        totalStudentsInClass: 45,
        overallPercentage: 87.2,
        gradeStatus: 'good',
        termCompletion: 75,
        assessmentCompletion: 85,
    },
    subjectResults: [
        {
            id: 'sub_1',
            subject: 'Mathematics',
            subjectCode: 'MATH10',
            teacher: {
                id: 'teacher_1',
                name: 'Ms. Rodriguez',
                title: 'Senior Mathematics Teacher',
                subject: 'Mathematics',
                department: 'Mathematics Department',
                email: 'mrodriguez@excellenceacademy.edu',
                qualifications: ['M.Sc. Mathematics', 'B.Ed.'],
                experienceYears: 12,
            },
            currentGrade: 'A-',
            currentPercentage: 91.5,
            creditHours: 4,
            gradePoints: 3.7,
            classAverage: 78.5,
            highestMark: 95.0,
            lowestMark: 45.0,
            studentRank: 3,
            totalStudents: 45,
            assessments: [
                {
                    id: 'assess_1',
                    name: 'Chapter 7 Quiz',
                    type: 'quiz',
                    date: '2025-01-15T10:00:00Z',
                    marksObtained: 27,
                    totalMarks: 30,
                    percentage: 90,
                    grade: 'A-',
                    weight: 15,
                    feedback: 'Excellent understanding of concepts',
                    status: 'graded',
                },
                {
                    id: 'assess_2',
                    name: 'Algebra Assignment',
                    type: 'assignment',
                    date: '2025-01-10T00:00:00Z',
                    marksObtained: 48,
                    totalMarks: 50,
                    percentage: 96,
                    grade: 'A',
                    weight: 20,
                    feedback: 'Clear working shown throughout',
                    status: 'graded',
                },
            ],
            attendance: {
                totalClasses: 40,
                classesAttended: 38,
                attendancePercentage: 95,
                lastClassDate: '2025-01-23T09:00:00Z',
            },
            status: 'active',
            lastAssessmentDate: '2025-01-15T10:00:00Z',
        },
        {
            id: 'sub_2',
            subject: 'Physics',
            subjectCode: 'PHYS10',
            teacher: {
                id: 'teacher_2',
                name: 'Dr. Thompson',
                title: 'Physics Teacher',
                subject: 'Physics',
                department: 'Science Department',
                email: 'dthompson@excellenceacademy.edu',
                qualifications: ['Ph.D. Physics', 'M.Sc. Physics'],
                experienceYears: 15,
            },
            currentGrade: 'B+',
            currentPercentage: 87.2,
            creditHours: 4,
            gradePoints: 3.3,
            classAverage: 75.8,
            highestMark: 92.0,
            lowestMark: 42.0,
            studentRank: 7,
            totalStudents: 45,
            assessments: [
                {
                    id: 'assess_3',
                    name: 'Mechanics Test',
                    type: 'test',
                    date: '2025-01-12T14:00:00Z',
                    marksObtained: 74,
                    totalMarks: 80,
                    percentage: 92.5,
                    grade: 'A',
                    weight: 25,
                    status: 'graded',
                },
            ],
            attendance: {
                totalClasses: 35,
                classesAttended: 34,
                attendancePercentage: 97,
                lastClassDate: '2025-01-22T14:00:00Z',
            },
            status: 'active',
            lastAssessmentDate: '2025-01-12T14:00:00Z',
        },
        {
            id: 'sub_3',
            subject: 'English',
            subjectCode: 'ENG10',
            teacher: {
                id: 'teacher_3',
                name: 'Ms. Davis',
                title: 'English Teacher',
                subject: 'English',
                department: 'Languages Department',
                email: 'mdavis@excellenceacademy.edu',
                qualifications: ['M.A. English Literature', 'B.Ed.'],
                experienceYears: 8,
            },
            currentGrade: 'A',
            currentPercentage: 94.8,
            creditHours: 4,
            gradePoints: 4.0,
            classAverage: 82.1,
            highestMark: 96.0,
            lowestMark: 55.0,
            studentRank: 2,
            totalStudents: 45,
            assessments: [
                {
                    id: 'assess_4',
                    name: 'Essay - Character Analysis',
                    type: 'assignment',
                    date: '2025-01-08T00:00:00Z',
                    marksObtained: 95,
                    totalMarks: 100,
                    percentage: 95,
                    grade: 'A',
                    weight: 30,
                    feedback: 'Outstanding analysis and writing',
                    status: 'graded',
                },
            ],
            attendance: {
                totalClasses: 30,
                classesAttended: 30,
                attendancePercentage: 100,
                lastClassDate: '2025-01-23T11:00:00Z',
            },
            status: 'active',
            lastAssessmentDate: '2025-01-08T00:00:00Z',
        },
    ],
    sequentialAssessments: [
        {
            id: 'seq_1',
            sequenceNumber: 1,
            assessmentPeriod: 'Weeks 1-4',
            startDate: '2024-09-01T00:00:00Z',
            endDate: '2024-09-28T23:59:59Z',
            subjects: [
                {
                    subject: 'Mathematics',
                    teacher: 'Ms. Rodriguez',
                    marksObtained: 85,
                    totalMarks: 100,
                    percentage: 85,
                    grade: 'B+',
                    assessmentType: 'test',
                    assessmentDate: '2024-09-25T10:00:00Z',
                    comments: 'Good understanding of basic concepts',
                },
                {
                    subject: 'Physics',
                    teacher: 'Dr. Thompson',
                    marksObtained: 78,
                    totalMarks: 100,
                    percentage: 78,
                    grade: 'B',
                    assessmentType: 'practical',
                    assessmentDate: '2024-09-26T14:00:00Z',
                    comments: 'Needs improvement in practical skills',
                },
                {
                    subject: 'English',
                    teacher: 'Ms. Davis',
                    marksObtained: 92,
                    totalMarks: 100,
                    percentage: 92,
                    grade: 'A',
                    assessmentType: 'assignment',
                    assessmentDate: '2024-09-24T00:00:00Z',
                    comments: 'Excellent writing and comprehension',
                },
            ],
            overallPerformance: {
                averagePercentage: 85,
                totalMarks: 300,
                obtainedMarks: 255,
                grade: 'B+',
                rank: 12,
            },
            teacherComments: [
                'Shows consistent effort',
                'Good improvement in weaker subjects',
            ],
            status: 'completed',
        },
        {
            id: 'seq_2',
            sequenceNumber: 2,
            assessmentPeriod: 'Weeks 5-8',
            startDate: '2024-09-29T00:00:00Z',
            endDate: '2024-10-26T23:59:59Z',
            subjects: [
                {
                    subject: 'Mathematics',
                    teacher: 'Ms. Rodriguez',
                    marksObtained: 91,
                    totalMarks: 100,
                    percentage: 91,
                    grade: 'A-',
                    assessmentType: 'test',
                    assessmentDate: '2024-10-23T10:00:00Z',
                    comments: 'Significant improvement shown',
                },
                {
                    subject: 'Physics',
                    teacher: 'Dr. Thompson',
                    marksObtained: 84,
                    totalMarks: 100,
                    percentage: 84,
                    grade: 'B+',
                    assessmentType: 'test',
                    assessmentDate: '2024-10-24T14:00:00Z',
                    comments: 'Better grasp of theoretical concepts',
                },
                {
                    subject: 'English',
                    teacher: 'Ms. Davis',
                    marksObtained: 96,
                    totalMarks: 100,
                    percentage: 96,
                    grade: 'A',
                    assessmentType: 'project',
                    assessmentDate: '2024-10-22T00:00:00Z',
                    comments: 'Outstanding creative project',
                },
            ],
            overallPerformance: {
                averagePercentage: 90.3,
                totalMarks: 300,
                obtainedMarks: 271,
                grade: 'A-',
                rank: 8,
            },
            teacherComments: [
                'Excellent progress in all subjects',
                'Showing leadership qualities',
            ],
            status: 'completed',
        },
    ],
    termReports: [
        {
            id: 'term_1',
            term: 'Term 1',
            academicYear: '2024-2025',
            startDate: '2024-09-01T00:00:00Z',
            endDate: '2024-12-20T23:59:59Z',
            subjects: [
                {
                    subject: 'Mathematics',
                    subjectCode: 'MATH10',
                    teacher: {
                        id: 'teacher_1',
                        name: 'Ms. Rodriguez',
                        title: 'Senior Mathematics Teacher',
                        subject: 'Mathematics',
                        department: 'Mathematics Department',
                        email: 'mrodriguez@excellenceacademy.edu',
                        qualifications: ['M.Sc. Mathematics', 'B.Ed.'],
                        experienceYears: 12,
                    },
                    continuousAssessment: 85,
                    midtermExam: 88,
                    finalExam: 92,
                    totalMarks: 100,
                    obtainedMarks: 91,
                    percentage: 91,
                    grade: 'A-',
                    gradePoints: 3.7,
                    position: 3,
                    highestInClass: 95,
                    classAverage: 78.5,
                    teacherComments: 'Excellent progress and understanding',
                    effortGrade: 'A',
                    conductGrade: 'A',
                },
            ],
            overallSummary: {
                totalMarks: 800,
                obtainedMarks: 698,
                percentage: 87.25,
                gpa: 3.7,
                grade: 'B+',
                rank: 8,
                totalStudents: 45,
            },
            attendance: {
                totalDays: 75,
                daysPresent: 72,
                daysAbsent: 3,
                attendancePercentage: 96,
            },
            conduct: {
                punctuality: 'A',
                discipline: 'A',
                cooperation: 'A',
                leadership: 'B',
                initiative: 'B',
                overallConduct: 'A',
                comments: 'Well-behaved and respectful student',
            },
            extracurricular: [
                {
                    activity: 'Mathematics Club',
                    participation: 'excellent',
                    achievements: ['Regional Math Olympiad - Bronze Medal'],
                    position: 'Member',
                    comments: 'Active participant in club activities',
                },
                {
                    activity: 'School Debate Team',
                    participation: 'good',
                    position: 'Junior Member',
                    comments: 'Shows potential in public speaking',
                },
            ],
            principalComments:
                'Emma shows excellent academic potential and is a well-rounded student. Continue the good work.',
            classTeacherComments:
                'Consistently performs well across all subjects. Shows good leadership qualities and helps peers.',
            nextTermBegins: '2025-01-06T00:00:00Z',
            isPromoted: true,
            status: 'published',
            publishedDate: '2024-12-22T10:00:00Z',
        },
    ],
    teacherComments: [
        {
            id: 'comment_1',
            teacherId: 'teacher_1',
            teacherName: 'Ms. Rodriguez',
            subject: 'Mathematics',
            commentType: 'praise',
            comment:
                'Emma has shown remarkable improvement in her problem-solving skills.',
            date: '2025-01-20T15:30:00Z',
            isPrivate: false,
        },
        {
            id: 'comment_2',
            teacherId: 'teacher_3',
            teacherName: 'Ms. Davis',
            subject: 'English',
            commentType: 'improvement',
            comment:
                'Consider expanding vocabulary through additional reading.',
            date: '2025-01-18T11:15:00Z',
            isPrivate: false,
        },
    ],
    performanceTrends: [
        {
            subject: 'Mathematics',
            trend: 'improving',
            trendValue: 15.2,
            dataPoints: [
                { period: 'Sep', percentage: 78, grade: 'B' },
                { period: 'Oct', percentage: 84, grade: 'B+' },
                { period: 'Nov', percentage: 88, grade: 'B+' },
                { period: 'Dec', percentage: 91, grade: 'A-' },
            ],
            recommendation: 'Continue current study methods',
        },
        {
            subject: 'Physics',
            trend: 'improving',
            trendValue: 8.7,
            dataPoints: [
                { period: 'Sep', percentage: 75, grade: 'B' },
                { period: 'Oct', percentage: 79, grade: 'B' },
                { period: 'Nov', percentage: 83, grade: 'B+' },
                { period: 'Dec', percentage: 87, grade: 'B+' },
            ],
            recommendation: 'Focus on practical applications',
        },
        {
            subject: 'English',
            trend: 'stable',
            trendValue: 2.1,
            dataPoints: [
                { period: 'Sep', percentage: 92, grade: 'A-' },
                { period: 'Oct', percentage: 94, grade: 'A' },
                { period: 'Nov', percentage: 93, grade: 'A-' },
                { period: 'Dec', percentage: 95, grade: 'A' },
            ],
            recommendation: 'Maintain current performance',
        },
    ],
    lastUpdated: '2025-01-24T16:30:00Z',
};

export const ResultsOverview: React.FC<ResultsOverviewProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [resultsData, setResultsData] =
        useState<AcademicResultsOverview | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (selectedStudent) {
            setIsLoading(true);
            setTimeout(() => {
                setResultsData(mockResultsData);
                setIsLoading(false);
            }, 1000);
        }
    }, [selectedStudent]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return theme.palette.success.main;
        if (percentage >= 80) return theme.palette.info.main;
        if (percentage >= 70) return theme.palette.warning.main;
        return theme.palette.error.main;
    };

    const getTrendIcon = (trend: string, trendValue: number) => {
        const color =
            trend === 'improving'
                ? theme.palette.success.main
                : trend === 'declining'
                  ? theme.palette.error.main
                  : theme.palette.text.secondary;

        switch (trend) {
            case 'improving':
                return <TrendingUpIcon sx={{ color, fontSize: 16 }} />;
            case 'declining':
                return <TrendingDownIcon sx={{ color, fontSize: 16 }} />;
            default:
                return <TrendingFlatIcon sx={{ color, fontSize: 16 }} />;
        }
    };

    const getGradeStatusColor = (status: string) => {
        switch (status) {
            case 'excellent':
                return theme.palette.success.main;
            case 'good':
                return theme.palette.info.main;
            case 'satisfactory':
                return theme.palette.warning.main;
            default:
                return theme.palette.error.main;
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
                        <ResultsIcon
                            sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
                        />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to view academic results
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (isLoading || !resultsData) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <LinearProgress sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Loading academic results...
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box className={className}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Academic Results
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {formatDate(resultsData.lastUpdated)}
                    </Typography>
                    <IconButton size="small">
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Overall Performance Summary */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <GradeIcon
                                    sx={{
                                        color: getGradeStatusColor(
                                            resultsData.overallPerformance
                                                .gradeStatus
                                        ),
                                        mr: 1,
                                    }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Current GPA
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {resultsData.overallPerformance.currentGPA.toFixed(
                                    1
                                )}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Grade:{' '}
                                {resultsData.overallPerformance.currentGrade}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <ExcellentIcon
                                    sx={{ color: 'warning.main', mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Class Rank
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {resultsData.overallPerformance.classRank}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                of{' '}
                                {
                                    resultsData.overallPerformance
                                        .totalStudentsInClass
                                }{' '}
                                students
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <CompletedIcon
                                    sx={{ color: 'success.main', mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Overall Percentage
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {resultsData.overallPerformance.overallPercentage.toFixed(
                                    1
                                )}
                                %
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <AssignmentIcon
                                    sx={{ color: 'info.main', mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Assessment Progress
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {
                                    resultsData.overallPerformance
                                        .assessmentCompletion
                                }
                                %
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    resultsData.overallPerformance
                                        .assessmentCompletion
                                }
                                sx={{ mt: 1 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{ px: 2 }}
                    >
                        <Tab label="Subject Performance" />
                        <Tab label="Sequential Assessments" />
                        <Tab label="Term Reports" />
                        <Tab label="Performance Trends" />
                    </Tabs>
                </Box>

                {/* Subject Performance Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Grid container spacing={3}>
                            {resultsData.subjectResults.map(subject => (
                                <Grid size={{ xs: 12, lg: 6 }} key={subject.id}>
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
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {subject.subject}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {subject.subjectCode} •{' '}
                                                        {subject.teacher.name}
                                                    </Typography>
                                                </Box>
                                                <Avatar
                                                    sx={{
                                                        backgroundColor:
                                                            getGradeColor(
                                                                subject.currentPercentage
                                                            ),
                                                        color: 'white',
                                                        width: 56,
                                                        height: 56,
                                                        fontSize: '1.1rem',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {subject.currentGrade}
                                                </Avatar>
                                            </Box>

                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 6 }}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Current Score:
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {subject.currentPercentage.toFixed(
                                                            1
                                                        )}
                                                        %
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 6 }}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Class Rank:
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {subject.studentRank} of{' '}
                                                        {subject.totalStudents}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 6 }}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Class Average:
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {subject.classAverage.toFixed(
                                                            1
                                                        )}
                                                        %
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 6 }}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Attendance:
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {
                                                            subject.attendance
                                                                .attendancePercentage
                                                        }
                                                        %
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
                                                        Recent Assessments (
                                                        {
                                                            subject.assessments
                                                                .length
                                                        }
                                                        )
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List sx={{ p: 0 }}>
                                                        {subject.assessments.map(
                                                            (
                                                                assessment,
                                                                index
                                                            ) => (
                                                                <React.Fragment
                                                                    key={
                                                                        assessment.id
                                                                    }
                                                                >
                                                                    <ListItem
                                                                        sx={{
                                                                            px: 0,
                                                                        }}
                                                                    >
                                                                        <ListItemText
                                                                            primary={
                                                                                <Box
                                                                                    sx={{
                                                                                        display:
                                                                                            'flex',
                                                                                        justifyContent:
                                                                                            'space-between',
                                                                                        alignItems:
                                                                                            'center',
                                                                                    }}
                                                                                >
                                                                                    <Typography
                                                                                        variant="subtitle2"
                                                                                        sx={{
                                                                                            fontWeight: 600,
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            assessment.name
                                                                                        }
                                                                                    </Typography>
                                                                                    <Chip
                                                                                        label={
                                                                                            assessment.grade
                                                                                        }
                                                                                        size="small"
                                                                                        sx={{
                                                                                            backgroundColor:
                                                                                                alpha(
                                                                                                    getGradeColor(
                                                                                                        assessment.percentage
                                                                                                    ),
                                                                                                    0.1
                                                                                                ),
                                                                                            color: getGradeColor(
                                                                                                assessment.percentage
                                                                                            ),
                                                                                            fontWeight: 600,
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            }
                                                                            secondary={
                                                                                <Box>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        color="text.secondary"
                                                                                    >
                                                                                        {
                                                                                            assessment.marksObtained
                                                                                        }

                                                                                        /
                                                                                        {
                                                                                            assessment.totalMarks
                                                                                        }{' '}
                                                                                        (
                                                                                        {
                                                                                            assessment.percentage
                                                                                        }
                                                                                        %)
                                                                                        •
                                                                                        {assessment.type.toUpperCase()}{' '}
                                                                                        •
                                                                                        Weight:{' '}
                                                                                        {
                                                                                            assessment.weight
                                                                                        }

                                                                                        %
                                                                                    </Typography>
                                                                                    <Typography
                                                                                        variant="caption"
                                                                                        display="block"
                                                                                        color="text.secondary"
                                                                                    >
                                                                                        {formatDate(
                                                                                            assessment.date
                                                                                        )}
                                                                                    </Typography>
                                                                                    {assessment.feedback && (
                                                                                        <Typography
                                                                                            variant="caption"
                                                                                            display="block"
                                                                                            sx={{
                                                                                                fontStyle:
                                                                                                    'italic',
                                                                                                mt: 0.5,
                                                                                            }}
                                                                                        >
                                                                                            "
                                                                                            {
                                                                                                assessment.feedback
                                                                                            }

                                                                                            "
                                                                                        </Typography>
                                                                                    )}
                                                                                </Box>
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                    {index <
                                                                        subject
                                                                            .assessments
                                                                            .length -
                                                                            1 && (
                                                                        <Divider />
                                                                    )}
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </TabPanel>

                {/* Sequential Assessments Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Grid container spacing={3}>
                            {resultsData.sequentialAssessments.map(
                                assessment => (
                                    <Grid size={{ xs: 12 }} key={assessment.id}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            Sequential
                                                            Assessment{' '}
                                                            {
                                                                assessment.sequenceNumber
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                assessment.assessmentPeriod
                                                            }{' '}
                                                            •{' '}
                                                            {formatDate(
                                                                assessment.startDate
                                                            )}{' '}
                                                            -{' '}
                                                            {formatDate(
                                                                assessment.endDate
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            textAlign: 'right',
                                                        }}
                                                    >
                                                        <Chip
                                                            label={
                                                                assessment
                                                                    .overallPerformance
                                                                    .grade
                                                            }
                                                            sx={{
                                                                backgroundColor:
                                                                    alpha(
                                                                        getGradeColor(
                                                                            assessment
                                                                                .overallPerformance
                                                                                .averagePercentage
                                                                        ),
                                                                        0.1
                                                                    ),
                                                                color: getGradeColor(
                                                                    assessment
                                                                        .overallPerformance
                                                                        .averagePercentage
                                                                ),
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '1rem',
                                                                mb: 1,
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            display="block"
                                                            color="text.secondary"
                                                        >
                                                            Rank:{' '}
                                                            {
                                                                assessment
                                                                    .overallPerformance
                                                                    .rank
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <TableContainer
                                                    component={Paper}
                                                    variant="outlined"
                                                >
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>
                                                                    Subject
                                                                </TableCell>
                                                                <TableCell>
                                                                    Teacher
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    Marks
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    Grade
                                                                </TableCell>
                                                                <TableCell>
                                                                    Type
                                                                </TableCell>
                                                                <TableCell>
                                                                    Comments
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {assessment.subjects.map(
                                                                subject => (
                                                                    <TableRow
                                                                        key={`${assessment.id}-${subject.subject}`}
                                                                    >
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: 600,
                                                                            }}
                                                                        >
                                                                            {
                                                                                subject.subject
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                subject.teacher
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {
                                                                                subject.marksObtained
                                                                            }
                                                                            /
                                                                            {
                                                                                subject.totalMarks
                                                                            }{' '}
                                                                            (
                                                                            {
                                                                                subject.percentage
                                                                            }
                                                                            %)
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            <Chip
                                                                                label={
                                                                                    subject.grade
                                                                                }
                                                                                size="small"
                                                                                sx={{
                                                                                    backgroundColor:
                                                                                        alpha(
                                                                                            getGradeColor(
                                                                                                subject.percentage
                                                                                            ),
                                                                                            0.1
                                                                                        ),
                                                                                    color: getGradeColor(
                                                                                        subject.percentage
                                                                                    ),
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Typography variant="caption">
                                                                                {subject.assessmentType
                                                                                    .replace(
                                                                                        '_',
                                                                                        ' '
                                                                                    )
                                                                                    .toUpperCase()}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Typography variant="caption">
                                                                                {
                                                                                    subject.comments
                                                                                }
                                                                            </Typography>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>

                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        p: 2,
                                                        backgroundColor: alpha(
                                                            theme.palette
                                                                .primary.main,
                                                            0.05
                                                        ),
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        Overall Performance:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Average:{' '}
                                                        {
                                                            assessment
                                                                .overallPerformance
                                                                .averagePercentage
                                                        }
                                                        % • Total:{' '}
                                                        {
                                                            assessment
                                                                .overallPerformance
                                                                .obtainedMarks
                                                        }
                                                        /
                                                        {
                                                            assessment
                                                                .overallPerformance
                                                                .totalMarks
                                                        }
                                                    </Typography>
                                                    {assessment.teacherComments
                                                        .length > 0 && (
                                                        <Box sx={{ mt: 1 }}>
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 0.5,
                                                                }}
                                                            >
                                                                Teacher
                                                                Comments:
                                                            </Typography>
                                                            {assessment.teacherComments.map(
                                                                (
                                                                    comment,
                                                                    index
                                                                ) => (
                                                                    <Typography
                                                                        key={
                                                                            index
                                                                        }
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontStyle:
                                                                                'italic',
                                                                        }}
                                                                    >
                                                                        •{' '}
                                                                        {
                                                                            comment
                                                                        }
                                                                    </Typography>
                                                                )
                                                            )}
                                                        </Box>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Box>
                </TabPanel>

                {/* Term Reports Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        {resultsData.termReports.map(report => (
                            <Card
                                key={report.id}
                                variant="outlined"
                                sx={{ mb: 3 }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 3,
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h5"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {report.term} Report -{' '}
                                                {report.academicYear}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {formatDate(report.startDate)} -{' '}
                                                {formatDate(report.endDate)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<DownloadIcon />}
                                                size="small"
                                            >
                                                Download Report
                                            </Button>
                                            <Chip
                                                label={report.status.toUpperCase()}
                                                color={
                                                    report.status ===
                                                    'published'
                                                        ? 'success'
                                                        : 'warning'
                                                }
                                            />
                                        </Box>
                                    </Box>

                                    <Grid container spacing={3}>
                                        {/* Overall Summary */}
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 2,
                                                        }}
                                                    >
                                                        Overall Summary
                                                    </Typography>
                                                    <Grid container spacing={2}>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                GPA:
                                                            </Typography>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .overallSummary
                                                                        .gpa
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Grade:
                                                            </Typography>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .overallSummary
                                                                        .grade
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Percentage:
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .overallSummary
                                                                        .percentage
                                                                }
                                                                %
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Class Rank:
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .overallSummary
                                                                        .rank
                                                                }{' '}
                                                                of{' '}
                                                                {
                                                                    report
                                                                        .overallSummary
                                                                        .totalStudents
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        {/* Attendance Summary */}
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 2,
                                                        }}
                                                    >
                                                        Attendance Summary
                                                    </Typography>
                                                    <Grid container spacing={2}>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Total Days:
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .attendance
                                                                        .totalDays
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Present:
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .attendance
                                                                        .daysPresent
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Absent:
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .attendance
                                                                        .daysAbsent
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid size={{ xs: 6 }}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Percentage:
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {
                                                                    report
                                                                        .attendance
                                                                        .attendancePercentage
                                                                }
                                                                %
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        {/* Comments */}
                                        <Grid size={{ xs: 12 }}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 2,
                                                        }}
                                                    >
                                                        Comments & Feedback
                                                    </Typography>
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 1,
                                                                }}
                                                            >
                                                                Class Teacher
                                                                Comments:
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontStyle:
                                                                        'italic',
                                                                }}
                                                            >
                                                                "
                                                                {
                                                                    report.classTeacherComments
                                                                }
                                                                "
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            size={{
                                                                xs: 12,
                                                                md: 6,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 1,
                                                                }}
                                                            >
                                                                Principal
                                                                Comments:
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontStyle:
                                                                        'italic',
                                                                }}
                                                            >
                                                                "
                                                                {
                                                                    report.principalComments
                                                                }
                                                                "
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    {report.extracurricular
                                                        .length > 0 && (
                                                        <Box sx={{ mt: 2 }}>
                                                            <Typography
                                                                variant="subtitle2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    mb: 1,
                                                                }}
                                                            >
                                                                Extracurricular
                                                                Activities:
                                                            </Typography>
                                                            <List dense>
                                                                {report.extracurricular.map(
                                                                    (
                                                                        activity,
                                                                        index
                                                                    ) => (
                                                                        <ListItem
                                                                            key={
                                                                                index
                                                                            }
                                                                            sx={{
                                                                                px: 0,
                                                                            }}
                                                                        >
                                                                            <ListItemText
                                                                                primary={
                                                                                    <Box
                                                                                        sx={{
                                                                                            display:
                                                                                                'flex',
                                                                                            alignItems:
                                                                                                'center',
                                                                                            gap: 1,
                                                                                        }}
                                                                                    >
                                                                                        <Typography
                                                                                            variant="subtitle2"
                                                                                            sx={{
                                                                                                fontWeight: 600,
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                activity.activity
                                                                                            }
                                                                                        </Typography>
                                                                                        <Chip
                                                                                            label={
                                                                                                activity.participation
                                                                                            }
                                                                                            size="small"
                                                                                            color={
                                                                                                activity.participation ===
                                                                                                'excellent'
                                                                                                    ? 'success'
                                                                                                    : 'default'
                                                                                            }
                                                                                        />
                                                                                        {activity.position && (
                                                                                            <Typography
                                                                                                variant="caption"
                                                                                                color="text.secondary"
                                                                                            >
                                                                                                (
                                                                                                {
                                                                                                    activity.position
                                                                                                }

                                                                                                )
                                                                                            </Typography>
                                                                                        )}
                                                                                    </Box>
                                                                                }
                                                                                secondary={
                                                                                    activity.comments
                                                                                }
                                                                            />
                                                                        </ListItem>
                                                                    )
                                                                )}
                                                            </List>
                                                        </Box>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </TabPanel>

                {/* Performance Trends Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Grid container spacing={3}>
                            {resultsData.performanceTrends.map(trend => (
                                <Grid
                                    size={{ xs: 12, md: 6 }}
                                    key={trend.subject}
                                >
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {trend.subject}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    {getTrendIcon(
                                                        trend.trend,
                                                        trend.trendValue
                                                    )}
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color:
                                                                trend.trend ===
                                                                'improving'
                                                                    ? 'success.main'
                                                                    : trend.trend ===
                                                                        'declining'
                                                                      ? 'error.main'
                                                                      : 'text.secondary',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {trend.trend ===
                                                        'improving'
                                                            ? '+'
                                                            : ''}
                                                        {trend.trendValue.toFixed(
                                                            1
                                                        )}
                                                        %
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <TableContainer
                                                component={Paper}
                                                variant="outlined"
                                                sx={{ mb: 2 }}
                                            >
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                Period
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Percentage
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                Grade
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {trend.dataPoints.map(
                                                            point => (
                                                                <TableRow
                                                                    key={
                                                                        point.period
                                                                    }
                                                                >
                                                                    <TableCell
                                                                        sx={{
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {
                                                                            point.period
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {
                                                                            point.percentage
                                                                        }
                                                                        %
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Chip
                                                                            label={
                                                                                point.grade
                                                                            }
                                                                            size="small"
                                                                            sx={{
                                                                                backgroundColor:
                                                                                    alpha(
                                                                                        getGradeColor(
                                                                                            point.percentage
                                                                                        ),
                                                                                        0.1
                                                                                    ),
                                                                                color: getGradeColor(
                                                                                    point.percentage
                                                                                ),
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                            {trend.recommendation && (
                                                <Box
                                                    sx={{
                                                        p: 2,
                                                        backgroundColor: alpha(
                                                            theme.palette.info
                                                                .main,
                                                            0.05
                                                        ),
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        Recommendation:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {trend.recommendation}
                                                    </Typography>
                                                </Box>
                                            )}
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
