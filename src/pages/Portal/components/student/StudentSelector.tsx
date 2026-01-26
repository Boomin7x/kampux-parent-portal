import React, { useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Chip,
    useTheme,
    alpha,
    IconButton,
} from '@mui/material';
import {
    ExpandMore as ExpandIcon,
    SwapHoriz as SwitchIcon,
} from '@mui/icons-material';
import type { Student } from '../../../../types/student.types';

interface StudentSelectorProps {
    students: Student[];
    selectedStudent: Student | null;
    onStudentChange: (student: Student) => void;
    className?: string;
}

interface StudentQuickStats {
    studentId: string;
    currentGPA: number;
    attendanceRate: number;
    upcomingAssignments: number;
    unreadMessages: number;
    lastGradeUpdate: string;
    alertCount: number;
}

// Mock quick stats data
const mockQuickStats: StudentQuickStats[] = [
    {
        studentId: 'student1',
        currentGPA: 3.7,
        attendanceRate: 95,
        upcomingAssignments: 3,
        unreadMessages: 1,
        lastGradeUpdate: '2024-01-18T10:30:00Z',
        alertCount: 1,
    },
    {
        studentId: 'student2',
        currentGPA: 3.9,
        attendanceRate: 98,
        upcomingAssignments: 2,
        unreadMessages: 0,
        lastGradeUpdate: '2024-01-17T14:20:00Z',
        alertCount: 0,
    },
];

export const StudentSelector: React.FC<StudentSelectorProps> = ({
    students,
    selectedStudent,
    onStudentChange,
    className = '',
}) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStudentSelect = (student: Student) => {
        onStudentChange(student);
        handleMenuClose();
    };

    const getStudentStats = (studentId: string): StudentQuickStats | undefined => {
        return mockQuickStats.find(stats => stats.studentId === studentId);
    };

    const getGradeColor = (gpa: number) => {
        if (gpa >= 3.5) return theme.palette.success.main;
        if (gpa >= 2.5) return theme.palette.warning.main;
        return theme.palette.error.main;
    };

    const getAttendanceColor = (rate: number) => {
        if (rate >= 95) return theme.palette.success.main;
        if (rate >= 90) return theme.palette.warning.main;
        return theme.palette.error.main;
    };

    if (!students.length) {
        return (
            <Card className={className}>
                <CardContent>
                    <Typography color="text.secondary">
                        No students found
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    // If only one student, show compact view
    if (students.length === 1) {
        const student = students[0];
        const stats = getStudentStats(student.id);

        return (
            <Box
                className={className}
                sx={{
                    p: 1.5,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: 1,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                        src={student.avatar}
                        sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: 'primary.main',
                        }}
                    >
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                            {student.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Grade {student.grade} • {student.homeroomTeacher.name}
                        </Typography>
                    </Box>
                    {stats && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: getGradeColor(stats.currentGPA) }}>
                                {stats.currentGPA.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: getAttendanceColor(stats.attendanceRate) }}>
                                {stats.attendanceRate}%
                            </Typography>
                            {stats.alertCount > 0 && (
                                <Chip
                                    label={stats.alertCount}
                                    color="error"
                                    size="small"
                                    sx={{ height: 18, fontSize: '0.6875rem' }}
                                />
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        );
    }

    // Multiple students view - compact header with quick switch
    return (
        <Box className={className}>
            {/* Compact Selected Student Display */}
            {selectedStudent && (
                <Box
                    sx={{
                        mb: 2,
                        p: 1.5,
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        border: 1,
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                            src={selectedStudent.avatar}
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: 'primary.main',
                            }}
                        >
                            {selectedStudent.firstName.charAt(0)}{selectedStudent.lastName.charAt(0)}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                {selectedStudent.fullName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Grade {selectedStudent.grade} • {selectedStudent.homeroomTeacher.name}
                            </Typography>
                        </Box>

                        {/* Inline Quick Stats */}
                        {(() => {
                            const stats = getStudentStats(selectedStudent.id);
                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    {stats && (
                                        <>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="caption" sx={{ fontWeight: 600, color: getGradeColor(stats.currentGPA), display: 'block' }}>
                                                    {stats.currentGPA.toFixed(1)}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem' }}>
                                                    GPA
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="caption" sx={{ fontWeight: 600, color: getAttendanceColor(stats.attendanceRate), display: 'block' }}>
                                                    {stats.attendanceRate}%
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem' }}>
                                                    Attend
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                                                    {stats.upcomingAssignments}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem' }}>
                                                    Due
                                                </Typography>
                                            </Box>
                                            {stats.alertCount > 0 && (
                                                <Chip
                                                    label={stats.alertCount}
                                                    color="error"
                                                    size="small"
                                                    sx={{ height: 18, fontSize: '0.6875rem' }}
                                                />
                                            )}
                                        </>
                                    )}
                                    <IconButton
                                        size="small"
                                        onClick={handleMenuOpen}
                                        sx={{
                                            ml: 'auto',
                                            p: 0.5,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                            },
                                        }}
                                    >
                                        <SwitchIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </Box>
                            );
                        })()}
                    </Box>
                </Box>
            )}

            {/* Quick Student List - Only show when multiple students */}
            {students.length > 1 && (
                <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
                        Quick Switch ({students.length} students)
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {students
                            .filter(student => student.id !== selectedStudent?.id)
                            .slice(0, 3)
                            .map((student) => {
                                const stats = getStudentStats(student.id);
                                return (
                                    <Box
                                        key={student.id}
                                        onClick={() => onStudentChange(student)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            p: 1,
                                            backgroundColor: 'background.paper',
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: 'grey.200',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={student.avatar}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor: 'primary.main',
                                                fontSize: '0.75rem',
                                            }}
                                        >
                                            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', lineHeight: 1.2 }}>
                                                {student.firstName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem' }}>
                                                Grade {student.grade}
                                            </Typography>
                                        </Box>
                                        {stats && stats.alertCount > 0 && (
                                            <Chip
                                                label={stats.alertCount}
                                                color="error"
                                                size="small"
                                                sx={{ height: 16, fontSize: '0.625rem', minWidth: 16 }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        {students.length > 4 && (
                            <Button
                                size="small"
                                onClick={handleMenuOpen}
                                sx={{
                                    minHeight: 32,
                                    fontSize: '0.75rem',
                                    textTransform: 'none',
                                }}
                            >
                                +{students.length - 4} more
                            </Button>
                        )}
                    </Box>
                </Box>
            )}

            {/* Compact Student Selection Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        minWidth: 280,
                        maxHeight: 320,
                    },
                }}
            >
                {students.map((student) => {
                    const stats = getStudentStats(student.id);
                    const isSelected = selectedStudent?.id === student.id;

                    return (
                        <MenuItem
                            key={student.id}
                            onClick={() => handleStudentSelect(student)}
                            selected={isSelected}
                            sx={{ py: 1, px: 1.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar
                                    src={student.avatar}
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor: 'primary.main',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {student.fullName}
                                        </Typography>
                                        {stats && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography variant="caption" sx={{ fontWeight: 600, color: getGradeColor(stats.currentGPA) }}>
                                                    {stats.currentGPA.toFixed(1)}
                                                </Typography>
                                                {stats.alertCount > 0 && (
                                                    <Chip
                                                        label={stats.alertCount}
                                                        color="error"
                                                        size="small"
                                                        sx={{
                                                            height: 16,
                                                            fontSize: '0.6875rem',
                                                            minWidth: 16,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="caption" color="text.secondary">
                                        Grade {student.grade} • {student.homeroomTeacher.name}
                                    </Typography>
                                }
                            />
                        </MenuItem>
                    );
                })}
            </Menu>
        </Box>
    );
};