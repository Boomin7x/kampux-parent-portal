import {
    CalendarToday as CalendarIcon,
    Close as CloseIcon,
    NavigateNext as NextIcon,
    NavigateBefore as PreviousIcon,
    Assessment as ResultsIcon,
    BarChart as SummaryIcon,
    Timeline as TimelineIcon,
    TrendingUp as TrendIcon,
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    LinearProgress,
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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { Student } from '../../../../types/student.types';

interface ResultsOverviewProps {
    selectedStudent: Student | null;
}

// Report Card Data Structure
interface SubjectResult {
    id: string;
    subject: string;
    subjectCode: string;
    coefficient: number;
    firstTest: { average: number; total: number };
    secondTest: { average: number; total: number };
    thirdTerm: { average: number; total: number; position: number };
    grade: string;
    teacher: string;
    group: 'Science' | 'Arts' | 'Languages' | 'Others';
}

interface GroupSummary {
    groupName: string;
    totalMarks: number;
    groupAverage: number;
    groupPosition: number;
}

interface SequenceAssessment {
    id: string;
    sequenceNumber: number;
    termNumber: number;
    academicYear: string;
    assessmentPeriod: string;
    startDate: string;
    endDate: string;
    isCompleted: boolean;
    isCurrent: boolean;
    subjects: {
        subjectId: string;
        subject: string;
        subjectCode: string;
        marksObtained: number;
        totalMarks: number;
        percentage: number;
        grade: string;
        position: number;
        teacher: string;
        group: string;
    }[];
    overallPerformance: {
        totalMarks: number;
        obtainedMarks: number;
        averagePercentage: number;
        grade: string;
        position: number;
        totalStudents: number;
    };
}

interface TermReport {
    termName: string;
    academicYear: string;
    subjects: SubjectResult[];
    groupSummaries: GroupSummary[];
    overallSummary: {
        firstTermAverage: number;
        secondTermAverage: number;
        thirdTermAverage: number;
        annualAverage: number;
        classPosition: number;
        totalStudents: number;
        bestAverage: number;
        worstAverage: number;
    };
    discipline: {
        totalAbsences: number;
        suspensions: number;
        punishments: number;
        warnings: number;
        remarks: string;
    };
    sequences: SequenceAssessment[];
}

// Mock Sequence Data
const mockSequenceData: SequenceAssessment[] = [
    {
        id: 'seq1_term1',
        sequenceNumber: 1,
        termNumber: 1,
        academicYear: '2023/2024',
        assessmentPeriod: 'First Sequence - First Term',
        startDate: '2023-09-01',
        endDate: '2023-09-30',
        isCompleted: true,
        isCurrent: false,
        subjects: [
            {
                subjectId: 'math',
                subject: 'Mathematics',
                subjectCode: 'MATH',
                marksObtained: 75,
                totalMarks: 100,
                percentage: 75,
                grade: 'B',
                position: 18,
                teacher: 'Dr. Johnson',
                group: 'Science',
            },
            {
                subjectId: 'english',
                subject: 'English Language',
                subjectCode: 'ENG',
                marksObtained: 88,
                totalMarks: 100,
                percentage: 88,
                grade: 'A-',
                position: 5,
                teacher: 'Ms. Davis',
                group: 'Languages',
            },
        ],
        overallPerformance: {
            totalMarks: 600,
            obtainedMarks: 456,
            averagePercentage: 76.0,
            grade: 'B',
            position: 15,
            totalStudents: 42,
        },
    },
    {
        id: 'seq2_term1',
        sequenceNumber: 2,
        termNumber: 1,
        academicYear: '2023/2024',
        assessmentPeriod: 'Second Sequence - First Term',
        startDate: '2023-10-01',
        endDate: '2023-10-31',
        isCompleted: true,
        isCurrent: false,
        subjects: [
            {
                subjectId: 'math',
                subject: 'Mathematics',
                subjectCode: 'MATH',
                marksObtained: 82,
                totalMarks: 100,
                percentage: 82,
                grade: 'B+',
                position: 12,
                teacher: 'Dr. Johnson',
                group: 'Science',
            },
            {
                subjectId: 'english',
                subject: 'English Language',
                subjectCode: 'ENG',
                marksObtained: 91,
                totalMarks: 100,
                percentage: 91,
                grade: 'A',
                position: 3,
                teacher: 'Ms. Davis',
                group: 'Languages',
            },
        ],
        overallPerformance: {
            totalMarks: 600,
            obtainedMarks: 498,
            averagePercentage: 83.0,
            grade: 'B+',
            position: 10,
            totalStudents: 42,
        },
    },
    {
        id: 'seq1_term2',
        sequenceNumber: 1,
        termNumber: 2,
        academicYear: '2023/2024',
        assessmentPeriod: 'First Sequence - Second Term',
        startDate: '2024-01-08',
        endDate: '2024-01-31',
        isCompleted: true,
        isCurrent: false,
        subjects: [
            {
                subjectId: 'math',
                subject: 'Mathematics',
                subjectCode: 'MATH',
                marksObtained: 85,
                totalMarks: 100,
                percentage: 85,
                grade: 'A-',
                position: 8,
                teacher: 'Dr. Johnson',
                group: 'Science',
            },
            {
                subjectId: 'english',
                subject: 'English Language',
                subjectCode: 'ENG',
                marksObtained: 89,
                totalMarks: 100,
                percentage: 89,
                grade: 'A',
                position: 4,
                teacher: 'Ms. Davis',
                group: 'Languages',
            },
        ],
        overallPerformance: {
            totalMarks: 600,
            obtainedMarks: 510,
            averagePercentage: 85.0,
            grade: 'A-',
            position: 8,
            totalStudents: 42,
        },
    },
    {
        id: 'seq2_term2',
        sequenceNumber: 2,
        termNumber: 2,
        academicYear: '2023/2024',
        assessmentPeriod: 'Second Sequence - Second Term',
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        isCompleted: true,
        isCurrent: true,
        subjects: [
            {
                subjectId: 'math',
                subject: 'Mathematics',
                subjectCode: 'MATH',
                marksObtained: 88,
                totalMarks: 100,
                percentage: 88,
                grade: 'A-',
                position: 6,
                teacher: 'Dr. Johnson',
                group: 'Science',
            },
            {
                subjectId: 'english',
                subject: 'English Language',
                subjectCode: 'ENG',
                marksObtained: 93,
                totalMarks: 100,
                percentage: 93,
                grade: 'A',
                position: 2,
                teacher: 'Ms. Davis',
                group: 'Languages',
            },
        ],
        overallPerformance: {
            totalMarks: 600,
            obtainedMarks: 528,
            averagePercentage: 88.0,
            grade: 'A-',
            position: 5,
            totalStudents: 42,
        },
    },
    {
        id: 'seq1_term3',
        sequenceNumber: 1,
        termNumber: 3,
        academicYear: '2023/2024',
        assessmentPeriod: 'First Sequence - Third Term',
        startDate: '2024-04-01',
        endDate: '2024-04-30',
        isCompleted: false,
        isCurrent: false,
        subjects: [],
        overallPerformance: {
            totalMarks: 600,
            obtainedMarks: 0,
            averagePercentage: 0,
            grade: '-',
            position: 0,
            totalStudents: 42,
        },
    },
];

// Mock Report Card Data
const mockReportCardData: TermReport = {
    termName: 'Third Term',
    academicYear: '2023/2024',
    sequences: mockSequenceData,
    subjects: [
        {
            id: 'math',
            subject: 'Mathematics',
            subjectCode: 'MATH',
            coefficient: 4,
            firstTest: { average: 85, total: 100 },
            secondTest: { average: 78, total: 100 },
            thirdTerm: { average: 82, total: 100, position: 12 },
            grade: 'B+',
            teacher: 'Dr. Johnson',
            group: 'Science',
        },
        {
            id: 'chemistry',
            subject: 'Chemistry',
            subjectCode: 'CHEM',
            coefficient: 3,
            firstTest: { average: 78, total: 100 },
            secondTest: { average: 80, total: 100 },
            thirdTerm: { average: 79, total: 100, position: 8 },
            grade: 'B',
            teacher: 'Prof. Smith',
            group: 'Science',
        },
        {
            id: 'biology',
            subject: 'Biology',
            subjectCode: 'BIO',
            coefficient: 3,
            firstTest: { average: 88, total: 100 },
            secondTest: { average: 85, total: 100 },
            thirdTerm: { average: 87, total: 100, position: 5 },
            grade: 'A-',
            teacher: 'Dr. Wilson',
            group: 'Science',
        },
        {
            id: 'physics',
            subject: 'Physics',
            subjectCode: 'PHY',
            coefficient: 4,
            firstTest: { average: 75, total: 100 },
            secondTest: { average: 82, total: 100 },
            thirdTerm: { average: 79, total: 100, position: 15 },
            grade: 'B',
            teacher: 'Mr. Brown',
            group: 'Science',
        },
        {
            id: 'english',
            subject: 'English Language',
            subjectCode: 'ENG',
            coefficient: 3,
            firstTest: { average: 92, total: 100 },
            secondTest: { average: 89, total: 100 },
            thirdTerm: { average: 91, total: 100, position: 3 },
            grade: 'A',
            teacher: 'Ms. Davis',
            group: 'Languages',
        },
        {
            id: 'french',
            subject: 'French Language',
            subjectCode: 'FRE',
            coefficient: 2,
            firstTest: { average: 68, total: 100 },
            secondTest: { average: 72, total: 100 },
            thirdTerm: { average: 70, total: 100, position: 18 },
            grade: 'C+',
            teacher: 'Mme. Martin',
            group: 'Languages',
        },
        {
            id: 'history',
            subject: 'History',
            subjectCode: 'HIS',
            coefficient: 2,
            firstTest: { average: 85, total: 100 },
            secondTest: { average: 78, total: 100 },
            thirdTerm: { average: 82, total: 100, position: 9 },
            grade: 'B+',
            teacher: 'Mr. Clark',
            group: 'Arts',
        },
        {
            id: 'geography',
            subject: 'Geography',
            subjectCode: 'GEO',
            coefficient: 2,
            firstTest: { average: 80, total: 100 },
            secondTest: { average: 77, total: 100 },
            thirdTerm: { average: 79, total: 100, position: 11 },
            grade: 'B',
            teacher: 'Ms. Taylor',
            group: 'Arts',
        },
        {
            id: 'pe',
            subject: 'Physical Education',
            subjectCode: 'PE',
            coefficient: 1,
            firstTest: { average: 95, total: 100 },
            secondTest: { average: 92, total: 100 },
            thirdTerm: { average: 94, total: 100, position: 2 },
            grade: 'A',
            teacher: 'Coach Wilson',
            group: 'Others',
        },
        {
            id: 'religious',
            subject: 'Religious Studies',
            subjectCode: 'REL',
            coefficient: 1,
            firstTest: { average: 88, total: 100 },
            secondTest: { average: 85, total: 100 },
            thirdTerm: { average: 87, total: 100, position: 6 },
            grade: 'A-',
            teacher: 'Fr. Joseph',
            group: 'Others',
        },
    ],
    groupSummaries: [
        {
            groupName: 'Science Group Results',
            totalMarks: 1400,
            groupAverage: 81.8,
            groupPosition: 8,
        },
        {
            groupName: 'Arts Group Results',
            totalMarks: 400,
            groupAverage: 80.5,
            groupPosition: 10,
        },
        {
            groupName: 'Languages Group Results',
            totalMarks: 500,
            groupAverage: 80.6,
            groupPosition: 12,
        },
        {
            groupName: 'Others Group Results',
            totalMarks: 200,
            groupAverage: 90.5,
            groupPosition: 4,
        },
    ],
    overallSummary: {
        firstTermAverage: 78.5,
        secondTermAverage: 80.2,
        thirdTermAverage: 81.2,
        annualAverage: 79.97,
        classPosition: 9,
        totalStudents: 42,
        bestAverage: 95.2,
        worstAverage: 45.8,
    },
    discipline: {
        totalAbsences: 3,
        suspensions: 0,
        punishments: 0,
        warnings: 1,
        remarks: 'Good behavior overall. Excellent participation in class.',
    },
};

// Helper functions for grade calculation
const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return '#10b981'; // Green
    if (percentage >= 80) return '#3b82f6'; // Blue
    if (percentage >= 70) return '#f59e0b'; // Orange
    if (percentage >= 60) return '#8b5cf6'; // Purple
    return '#ef4444'; // Red
};

const getGradeBackground = (percentage: number): string => {
    if (percentage >= 90) return 'rgba(16, 185, 129, 0.1)';
    if (percentage >= 80) return 'rgba(59, 130, 246, 0.1)';
    if (percentage >= 70) return 'rgba(245, 158, 11, 0.1)';
    if (percentage >= 60) return 'rgba(139, 92, 246, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
};

// Tab Panel Component
function TabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const { children, value, index } = props;
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export const ResultsOverview: React.FC<ResultsOverviewProps> = ({
    selectedStudent,
}) => {
    const [reportData, setReportData] = useState<TermReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
    const [sequences] = useState<SequenceAssessment[]>(mockSequenceData);
    const [selectedSubject, setSelectedSubject] = useState<any | null>(null);
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

    useEffect(() => {
        let mounted = true;

        if (selectedStudent) {
            const loadData = async () => {
                if (mounted) {
                    setIsLoading(true);
                    // Simulate async data loading
                    await new Promise(resolve => setTimeout(resolve, 500));
                    if (mounted) {
                        setReportData(mockReportCardData);
                        setIsLoading(false);
                    }
                }
            };

            loadData();
        }

        return () => {
            mounted = false;
        };
    }, [selectedStudent]);

    // Find current sequence index on load
    React.useEffect(() => {
        if (sequences.length > 0) {
            const currentIndex = sequences.findIndex(seq => seq.isCurrent);
            setCurrentSequenceIndex(
                currentIndex >= 0 ? currentIndex : sequences.length - 1
            );
        }
    }, [sequences]);

    const currentSequence = sequences[currentSequenceIndex];

    const handlePreviousSequence = () => {
        if (currentSequenceIndex > 0) {
            setCurrentSequenceIndex(currentSequenceIndex - 1);
        }
    };

    const handleNextSequence = () => {
        if (currentSequenceIndex < sequences.length - 1) {
            setCurrentSequenceIndex(currentSequenceIndex + 1);
        }
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSubjectClick = (subject: any) => {
        setSelectedSubject(subject);
        setIsSubjectModalOpen(true);
    };

    const handleSubjectModalClose = () => {
        setIsSubjectModalOpen(false);
        setSelectedSubject(null);
    };

    if (isLoading || !reportData || !selectedStudent) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Loading academic results...
                </Typography>
            </Box>
        );
    }

    // Group subjects by category
    const subjectsByGroup = reportData.subjects.reduce(
        (acc, subject) => {
            if (!acc[subject.group]) {
                acc[subject.group] = [];
            }
            acc[subject.group].push(subject);
            return acc;
        },
        {} as Record<string, SubjectResult[]>
    );

    return (
        <Box>
            {/* Header with student info */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'text.primary',
                        mb: 0.5,
                    }}
                >
                    Academic Results
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.8125rem',
                    }}
                >
                    {selectedStudent.fullName} • Grade {selectedStudent.grade}
                </Typography>
            </Box>

            {/* Tabs */}
            <Paper
                elevation={0}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{ px: 1 }}
                    >
                        <Tab
                            icon={<ResultsIcon sx={{ fontSize: 16 }} />}
                            label="Current Term Report"
                            iconPosition="start"
                            sx={{
                                minHeight: 48,
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                            }}
                        />
                        <Tab
                            icon={<CalendarIcon sx={{ fontSize: 16 }} />}
                            label="Sequential Reports"
                            iconPosition="start"
                            sx={{
                                minHeight: 48,
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                            }}
                        />
                        <Tab
                            icon={<SummaryIcon sx={{ fontSize: 16 }} />}
                            label="Annual Summary"
                            iconPosition="start"
                            sx={{
                                minHeight: 48,
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                            }}
                        />
                    </Tabs>
                </Box>

                {/* Current Term Report Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ p: 1.5 }}>
                        {/* Report Header */}
                        <Box
                            sx={{
                                textAlign: 'center',
                                mb: 3,
                                p: 2,
                                bgcolor: 'primary.50',
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 0.5,
                                    fontSize: '1.125rem',
                                }}
                            >
                                {reportData.termName.toUpperCase()} REPORT CARD
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                            >
                                ACADEMIC YEAR {reportData.academicYear}
                            </Typography>
                        </Box>

                        {/* Student Information */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: 2,
                                mb: 3,
                                p: 1.5,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                    }}
                                >
                                    Class:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500 }}
                                >
                                    Form {selectedStudent.grade}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                    }}
                                >
                                    Surname & Name:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {selectedStudent.fullName}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                    }}
                                >
                                    Number on roll:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {'N/A'}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Subject Results Table */}
                        {Object.entries(subjectsByGroup).map(
                            ([groupName, subjects]) => (
                                <Box key={groupName} sx={{ mb: 3 }}>
                                    {/* Group Header */}
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1,
                                            fontSize: '0.875rem',
                                            color: 'primary.main',
                                        }}
                                    >
                                        {groupName} Group Results
                                    </Typography>

                                    <TableContainer
                                        component={Paper}
                                        elevation={0}
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow
                                                    sx={{ bgcolor: 'grey.50' }}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            p: 1,
                                                        }}
                                                    >
                                                        Subject
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            p: 1,
                                                        }}
                                                    >
                                                        Coef.
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            p: 1,
                                                        }}
                                                    >
                                                        1st Test
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            p: 1,
                                                        }}
                                                    >
                                                        2nd Test
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            p: 1,
                                                        }}
                                                    >
                                                        3rd Term
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            p: 1,
                                                        }}
                                                    >
                                                        Grade
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            p: 1,
                                                        }}
                                                    >
                                                        Teacher
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {subjects.map(subject => (
                                                    <TableRow
                                                        key={subject.id}
                                                        sx={{
                                                            '&:hover': {
                                                                bgcolor:
                                                                    'action.hover',
                                                            },
                                                        }}
                                                    >
                                                        <TableCell
                                                            sx={{ p: 1 }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    fontSize:
                                                                        '0.8125rem',
                                                                }}
                                                            >
                                                                {
                                                                    subject.subject
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.75rem',
                                                                }}
                                                            >
                                                                {
                                                                    subject.subjectCode
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ p: 1 }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.8125rem',
                                                                }}
                                                            >
                                                                {
                                                                    subject.coefficient
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ p: 1 }}
                                                        >
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.8125rem',
                                                                    }}
                                                                >
                                                                    Ave.{' '}
                                                                    {
                                                                        subject
                                                                            .firstTest
                                                                            .average
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.75rem',
                                                                    }}
                                                                >
                                                                    Total{' '}
                                                                    {
                                                                        subject
                                                                            .firstTest
                                                                            .total
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ p: 1 }}
                                                        >
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.8125rem',
                                                                    }}
                                                                >
                                                                    Ave.{' '}
                                                                    {
                                                                        subject
                                                                            .secondTest
                                                                            .average
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.75rem',
                                                                    }}
                                                                >
                                                                    Total{' '}
                                                                    {
                                                                        subject
                                                                            .secondTest
                                                                            .total
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ p: 1 }}
                                                        >
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.8125rem',
                                                                    }}
                                                                >
                                                                    Ave.{' '}
                                                                    {
                                                                        subject
                                                                            .thirdTerm
                                                                            .average
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    sx={{
                                                                        fontSize:
                                                                            '0.75rem',
                                                                    }}
                                                                >
                                                                    Pos.{' '}
                                                                    {
                                                                        subject
                                                                            .thirdTerm
                                                                            .position
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ p: 1 }}
                                                        >
                                                            <Chip
                                                                label={
                                                                    subject.grade
                                                                }
                                                                size="small"
                                                                sx={{
                                                                    bgcolor:
                                                                        getGradeBackground(
                                                                            subject
                                                                                .thirdTerm
                                                                                .average
                                                                        ),
                                                                    color: getGradeColor(
                                                                        subject
                                                                            .thirdTerm
                                                                            .average
                                                                    ),
                                                                    fontWeight: 600,
                                                                    fontSize:
                                                                        '0.75rem',
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{ p: 1 }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.8125rem',
                                                                }}
                                                            >
                                                                {
                                                                    subject.teacher
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Group Summary */}
                                    <Box
                                        sx={{
                                            p: 1,
                                            bgcolor: 'background.default',
                                            borderRadius: 0.5,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        {reportData.groupSummaries.find(g =>
                                            g.groupName.includes(groupName)
                                        ) && (
                                            <Typography
                                                variant="caption"
                                                sx={{ fontSize: '0.75rem' }}
                                            >
                                                Group total Marks:{' '}
                                                {
                                                    reportData.groupSummaries.find(
                                                        g =>
                                                            g.groupName.includes(
                                                                groupName
                                                            )
                                                    )!.totalMarks
                                                }{' '}
                                                • Group Ave:{' '}
                                                {
                                                    reportData.groupSummaries.find(
                                                        g =>
                                                            g.groupName.includes(
                                                                groupName
                                                            )
                                                    )!.groupAverage
                                                }{' '}
                                                • Group position:{' '}
                                                {
                                                    reportData.groupSummaries.find(
                                                        g =>
                                                            g.groupName.includes(
                                                                groupName
                                                            )
                                                    )!.groupPosition
                                                }
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            )
                        )}

                        {/* Overall Summary */}
                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: 'primary.50',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'primary.200',
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Others Results
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        1st Term Ave.:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .firstTermAverage
                                        }
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        2nd Term Ave.:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .secondTermAverage
                                        }
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        3rd Term Ave.:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .thirdTermAverage
                                        }
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Annual Ave.:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .annualAverage
                                        }
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Position:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .classPosition
                                        }
                                        /
                                        {
                                            reportData.overallSummary
                                                .totalStudents
                                        }
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: 2,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Best Ave.:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {reportData.overallSummary.bestAverage}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Worst Ave.:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {reportData.overallSummary.worstAverage}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Discipline Section */}
                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    textAlign: 'center',
                                    fontSize: '0.875rem',
                                }}
                            >
                                DISCIPLINE
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(120px, 1fr))',
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Total Abs:
                                    </Typography>
                                    <Typography variant="body2">
                                        {reportData.discipline.totalAbsences}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Suspensions:
                                    </Typography>
                                    <Typography variant="body2">
                                        {reportData.discipline.suspensions}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Punishments:
                                    </Typography>
                                    <Typography variant="body2">
                                        {reportData.discipline.punishments}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Warning:
                                    </Typography>
                                    <Typography variant="body2">
                                        {reportData.discipline.warnings}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    p: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 0.5,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Remark:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: '0.8125rem', mt: 0.5 }}
                                >
                                    {reportData.discipline.remarks}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>

                {/* Sequential Reports Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Box sx={{ p: 1.5 }}>
                        {/* Sequence Navigation */}
                        <Box sx={{ mb: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 2,
                                    p: 2,
                                    bgcolor: 'primary.50',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'primary.200',
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={handlePreviousSequence}
                                    disabled={currentSequenceIndex === 0}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 0.5,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <PreviousIcon sx={{ fontSize: 16 }} />
                                </IconButton>

                                <Box
                                    sx={{ textAlign: 'center', flex: 1, mx: 2 }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            mb: 0.5,
                                        }}
                                    >
                                        {currentSequence?.assessmentPeriod ||
                                            'No Data'}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Sequence {currentSequenceIndex + 1} of{' '}
                                        {sequences.length} • Term{' '}
                                        {currentSequence?.termNumber || 'N/A'} •{' '}
                                        {currentSequence?.academicYear}
                                    </Typography>
                                </Box>

                                <IconButton
                                    size="small"
                                    onClick={handleNextSequence}
                                    disabled={
                                        currentSequenceIndex ===
                                        sequences.length - 1
                                    }
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 0.5,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <NextIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>

                            {/* Progress Timeline */}
                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        mb: 1,
                                        display: 'block',
                                    }}
                                >
                                    Sequence Progress
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    {sequences.map((seq, index) => (
                                        <Box
                                            key={seq.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flex: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: '50%',
                                                    bgcolor: seq.isCompleted
                                                        ? 'success.main'
                                                        : seq.isCurrent
                                                          ? 'primary.main'
                                                          : 'grey.300',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    border:
                                                        index ===
                                                        currentSequenceIndex
                                                            ? '2px solid'
                                                            : 'none',
                                                    borderColor:
                                                        index ===
                                                        currentSequenceIndex
                                                            ? 'warning.main'
                                                            : 'none',
                                                }}
                                            >
                                                {seq.sequenceNumber}
                                            </Box>
                                            {index < sequences.length - 1 && (
                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        height: 2,
                                                        bgcolor: seq.isCompleted
                                                            ? 'success.main'
                                                            : 'grey.300',
                                                        mx: 0.5,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>

                        {/* Sequence Details */}
                        {currentSequence ? (
                            <>
                                {/* Status Banner */}
                                <Box
                                    sx={{
                                        p: 1.5,
                                        mb: 3,
                                        borderRadius: 1,
                                        bgcolor: currentSequence.isCompleted
                                            ? 'success.50'
                                            : currentSequence.isCurrent
                                              ? 'warning.50'
                                              : 'grey.50',
                                        border: '1px solid',
                                        borderColor: currentSequence.isCompleted
                                            ? 'success.200'
                                            : currentSequence.isCurrent
                                              ? 'warning.200'
                                              : 'grey.200',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <TimelineIcon
                                            sx={{
                                                fontSize: 20,
                                                color: currentSequence.isCompleted
                                                    ? 'success.main'
                                                    : currentSequence.isCurrent
                                                      ? 'warning.main'
                                                      : 'grey.500',
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.8125rem',
                                                }}
                                            >
                                                {currentSequence.isCompleted
                                                    ? 'Completed Assessment'
                                                    : currentSequence.isCurrent
                                                      ? 'Current Assessment Period'
                                                      : 'Upcoming Assessment'}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {new Date(
                                                    currentSequence.startDate
                                                ).toLocaleDateString()}{' '}
                                                -{' '}
                                                {new Date(
                                                    currentSequence.endDate
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {currentSequence.isCompleted ? (
                                    <>
                                        {/* Overall Performance */}
                                        <Box
                                            sx={{
                                                mb: 3,
                                                p: 2,
                                                bgcolor: 'primary.50',
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'primary.200',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                Overall Performance
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns:
                                                        'repeat(auto-fit, minmax(120px, 1fr))',
                                                    gap: 2,
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'text.secondary',
                                                        }}
                                                    >
                                                        Total Marks:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {
                                                            currentSequence
                                                                .overallPerformance
                                                                .obtainedMarks
                                                        }
                                                        /
                                                        {
                                                            currentSequence
                                                                .overallPerformance
                                                                .totalMarks
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'text.secondary',
                                                        }}
                                                    >
                                                        Average:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {
                                                            currentSequence
                                                                .overallPerformance
                                                                .averagePercentage
                                                        }
                                                        %
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'text.secondary',
                                                        }}
                                                    >
                                                        Grade:
                                                    </Typography>
                                                    <Chip
                                                        label={
                                                            currentSequence
                                                                .overallPerformance
                                                                .grade
                                                        }
                                                        size="small"
                                                        sx={{
                                                            bgcolor:
                                                                getGradeBackground(
                                                                    currentSequence
                                                                        .overallPerformance
                                                                        .averagePercentage
                                                                ),
                                                            color: getGradeColor(
                                                                currentSequence
                                                                    .overallPerformance
                                                                    .averagePercentage
                                                            ),
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'text.secondary',
                                                        }}
                                                    >
                                                        Position:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {
                                                            currentSequence
                                                                .overallPerformance
                                                                .position
                                                        }
                                                        /
                                                        {
                                                            currentSequence
                                                                .overallPerformance
                                                                .totalStudents
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* Subject Results */}
                                        <Box sx={{ mb: 3 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    fontSize: '0.875rem',
                                                    color: 'primary.main',
                                                }}
                                            >
                                                Subject Results
                                            </Typography>

                                            <TableContainer
                                                component={Paper}
                                                elevation={0}
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow
                                                            sx={{
                                                                bgcolor:
                                                                    'grey.50',
                                                            }}
                                                        >
                                                            <TableCell
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    p: 1,
                                                                }}
                                                            >
                                                                Subject
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    p: 1,
                                                                }}
                                                            >
                                                                Marks
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    p: 1,
                                                                }}
                                                            >
                                                                Percentage
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    p: 1,
                                                                }}
                                                            >
                                                                Grade
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    p: 1,
                                                                }}
                                                            >
                                                                Position
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize:
                                                                        '0.75rem',
                                                                    p: 1,
                                                                }}
                                                            >
                                                                Teacher
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {currentSequence.subjects.map(
                                                            subject => (
                                                                <TableRow
                                                                    key={
                                                                        subject.subjectId
                                                                    }
                                                                    onClick={() =>
                                                                        handleSubjectClick(
                                                                            subject
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        '&:hover':
                                                                            {
                                                                                bgcolor:
                                                                                    'action.hover',
                                                                            },
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    <TableCell
                                                                        sx={{
                                                                            p: 1,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                fontWeight: 600,
                                                                                fontSize:
                                                                                    '0.8125rem',
                                                                            }}
                                                                        >
                                                                            {
                                                                                subject.subject
                                                                            }
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="caption"
                                                                            color="text.secondary"
                                                                            sx={{
                                                                                fontSize:
                                                                                    '0.75rem',
                                                                            }}
                                                                        >
                                                                            {
                                                                                subject.subjectCode
                                                                            }
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell
                                                                        align="center"
                                                                        sx={{
                                                                            p: 1,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                fontSize:
                                                                                    '0.8125rem',
                                                                            }}
                                                                        >
                                                                            {
                                                                                subject.marksObtained
                                                                            }
                                                                            /
                                                                            {
                                                                                subject.totalMarks
                                                                            }
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell
                                                                        align="center"
                                                                        sx={{
                                                                            p: 1,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                fontSize:
                                                                                    '0.8125rem',
                                                                                fontWeight: 600,
                                                                            }}
                                                                        >
                                                                            {
                                                                                subject.percentage
                                                                            }
                                                                            %
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell
                                                                        align="center"
                                                                        sx={{
                                                                            p: 1,
                                                                        }}
                                                                    >
                                                                        <Chip
                                                                            label={
                                                                                subject.grade
                                                                            }
                                                                            size="small"
                                                                            sx={{
                                                                                bgcolor:
                                                                                    getGradeBackground(
                                                                                        subject.percentage
                                                                                    ),
                                                                                color: getGradeColor(
                                                                                    subject.percentage
                                                                                ),
                                                                                fontWeight: 600,
                                                                                fontSize:
                                                                                    '0.75rem',
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell
                                                                        align="center"
                                                                        sx={{
                                                                            p: 1,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                fontSize:
                                                                                    '0.8125rem',
                                                                            }}
                                                                        >
                                                                            {
                                                                                subject.position
                                                                            }
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            p: 1,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                fontSize:
                                                                                    '0.8125rem',
                                                                            }}
                                                                        >
                                                                            {
                                                                                subject.teacher
                                                                            }
                                                                        </Typography>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </>
                                ) : (
                                    <Box
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            border: '2px dashed',
                                            borderColor: 'grey.300',
                                            borderRadius: 1,
                                            bgcolor: 'grey.50',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            {currentSequence.isCurrent
                                                ? 'Assessment in Progress'
                                                : 'Assessment Not Yet Started'}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Results will be available after the
                                            assessment period ends.
                                        </Typography>
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Box sx={{ p: 3, textAlign: 'center' }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    No sequence data available.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </TabPanel>

                {/* Annual Summary Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ p: 1.5 }}>
                        {/* Annual Header */}
                        <Box
                            sx={{
                                textAlign: 'center',
                                mb: 3,
                                p: 2,
                                bgcolor: 'success.50',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'success.200',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 0.5,
                                    fontSize: '1.125rem',
                                }}
                            >
                                ANNUAL ACADEMIC SUMMARY
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                            >
                                {reportData.academicYear} • Complete Academic
                                Performance
                            </Typography>
                        </Box>

                        {/* Year-long Performance Trends */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontSize: '0.875rem',
                                    color: 'primary.main',
                                }}
                            >
                                Performance Trends Across Terms
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(140px, 1fr))',
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        bgcolor: 'primary.50',
                                        border: '1px solid',
                                        borderColor: 'primary.100',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        First Term Average
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1.25rem',
                                        }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .firstTermAverage
                                        }
                                        %
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            reportData.overallSummary
                                                .firstTermAverage
                                        }
                                        sx={{
                                            mt: 0.5,
                                            height: 4,
                                            borderRadius: 2,
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        bgcolor: 'warning.50',
                                        border: '1px solid',
                                        borderColor: 'warning.100',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Second Term Average
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1.25rem',
                                        }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .secondTermAverage
                                        }
                                        %
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            reportData.overallSummary
                                                .secondTermAverage
                                        }
                                        sx={{
                                            mt: 0.5,
                                            height: 4,
                                            borderRadius: 2,
                                        }}
                                        color="warning"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        bgcolor: 'success.50',
                                        border: '1px solid',
                                        borderColor: 'success.100',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Third Term Average
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1.25rem',
                                        }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .thirdTermAverage
                                        }
                                        %
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            reportData.overallSummary
                                                .thirdTermAverage
                                        }
                                        sx={{
                                            mt: 0.5,
                                            height: 4,
                                            borderRadius: 2,
                                        }}
                                        color="success"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        bgcolor: 'info.50',
                                        border: '1px solid',
                                        borderColor: 'info.100',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Annual Average
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1.25rem',
                                        }}
                                    >
                                        {
                                            reportData.overallSummary
                                                .annualAverage
                                        }
                                        %
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            reportData.overallSummary
                                                .annualAverage
                                        }
                                        sx={{
                                            mt: 0.5,
                                            height: 4,
                                            borderRadius: 2,
                                        }}
                                        color="info"
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* Subject Performance Analysis */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontSize: '0.875rem',
                                    color: 'primary.main',
                                }}
                            >
                                Subject Performance Analysis
                            </Typography>

                            {Object.entries(subjectsByGroup).map(
                                ([groupName, subjects]) => (
                                    <Box key={groupName} sx={{ mb: 2 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                fontSize: '0.8125rem',
                                                color: 'secondary.main',
                                            }}
                                        >
                                            {groupName} Group
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns:
                                                    'repeat(auto-fit, minmax(180px, 1fr))',
                                                gap: 1.5,
                                            }}
                                        >
                                            {subjects.map(subject => (
                                                <Box
                                                    key={subject.id}
                                                    sx={{
                                                        p: 1.5,
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 1,
                                                        bgcolor:
                                                            'background.paper',
                                                        '&:hover': {
                                                            bgcolor:
                                                                'action.hover',
                                                        },
                                                    }}
                                                >
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
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.8125rem',
                                                            }}
                                                        >
                                                            {subject.subject}
                                                        </Typography>
                                                        <Chip
                                                            label={
                                                                subject.grade
                                                            }
                                                            size="small"
                                                            sx={{
                                                                bgcolor:
                                                                    getGradeBackground(
                                                                        subject
                                                                            .thirdTerm
                                                                            .average
                                                                    ),
                                                                color: getGradeColor(
                                                                    subject
                                                                        .thirdTerm
                                                                        .average
                                                                ),
                                                                fontWeight: 600,
                                                                fontSize:
                                                                    '0.6875rem',
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                        }}
                                                    >
                                                        Current Term:{' '}
                                                        {
                                                            subject.thirdTerm
                                                                .average
                                                        }
                                                        % • Position:{' '}
                                                        {
                                                            subject.thirdTerm
                                                                .position
                                                        }
                                                    </Typography>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={
                                                            subject.thirdTerm
                                                                .average
                                                        }
                                                        sx={{
                                                            mt: 0.5,
                                                            height: 3,
                                                            borderRadius: 1.5,
                                                            bgcolor: 'grey.200',
                                                            '& .MuiLinearProgress-bar':
                                                                {
                                                                    bgcolor:
                                                                        getGradeColor(
                                                                            subject
                                                                                .thirdTerm
                                                                                .average
                                                                        ),
                                                                },
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )
                            )}
                        </Box>

                        {/* Class Standing & Recognition */}
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'primary.50',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'primary.200',
                                mb: 3,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Class Standing & Academic Recognition
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(160px, 1fr))',
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ textAlign: 'center', p: 1 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'primary.main',
                                        }}
                                    >
                                        #
                                        {
                                            reportData.overallSummary
                                                .classPosition
                                        }
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Out of{' '}
                                        {
                                            reportData.overallSummary
                                                .totalStudents
                                        }{' '}
                                        Students
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center', p: 1 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'success.main',
                                        }}
                                    >
                                        {reportData.overallSummary.bestAverage}%
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Best Term Average
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center', p: 1 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color:
                                                reportData.overallSummary
                                                    .annualAverage >= 85
                                                    ? 'success.main'
                                                    : reportData.overallSummary
                                                            .annualAverage >= 70
                                                      ? 'warning.main'
                                                      : 'error.main',
                                        }}
                                    >
                                        {reportData.overallSummary
                                            .annualAverage >= 85
                                            ? 'EXCELLENT'
                                            : reportData.overallSummary
                                                    .annualAverage >= 70
                                              ? 'GOOD'
                                              : 'NEEDS IMPROVEMENT'}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Overall Rating
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Academic Progress Summary */}
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontSize: '0.875rem',
                                    textAlign: 'center',
                                }}
                            >
                                Academic Progress Summary
                            </Typography>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        lineHeight: 1.6,
                                        color: 'text.secondary',
                                    }}
                                >
                                    Based on{' '}
                                    {
                                        sequences.filter(s => s.isCompleted)
                                            .length
                                    }{' '}
                                    completed assessments across{' '}
                                    {reportData.academicYear}, this student has
                                    demonstrated
                                    {reportData.overallSummary.annualAverage >=
                                    85
                                        ? ' excellent academic performance with consistent high achievements.'
                                        : reportData.overallSummary
                                                .annualAverage >= 70
                                          ? ' good academic progress with room for continued improvement.'
                                          : ' academic challenges that require additional support and focus.'}{' '}
                                    The student currently ranks #
                                    {reportData.overallSummary.classPosition} in
                                    a class of{' '}
                                    {reportData.overallSummary.totalStudents}{' '}
                                    students.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
            </Paper>

            {/* Subject Detail Modal */}
            <Dialog
                open={isSubjectModalOpen}
                onClose={handleSubjectModalClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: 'divider',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: 1,
                        borderColor: 'divider',
                        pb: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TrendIcon
                            sx={{ color: 'primary.main', fontSize: '1.5rem' }}
                        />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {selectedSubject?.subject || 'Subject Details'}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {selectedSubject?.subjectCode} •{' '}
                                {selectedSubject?.teacher}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={handleSubjectModalClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 3 }}>
                    {selectedSubject && (
                        <Grid container spacing={3}>
                            {/* Performance Summary */}
                            <Grid size={{ xs: 12 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        background:
                                            'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                        border: 1,
                                        borderColor: 'primary.200',
                                        boxShadow: 'none',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: 'primary.main',
                                        }}
                                    >
                                        Performance Overview
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={
                                                        selectedSubject.grade
                                                    }
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 700,
                                                        mb: 1,
                                                        bgcolor:
                                                            getGradeBackground(
                                                                selectedSubject.percentage
                                                            ),
                                                        color: getGradeColor(
                                                            selectedSubject.percentage
                                                        ),
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    color="text.secondary"
                                                >
                                                    Grade
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: 'primary.main',
                                                    }}
                                                >
                                                    {selectedSubject.percentage}
                                                    %
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    color="text.secondary"
                                                >
                                                    Percentage
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: 'text.primary',
                                                    }}
                                                >
                                                    {
                                                        selectedSubject.marksObtained
                                                    }
                                                    /
                                                    {selectedSubject.totalMarks}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    color="text.secondary"
                                                >
                                                    Marks
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: 'warning.main',
                                                    }}
                                                >
                                                    #{selectedSubject.position}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    color="text.secondary"
                                                >
                                                    Position
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Performance Progress */}
                            <Grid size={{ xs: 12 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        boxShadow: 'none',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, mb: 3 }}
                                    >
                                        Progress Visualization
                                    </Typography>

                                    <LinearProgress
                                        variant="determinate"
                                        value={selectedSubject.percentage}
                                        sx={{
                                            height: 12,
                                            borderRadius: 6,
                                            backgroundColor: 'grey.200',
                                            mb: 1,
                                            '& .MuiLinearProgress-bar': {
                                                borderRadius: 6,
                                                background: `linear-gradient(90deg, ${getGradeColor(selectedSubject.percentage)}, ${getGradeColor(selectedSubject.percentage)}cc)`,
                                            },
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mt: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            0%
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {selectedSubject.percentage}%
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            100%
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Performance Analysis */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        boxShadow: 'none',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, mb: 2 }}
                                    >
                                        Detailed Breakdown
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                p: 2,
                                                bgcolor: 'grey.50',
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Subject Code
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {selectedSubject.subjectCode}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                p: 2,
                                                bgcolor: 'grey.50',
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Teacher
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {selectedSubject.teacher}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                p: 2,
                                                bgcolor: 'grey.50',
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Total Students
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {selectedSubject.totalStudents ||
                                                    'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Performance Comments */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        boxShadow: 'none',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, mb: 2 }}
                                    >
                                        Performance Summary
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            lineHeight: 1.6,
                                            color: 'text.secondary',
                                            mb: 2,
                                        }}
                                    >
                                        {selectedSubject.percentage >= 80
                                            ? `Excellent performance in ${selectedSubject.subject}. The student demonstrates a strong understanding of the subject matter and consistently achieves high marks.`
                                            : selectedSubject.percentage >= 70
                                              ? `Good performance in ${selectedSubject.subject}. The student shows solid understanding with room for improvement in some areas.`
                                              : selectedSubject.percentage >= 60
                                                ? `Satisfactory performance in ${selectedSubject.subject}. Additional focus and practice recommended to strengthen understanding.`
                                                : `Performance in ${selectedSubject.subject} needs improvement. Extra attention and support required to meet academic standards.`}
                                    </Typography>

                                    <Box
                                        sx={{
                                            p: 2,
                                            bgcolor:
                                                selectedSubject.percentage >= 70
                                                    ? 'success.50'
                                                    : selectedSubject.percentage >=
                                                        60
                                                      ? 'warning.50'
                                                      : 'error.50',
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor:
                                                selectedSubject.percentage >= 70
                                                    ? 'success.200'
                                                    : selectedSubject.percentage >=
                                                        60
                                                      ? 'warning.200'
                                                      : 'error.200',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {selectedSubject.percentage >= 70
                                                ? 'Strengths'
                                                : 'Areas for Improvement'}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '0.8125rem',
                                                mt: 0.5,
                                            }}
                                        >
                                            {selectedSubject.percentage >= 70
                                                ? 'Consistent performance and good grasp of concepts.'
                                                : 'Focus on fundamental concepts and regular practice required.'}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};
