import {
    Assignment as AssignmentIcon,
    CheckCircle as CheckIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
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
    Collapse,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import type {
    Assignment,
    Grade,
    GradingPeriod,
    SubjectPerformance,
} from '../../../../types/academic.types';
import type { Student } from '../../../../types/student.types';

interface GradesOverviewProps {
    selectedStudent: Student | null;
    className?: string;
}

interface ExtendedSubjectPerformance extends SubjectPerformance {
    assignments: Assignment[];
    grades: Grade[];
    categoryBreakdown: {
        category: string;
        weight: number;
        currentGrade: number;
        letterGrade: string;
        pointsEarned: number;
        pointsPossible: number;
        assignmentCount: number;
    }[];
}

// Mock data for detailed grades
const mockGradingPeriods: GradingPeriod[] = [
    {
        id: 'q1-2024',
        name: 'Quarter 1',
        type: 'quarter',
        startDate: '2024-08-15',
        endDate: '2024-10-25',
        isCurrent: true,
        isFinalized: false,
    },
    {
        id: 'q2-2024',
        name: 'Quarter 2',
        type: 'quarter',
        startDate: '2024-10-28',
        endDate: '2024-01-17',
        isCurrent: false,
        isFinalized: false,
    },
];

const mockSubjectGrades: ExtendedSubjectPerformance[] = [
    {
        classId: 'class1',
        subject: 'Advanced Mathematics',
        teacher: 'Ms. Rodriguez',
        currentGrade: 'A-',
        currentPercentage: 91.5,
        currentGPA: 3.7,
        letterGrade: 'A-',
        trend: 'up',
        trendPercentage: 3.2,
        assignments: {
            total: 15,
            completed: 14,
            missing: 1,
            late: 0,
            upcoming: 3,
        },
        categoryBreakdown: [
            {
                category: 'Tests',
                weight: 40,
                currentGrade: 88.5,
                letterGrade: 'B+',
                pointsEarned: 354,
                pointsPossible: 400,
                assignmentCount: 4,
            },
            {
                category: 'Quizzes',
                weight: 30,
                currentGrade: 94.2,
                letterGrade: 'A',
                pointsEarned: 188,
                pointsPossible: 200,
                assignmentCount: 8,
            },
            {
                category: 'Homework',
                weight: 20,
                currentGrade: 95.0,
                letterGrade: 'A',
                pointsEarned: 190,
                pointsPossible: 200,
                assignmentCount: 12,
            },
            {
                category: 'Participation',
                weight: 10,
                currentGrade: 92.0,
                letterGrade: 'A-',
                pointsEarned: 46,
                pointsPossible: 50,
                assignmentCount: 1,
            },
        ],
        recentGrades: [],
        upcomingAssignments: [],
        lastUpdated: '2024-01-18T11:30:00Z',
        assignments: [
            {
                id: 'assign1',
                classId: 'class1',
                title: 'Chapter 8 Test',
                type: 'test',
                category: 'assessments',
                pointsPossible: 100,
                dueDate: '2024-01-22T09:00:00Z',
                assignedDate: '2024-01-15T09:00:00Z',
                submissionType: ['paper'],
                isExtraCredit: false,
                allowLateSubmissions: false,
                status: 'assigned',
            },
        ],
        grades: [
            {
                id: 'grade1',
                studentId: 'student1',
                classId: 'class1',
                assignmentId: 'assign1',
                grade: 'A-',
                numericGrade: 91,
                pointsEarned: 91,
                pointsPossible: 100,
                percentage: 91,
                letterGrade: 'A-',
                gpValue: 3.7,
                dateGraded: '2024-01-18T10:30:00Z',
                gradedBy: 'teacher1',
                isExcused: false,
                isLate: false,
                parentViewed: false,
            },
        ],
    },
    {
        classId: 'class2',
        subject: 'AP Biology',
        teacher: 'Mr. Thompson',
        currentGrade: 'B+',
        currentPercentage: 87.2,
        currentGPA: 3.3,
        letterGrade: 'B+',
        trend: 'stable',
        trendPercentage: 0.5,
        assignments: {
            total: 12,
            completed: 11,
            missing: 1,
            late: 1,
            upcoming: 2,
        },
        categoryBreakdown: [
            {
                category: 'Labs',
                weight: 35,
                currentGrade: 89.3,
                letterGrade: 'B+',
                pointsEarned: 268,
                pointsPossible: 300,
                assignmentCount: 6,
            },
            {
                category: 'Tests',
                weight: 35,
                currentGrade: 84.7,
                letterGrade: 'B',
                pointsEarned: 254,
                pointsPossible: 300,
                assignmentCount: 3,
            },
            {
                category: 'Projects',
                weight: 20,
                currentGrade: 90.5,
                letterGrade: 'A-',
                pointsEarned: 181,
                pointsPossible: 200,
                assignmentCount: 2,
            },
            {
                category: 'Participation',
                weight: 10,
                currentGrade: 88.0,
                letterGrade: 'B+',
                pointsEarned: 44,
                pointsPossible: 50,
                assignmentCount: 1,
            },
        ],
        recentGrades: [],
        upcomingAssignments: [],
        lastUpdated: '2024-01-18T11:30:00Z',
        assignments: [],
        grades: [],
    },
];

export const GradesOverview: React.FC<GradesOverviewProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const [selectedPeriod, setSelectedPeriod] = useState('q1-2024');
    const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(
        new Set()
    );
    const [sortBy, setSortBy] = useState<'subject' | 'grade' | 'trend'>(
        'subject'
    );
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleExpandSubject = (classId: string) => {
        setExpandedSubjects(prev => {
            const newSet = new Set(prev);
            if (newSet.has(classId)) {
                newSet.delete(classId);
            } else {
                newSet.add(classId);
            }
            return newSet;
        });
    };

    const sortedSubjects = useMemo(() => {
        return [...mockSubjectGrades].sort((a, b) => {
            let compareValue = 0;
            switch (sortBy) {
                case 'subject':
                    compareValue = a.subject.localeCompare(b.subject);
                    break;
                case 'grade':
                    compareValue = a.currentPercentage - b.currentPercentage;
                    break;
                case 'trend':
                    compareValue = a.trendPercentage - b.trendPercentage;
                    break;
            }
            return sortOrder === 'asc' ? compareValue : -compareValue;
        });
    }, [sortBy, sortOrder]);

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return theme.palette.success.main;
        if (percentage >= 80) return theme.palette.warning.main;
        if (percentage >= 70)
            return theme.palette.orange?.main || theme.palette.warning.main;
        return theme.palette.error.main;
    };

    const getTrendIcon = (trend: 'up' | 'down' | 'stable', change: number) => {
        if (trend === 'up') {
            return (
                <TrendingUpIcon
                    sx={{ color: theme.palette.success.main, fontSize: 16 }}
                />
            );
        } else if (trend === 'down') {
            return (
                <TrendingDownIcon
                    sx={{ color: theme.palette.error.main, fontSize: 16 }}
                />
            );
        }
        return null;
    };

    const calculateOverallStats = () => {
        const totalPoints = sortedSubjects.reduce(
            (sum, subject) => sum + subject.currentPercentage,
            0
        );
        const averageGPA =
            sortedSubjects.reduce(
                (sum, subject) => sum + subject.currentGPA,
                0
            ) / sortedSubjects.length;
        const totalAssignments = sortedSubjects.reduce(
            (sum, subject) => sum + subject.assignments.total,
            0
        );
        const completedAssignments = sortedSubjects.reduce(
            (sum, subject) => sum + subject.assignments.completed,
            0
        );
        const missingAssignments = sortedSubjects.reduce(
            (sum, subject) => sum + subject.assignments.missing,
            0
        );

        return {
            overallAverage: totalPoints / sortedSubjects.length,
            overallGPA: averageGPA,
            completionRate: (completedAssignments / totalAssignments) * 100,
            totalMissing: missingAssignments,
        };
    };

    const overallStats = calculateOverallStats();

    if (!selectedStudent) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <SchoolIcon
                            sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
                        />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to view grades
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
                    Academic Grades
                </Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Grading Period</InputLabel>
                    <Select
                        value={selectedPeriod}
                        onChange={e => setSelectedPeriod(e.target.value)}
                        label="Grading Period"
                    >
                        {mockGradingPeriods.map(period => (
                            <MenuItem key={period.id} value={period.id}>
                                {period.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Overall Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <SchoolIcon
                                    sx={{ color: 'primary.main', mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Overall GPA
                                </Typography>
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,
                                    color: getGradeColor(
                                        overallStats.overallAverage
                                    ),
                                }}
                            >
                                {overallStats.overallGPA.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <CheckIcon
                                    sx={{ color: 'success.main', mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Average Grade
                                </Typography>
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,
                                    color: getGradeColor(
                                        overallStats.overallAverage
                                    ),
                                }}
                            >
                                {overallStats.overallAverage.toFixed(1)}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                                    Completion Rate
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                {overallStats.completionRate.toFixed(1)}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={overallStats.completionRate}
                                sx={{ mt: 1 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <WarningIcon
                                    sx={{
                                        color:
                                            overallStats.totalMissing > 0
                                                ? 'error.main'
                                                : 'success.main',
                                        mr: 1,
                                    }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Missing Assignments
                                </Typography>
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,
                                    color:
                                        overallStats.totalMissing > 0
                                            ? 'error.main'
                                            : 'success.main',
                                }}
                            >
                                {overallStats.totalMissing}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Grades Table */}
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Subject Grades
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                                label={`${sortedSubjects.length} Subjects`}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <TableContainer component={Paper} variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox" />
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === 'subject'}
                                            direction={
                                                sortBy === 'subject'
                                                    ? sortOrder
                                                    : 'asc'
                                            }
                                            onClick={() => {
                                                if (sortBy === 'subject') {
                                                    setSortOrder(
                                                        sortOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    );
                                                } else {
                                                    setSortBy('subject');
                                                    setSortOrder('asc');
                                                }
                                            }}
                                        >
                                            Subject
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Teacher</TableCell>
                                    <TableCell align="center">
                                        <TableSortLabel
                                            active={sortBy === 'grade'}
                                            direction={
                                                sortBy === 'grade'
                                                    ? sortOrder
                                                    : 'asc'
                                            }
                                            onClick={() => {
                                                if (sortBy === 'grade') {
                                                    setSortOrder(
                                                        sortOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    );
                                                } else {
                                                    setSortBy('grade');
                                                    setSortOrder('desc');
                                                }
                                            }}
                                        >
                                            Current Grade
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TableSortLabel
                                            active={sortBy === 'trend'}
                                            direction={
                                                sortBy === 'trend'
                                                    ? sortOrder
                                                    : 'asc'
                                            }
                                            onClick={() => {
                                                if (sortBy === 'trend') {
                                                    setSortOrder(
                                                        sortOrder === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    );
                                                } else {
                                                    setSortBy('trend');
                                                    setSortOrder('desc');
                                                }
                                            }}
                                        >
                                            Trend
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="center">
                                        Assignments
                                    </TableCell>
                                    <TableCell align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedSubjects.map(subject => (
                                    <React.Fragment key={subject.classId}>
                                        <TableRow
                                            hover
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.04
                                                    ),
                                                },
                                            }}
                                        >
                                            <TableCell padding="checkbox">
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        handleExpandSubject(
                                                            subject.classId
                                                        )
                                                    }
                                                >
                                                    {expandedSubjects.has(
                                                        subject.classId
                                                    ) ? (
                                                        <ExpandLessIcon />
                                                    ) : (
                                                        <ExpandMoreIcon />
                                                    )}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {subject.subject}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                            backgroundColor:
                                                                'primary.main',
                                                        }}
                                                    >
                                                        {subject.teacher
                                                            .split(' ')
                                                            .map(name =>
                                                                name.charAt(0)
                                                            )
                                                            .join('')}
                                                    </Avatar>
                                                    <Typography variant="body2">
                                                        {subject.teacher}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Chip
                                                        label={
                                                            subject.currentGrade
                                                        }
                                                        sx={{
                                                            backgroundColor:
                                                                getGradeColor(
                                                                    subject.currentPercentage
                                                                ),
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            minWidth: 60,
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {subject.currentPercentage.toFixed(
                                                            1
                                                        )}
                                                        %
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {getTrendIcon(
                                                        subject.trend,
                                                        subject.trendPercentage
                                                    )}
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color:
                                                                subject.trend ===
                                                                'up'
                                                                    ? 'success.main'
                                                                    : subject.trend ===
                                                                        'down'
                                                                      ? 'error.main'
                                                                      : 'text.secondary',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {subject.trend === 'up'
                                                            ? '+'
                                                            : ''}
                                                        {subject.trendPercentage.toFixed(
                                                            1
                                                        )}
                                                        %
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {
                                                            subject.assignments
                                                                .completed
                                                        }
                                                        /
                                                        {
                                                            subject.assignments
                                                                .total
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {(
                                                            (subject.assignments
                                                                .completed /
                                                                subject
                                                                    .assignments
                                                                    .total) *
                                                            100
                                                        ).toFixed(0)}
                                                        % complete
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {subject.assignments
                                                        .missing > 0 && (
                                                        <Chip
                                                            label={`${subject.assignments.missing} Missing`}
                                                            size="small"
                                                            color="error"
                                                            sx={{
                                                                fontSize:
                                                                    '0.6875rem',
                                                            }}
                                                        />
                                                    )}
                                                    {subject.assignments.late >
                                                        0 && (
                                                        <Chip
                                                            label={`${subject.assignments.late} Late`}
                                                            size="small"
                                                            color="warning"
                                                            sx={{
                                                                fontSize:
                                                                    '0.6875rem',
                                                            }}
                                                        />
                                                    )}
                                                    {subject.assignments
                                                        .missing === 0 &&
                                                        subject.assignments
                                                            .late === 0 && (
                                                            <Chip
                                                                label="Up to Date"
                                                                size="small"
                                                                color="success"
                                                                sx={{
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                }}
                                                            />
                                                        )}
                                                </Box>
                                            </TableCell>
                                        </TableRow>

                                        {/* Expanded Row - Category Breakdown */}
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                sx={{ p: 0, border: 'none' }}
                                            >
                                                <Collapse
                                                    in={expandedSubjects.has(
                                                        subject.classId
                                                    )}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <Box
                                                        sx={{
                                                            p: 3,
                                                            backgroundColor:
                                                                alpha(
                                                                    theme
                                                                        .palette
                                                                        .primary
                                                                        .main,
                                                                    0.02
                                                                ),
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontWeight: 600,
                                                                mb: 2,
                                                            }}
                                                        >
                                                            Grade Breakdown -{' '}
                                                            {subject.subject}
                                                        </Typography>
                                                        <Grid
                                                            container
                                                            spacing={2}
                                                        >
                                                            {subject.categoryBreakdown.map(
                                                                category => (
                                                                    <Grid
                                                                        size={{
                                                                            xs: 12,
                                                                            sm: 6,
                                                                            md: 3,
                                                                        }}
                                                                        key={
                                                                            category.category
                                                                        }
                                                                    >
                                                                        <Paper
                                                                            sx={{
                                                                                p: 2,
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                variant="subtitle2"
                                                                                sx={{
                                                                                    fontWeight: 600,
                                                                                    mb: 1,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    category.category
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="h6"
                                                                                sx={{
                                                                                    color: getGradeColor(
                                                                                        category.currentGrade
                                                                                    ),
                                                                                    fontWeight: 600,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    category.letterGrade
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="body2"
                                                                                color="text.secondary"
                                                                            >
                                                                                {category.currentGrade.toFixed(
                                                                                    1
                                                                                )}

                                                                                %
                                                                                •{' '}
                                                                                {
                                                                                    category.weight
                                                                                }

                                                                                %
                                                                                weight
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="caption"
                                                                                color="text.secondary"
                                                                            >
                                                                                {
                                                                                    category.pointsEarned
                                                                                }

                                                                                /
                                                                                {
                                                                                    category.pointsPossible
                                                                                }{' '}
                                                                                pts
                                                                                (
                                                                                {
                                                                                    category.assignmentCount
                                                                                }{' '}
                                                                                assignments)
                                                                            </Typography>
                                                                            <LinearProgress
                                                                                variant="determinate"
                                                                                value={
                                                                                    category.currentGrade
                                                                                }
                                                                                sx={{
                                                                                    mt: 1,
                                                                                    '& .MuiLinearProgress-bar':
                                                                                        {
                                                                                            backgroundColor:
                                                                                                getGradeColor(
                                                                                                    category.currentGrade
                                                                                                ),
                                                                                        },
                                                                                }}
                                                                            />
                                                                        </Paper>
                                                                    </Grid>
                                                                )
                                                            )}
                                                        </Grid>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};
