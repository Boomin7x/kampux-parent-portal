import {
    Assignment as AssignmentIcon,
    CheckCircle as CompletedIcon,
    FilterList as FilterIcon,
    Science as LabIcon,
    Warning as MissingIcon,
    Schedule as PendingIcon,
    Slideshow as PresentationIcon,
    Quiz as QuizIcon,
    Search as SearchIcon,
    School as TestIcon,
    AccessTime as UpcomingIcon,
} from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import type {
    AssignmentStatus,
    AssignmentType,
    StudentAssignment,
} from '../../../../types/academic.types';
import type { Student } from '../../../../types/student.types';

interface AssignmentListProps {
    selectedStudent: Student | null;
    className?: string;
}

interface AssignmentFilter {
    search: string;
    subject: string;
    type: AssignmentType | 'all';
    status: AssignmentStatus | 'all';
    dateRange: 'all' | 'week' | 'month' | 'quarter';
}

// Mock assignment data
const mockAssignments: StudentAssignment[] = [
    {
        assignment: {
            id: 'assign1',
            classId: 'class1',
            title: 'Chapter 8 Test: Quadratic Equations',
            description:
                'Comprehensive test covering quadratic equations, factoring, and graphing',
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
        status: 'assigned',
        isOverdue: false,
    },
    {
        assignment: {
            id: 'assign2',
            classId: 'class2',
            title: 'Lab Report #4: Photosynthesis',
            description:
                'Analysis of photosynthesis experiment data and conclusions',
            type: 'lab',
            category: 'projects',
            pointsPossible: 75,
            dueDate: '2024-01-20T23:59:00Z',
            assignedDate: '2024-01-13T09:00:00Z',
            submissionType: ['online', 'file_upload'],
            isExtraCredit: false,
            allowLateSubmissions: true,
            latePenalty: 10,
            status: 'assigned',
        },
        status: 'assigned',
        isOverdue: false,
    },
    {
        assignment: {
            id: 'assign3',
            classId: 'class1',
            title: 'Homework Set 7.3',
            description: 'Practice problems on solving quadratic equations',
            type: 'homework',
            category: 'homework',
            pointsPossible: 25,
            dueDate: '2024-01-19T08:00:00Z',
            assignedDate: '2024-01-17T09:00:00Z',
            submissionType: ['paper'],
            isExtraCredit: false,
            allowLateSubmissions: true,
            latePenalty: 5,
            status: 'submitted',
        },
        status: 'submitted',
        isOverdue: false,
        grade: {
            id: 'grade3',
            studentId: 'student1',
            classId: 'class1',
            assignmentId: 'assign3',
            grade: 'A',
            numericGrade: 95,
            pointsEarned: 23.75,
            pointsPossible: 25,
            percentage: 95,
            letterGrade: 'A',
            gpValue: 4.0,
            dateGraded: '2024-01-19T14:30:00Z',
            gradedBy: 'teacher1',
            isExcused: false,
            isLate: false,
            parentViewed: false,
        },
    },
    {
        assignment: {
            id: 'assign4',
            classId: 'class3',
            title: 'Essay: Character Analysis',
            description:
                'Analyze the development of a main character in the assigned novel',
            type: 'essay',
            category: 'projects',
            pointsPossible: 100,
            dueDate: '2024-01-16T23:59:00Z',
            assignedDate: '2024-01-09T09:00:00Z',
            submissionType: ['online', 'text_entry'],
            isExtraCredit: false,
            allowLateSubmissions: false,
            status: 'graded',
        },
        status: 'graded',
        isOverdue: false,
        grade: {
            id: 'grade4',
            studentId: 'student1',
            classId: 'class3',
            assignmentId: 'assign4',
            grade: 'A',
            numericGrade: 95,
            pointsEarned: 95,
            pointsPossible: 100,
            percentage: 95,
            letterGrade: 'A',
            gpValue: 4.0,
            dateGraded: '2024-01-17T11:20:00Z',
            gradedBy: 'teacher3',
            isExcused: false,
            isLate: false,
            parentViewed: false,
            teacherComments: 'Excellent analysis with strong textual evidence.',
        },
    },
    {
        assignment: {
            id: 'assign5',
            classId: 'class1',
            title: 'Math Quiz 7.1',
            description: 'Quick assessment on basic quadratic concepts',
            type: 'quiz',
            category: 'assessments',
            pointsPossible: 20,
            dueDate: '2024-01-15T09:00:00Z',
            assignedDate: '2024-01-14T09:00:00Z',
            submissionType: ['paper'],
            isExtraCredit: false,
            allowLateSubmissions: false,
            status: 'missing',
        },
        status: 'missing',
        isOverdue: true,
        daysPastDue: 4,
    },
];

const subjectMap: {
    [key: string]: { name: string; teacher: string; color: string };
} = {
    class1: {
        name: 'Advanced Mathematics',
        teacher: 'Ms. Rodriguez',
        color: '#6366f1',
    },
    class2: { name: 'AP Biology', teacher: 'Mr. Thompson', color: '#10b981' },
    class3: {
        name: 'English Literature',
        teacher: 'Ms. Davis',
        color: '#8b5cf6',
    },
    class4: { name: 'World History', teacher: 'Mr. Wilson', color: '#f59e0b' },
};

export const AssignmentList: React.FC<AssignmentListProps> = ({
    selectedStudent,
    className = '',
}) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [filters, setFilters] = useState<AssignmentFilter>({
        search: '',
        subject: 'all',
        type: 'all',
        status: 'all',
        dateRange: 'all',
    });

    const getAssignmentIcon = (type: AssignmentType) => {
        switch (type) {
            case 'test':
                return <TestIcon />;
            case 'quiz':
                return <QuizIcon />;
            case 'lab':
                return <LabIcon />;
            case 'presentation':
                return <PresentationIcon />;
            default:
                return <AssignmentIcon />;
        }
    };

    const getStatusIcon = (status: AssignmentStatus) => {
        switch (status) {
            case 'graded':
            case 'submitted':
                return <CompletedIcon sx={{ color: 'success.main' }} />;
            case 'missing':
                return <MissingIcon sx={{ color: 'error.main' }} />;
            case 'assigned':
                return <PendingIcon sx={{ color: 'warning.main' }} />;
            default:
                return <UpcomingIcon sx={{ color: 'info.main' }} />;
        }
    };

    const getStatusColor = (status: AssignmentStatus, isOverdue: boolean) => {
        if (status === 'missing' || isOverdue) return 'error';
        if (status === 'graded' || status === 'submitted') return 'success';
        if (status === 'assigned') return 'warning';
        return 'info';
    };

    const getDaysUntilDue = (dueDate: string) => {
        const due = new Date(dueDate);
        const now = new Date();
        const diffInDays = Math.ceil(
            (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        return diffInDays;
    };

    const formatDueDate = (dueDate: string) => {
        const date = new Date(dueDate);
        const daysUntil = getDaysUntilDue(dueDate);

        if (daysUntil === 0) return 'Due today';
        if (daysUntil === 1) return 'Due tomorrow';
        if (daysUntil > 0 && daysUntil <= 7) return `Due in ${daysUntil} days`;
        if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
        return date.toLocaleDateString();
    };

    const filteredAssignments = useMemo(() => {
        let filtered = mockAssignments;

        // Filter by tab
        switch (activeTab) {
            case 0: // All
                break;
            case 1: // Upcoming
                filtered = filtered.filter(
                    a => a.status === 'assigned' && !a.isOverdue
                );
                break;
            case 2: // Missing
                filtered = filtered.filter(
                    a => a.status === 'missing' || a.isOverdue
                );
                break;
            case 3: // Completed
                filtered = filtered.filter(
                    a => a.status === 'submitted' || a.status === 'graded'
                );
                break;
        }

        // Apply search filter
        if (filters.search) {
            filtered = filtered.filter(
                a =>
                    a.assignment.title
                        .toLowerCase()
                        .includes(filters.search.toLowerCase()) ||
                    a.assignment.description
                        ?.toLowerCase()
                        .includes(filters.search.toLowerCase())
            );
        }

        // Apply subject filter
        if (filters.subject !== 'all') {
            filtered = filtered.filter(
                a => a.assignment.classId === filters.subject
            );
        }

        // Apply type filter
        if (filters.type !== 'all') {
            filtered = filtered.filter(a => a.assignment.type === filters.type);
        }

        // Apply status filter
        if (filters.status !== 'all') {
            filtered = filtered.filter(a => a.status === filters.status);
        }

        return filtered;
    }, [activeTab, filters, mockAssignments]);

    const getTabCounts = () => {
        const upcoming = mockAssignments.filter(
            a => a.status === 'assigned' && !a.isOverdue
        ).length;
        const missing = mockAssignments.filter(
            a => a.status === 'missing' || a.isOverdue
        ).length;
        const completed = mockAssignments.filter(
            a => a.status === 'submitted' || a.status === 'graded'
        ).length;

        return { upcoming, missing, completed };
    };

    const tabCounts = getTabCounts();

    if (!selectedStudent) {
        return (
            <Card className={className}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <AssignmentIcon
                            sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
                        />
                        <Typography variant="h6" color="text.secondary">
                            Select a student to view assignments
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box className={className}>
            {/* Header */}
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Assignments & Tasks
            </Typography>

            {/* Assignment Tabs */}
            <Card sx={{ mb: 3 }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
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
                                All Assignments
                                <Chip
                                    label={mockAssignments.length}
                                    size="small"
                                    sx={{ fontSize: '0.6875rem' }}
                                />
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
                                Upcoming
                                <Chip
                                    label={tabCounts.upcoming}
                                    size="small"
                                    color="warning"
                                    sx={{ fontSize: '0.6875rem' }}
                                />
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
                                Missing
                                <Chip
                                    label={tabCounts.missing}
                                    size="small"
                                    color="error"
                                    sx={{ fontSize: '0.6875rem' }}
                                />
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
                                Completed
                                <Chip
                                    label={tabCounts.completed}
                                    size="small"
                                    color="success"
                                    sx={{ fontSize: '0.6875rem' }}
                                />
                            </Box>
                        }
                    />
                </Tabs>

                {/* Filters */}
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            size="small"
                            placeholder="Search assignments..."
                            value={filters.search}
                            onChange={e =>
                                setFilters(prev => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ minWidth: 250 }}
                        />

                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Subject</InputLabel>
                            <Select
                                value={filters.subject}
                                onChange={e =>
                                    setFilters(prev => ({
                                        ...prev,
                                        subject: e.target.value,
                                    }))
                                }
                                label="Subject"
                            >
                                <MenuItem value="all">All Subjects</MenuItem>
                                {Object.entries(subjectMap).map(
                                    ([id, subject]) => (
                                        <MenuItem key={id} value={id}>
                                            {subject.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={filters.type}
                                onChange={e =>
                                    setFilters(prev => ({
                                        ...prev,
                                        type: e.target.value as AssignmentType,
                                    }))
                                }
                                label="Type"
                            >
                                <MenuItem value="all">All Types</MenuItem>
                                <MenuItem value="homework">Homework</MenuItem>
                                <MenuItem value="quiz">Quiz</MenuItem>
                                <MenuItem value="test">Test</MenuItem>
                                <MenuItem value="project">Project</MenuItem>
                                <MenuItem value="essay">Essay</MenuItem>
                                <MenuItem value="lab">Lab</MenuItem>
                                <MenuItem value="presentation">
                                    Presentation
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            variant="outlined"
                            startIcon={<FilterIcon />}
                            sx={{ textTransform: 'none' }}
                        >
                            More Filters
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Assignments Table */}
            <Card>
                <CardContent>
                    <TableContainer component={Paper} variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Assignment</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Due Date</TableCell>
                                    <TableCell align="center">Points</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAssignments.map(studentAssignment => {
                                    const { assignment } = studentAssignment;
                                    const subject =
                                        subjectMap[assignment.classId];
                                    const daysUntilDue = getDaysUntilDue(
                                        assignment.dueDate
                                    );
                                    const isDueSoon =
                                        daysUntilDue <= 3 && daysUntilDue >= 0;

                                    return (
                                        <TableRow
                                            key={assignment.id}
                                            sx={{
                                                backgroundColor:
                                                    studentAssignment.isOverdue
                                                        ? alpha(
                                                              theme.palette
                                                                  .error.main,
                                                              0.05
                                                          )
                                                        : isDueSoon
                                                          ? alpha(
                                                                theme.palette
                                                                    .warning
                                                                    .main,
                                                                0.05
                                                            )
                                                          : 'inherit',
                                                '&:hover': {
                                                    backgroundColor: alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.04
                                                    ),
                                                },
                                            }}
                                        >
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems:
                                                            'flex-start',
                                                        gap: 1.5,
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                            backgroundColor:
                                                                subject?.color ||
                                                                'primary.main',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {getAssignmentIcon(
                                                            assignment.type
                                                        )}
                                                    </Avatar>
                                                    <Box sx={{ minWidth: 0 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: studentAssignment.isOverdue
                                                                    ? 'error.main'
                                                                    : 'text.primary',
                                                            }}
                                                        >
                                                            {assignment.title}
                                                        </Typography>
                                                        {assignment.description && (
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                sx={{
                                                                    overflow:
                                                                        'hidden',
                                                                    textOverflow:
                                                                        'ellipsis',
                                                                    display:
                                                                        '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient:
                                                                        'vertical',
                                                                }}
                                                            >
                                                                {
                                                                    assignment.description
                                                                }
                                                            </Typography>
                                                        )}
                                                        {assignment.isExtraCredit && (
                                                            <Chip
                                                                label="Extra Credit"
                                                                size="small"
                                                                color="info"
                                                                sx={{
                                                                    mt: 0.5,
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {subject?.name ||
                                                            'Unknown'}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {subject?.teacher ||
                                                            'Unknown Teacher'}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        assignment.type
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        assignment.type.slice(1)
                                                    }
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: studentAssignment.isOverdue
                                                                ? 'error.main'
                                                                : isDueSoon
                                                                  ? 'warning.main'
                                                                  : 'text.primary',
                                                        }}
                                                    >
                                                        {formatDueDate(
                                                            assignment.dueDate
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {new Date(
                                                            assignment.dueDate
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {studentAssignment.grade
                                                        ? `${studentAssignment.grade.pointsEarned}/${assignment.pointsPossible}`
                                                        : assignment.pointsPossible}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    {getStatusIcon(
                                                        studentAssignment.status
                                                    )}
                                                    <Chip
                                                        label={studentAssignment.status
                                                            .replace('_', ' ')
                                                            .toUpperCase()}
                                                        size="small"
                                                        color={getStatusColor(
                                                            studentAssignment.status,
                                                            studentAssignment.isOverdue
                                                        )}
                                                        sx={{
                                                            fontSize:
                                                                '0.6875rem',
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                {studentAssignment.grade ? (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color:
                                                                    studentAssignment
                                                                        .grade
                                                                        .percentage >=
                                                                    90
                                                                        ? 'success.main'
                                                                        : studentAssignment
                                                                                .grade
                                                                                .percentage >=
                                                                            80
                                                                          ? 'warning.main'
                                                                          : 'error.main',
                                                            }}
                                                        >
                                                            {
                                                                studentAssignment
                                                                    .grade
                                                                    .letterGrade
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {studentAssignment.grade.percentage.toFixed(
                                                                1
                                                            )}
                                                            %
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        —
                                                    </Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        {filteredAssignments.length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <AssignmentIcon
                                    sx={{
                                        fontSize: 48,
                                        color: 'text.disabled',
                                        mb: 2,
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    No assignments found matching your filters
                                </Typography>
                            </Box>
                        )}
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};
