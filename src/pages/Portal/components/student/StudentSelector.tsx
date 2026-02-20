import { CheckCircle } from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Box,
    Grid,
    Stack,
    Typography,
    useTheme,
    type Theme,
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'; // v2
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Student } from '../../../../types/student.types';

// --- PROPS & DATA TYPES ---

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
    alertCount: number;
}

// --- MOCK DATA ---

const mockQuickStats: StudentQuickStats[] = [
    {
        studentId: 'student1',
        currentGPA: 3.7,
        attendanceRate: 95,
        upcomingAssignments: 3,
        alertCount: 1,
    },
    {
        studentId: 'student2',
        currentGPA: 3.9,
        attendanceRate: 98,
        upcomingAssignments: 2,
        alertCount: 0,
    },
];

// --- HELPER FUNCTIONS ---

const getStudentStats = (studentId: string): StudentQuickStats | undefined => {
    return mockQuickStats.find(stats => stats.studentId === studentId);
};

const getGradeColor = (gpa: number, theme: Theme): string => {
    if (gpa >= 3.5) return theme.palette.success.main;
    if (gpa >= 2.5) return theme.palette.warning.main;
    return theme.palette.error.main;
};

// --- SUB-COMPONENTS ---

const StudentInfo: React.FC<{
    student: Student;
    isSelected: boolean;
}> = ({ student, isSelected }) => {
    const { t } = useTranslation('student');
    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
                src={student.avatar}
                sx={{
                    width: 36,
                    height: 36,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    bgcolor: isSelected ? 'primary.main' : 'background.default',
                    color: isSelected ? 'white' : 'text.primary',
                    border: 1,
                    borderColor: isSelected ? 'primary.dark' : 'divider',
                }}
            >
                {student.firstName.charAt(0)}
                {student.lastName.charAt(0)}
            </Avatar>
            <Stack alignItems="flex-start">
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? 'primary.main' : 'text.primary',
                        lineHeight: 1.3,
                        fontSize: '0.875rem',
                    }}
                >
                    {student.fullName}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.2,
                        fontSize: '0.75rem',
                    }}
                >
                    {t('studentInfo.grade')} {student.grade}
                </Typography>
            </Stack>
        </Stack>
    );
};
const StatItem: React.FC<{
    value: string | number;
    label: string;
    color?: string;
}> = ({ value, label, color = 'text.primary' }) => {
    return (
        <Box textAlign="center">
            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: 600,
                    color,
                    lineHeight: 1.2,
                    fontSize: '0.8125rem',
                }}
            >
                {value}
            </Typography>
            <Typography
                variant="caption"
                sx={{ fontSize: '0.625rem', color: 'text.secondary' }}
            >
                {label}
            </Typography>
        </Box>
    );
};

const StudentStats: React.FC<{
    stats: StudentQuickStats;
    theme: Theme;
}> = ({ stats, theme }) => {
    const { t } = useTranslation('student');
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            sx={{
                width: '100%',
                pt: 1,
                mt: 1,
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <StatItem
                value={stats.currentGPA.toFixed(1)}
                label={t('statItem.gpa')}
                color={getGradeColor(stats.currentGPA, theme)}
            />
            <StatItem
                value={`${stats.attendanceRate}%`}
                label={t('statItem.attendance')}
                color={
                    stats.attendanceRate > 90 ? 'success.dark' : 'warning.dark'
                }
            />
            {stats.alertCount > 0 && (
                <StatItem
                    value={stats.alertCount}
                    label={t('statItem.alerts')}
                    color="error.dark"
                />
            )}
        </Stack>
    );
};

const StudentCard: React.FC<{
    student: Student;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ student, isSelected, onSelect }) => {
    const stats = getStudentStats(student.id);
    const theme = useTheme();

    return (
        <Box
            onClick={onSelect}
            sx={{
                p: 1.5,
                borderRadius: 1, // Small border radius
                border: 1,
                borderColor: isSelected ? 'primary.main' : 'divider',
                backgroundColor: isSelected
                    ? alpha(theme.palette.primary.main, 0.05)
                    : 'background.paper',
                cursor: 'pointer',
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: theme.transitions.create([
                    'border-color',
                    'background-color',
                ]),
                '&:hover': {
                    borderColor: isSelected
                        ? 'primary.main'
                        : alpha(theme.palette.primary.main, 0.5),
                    backgroundColor: isSelected
                        ? alpha(theme.palette.primary.main, 0.05)
                        : alpha(theme.palette.grey[500], 0.05),
                },
            }}
        >
            {isSelected && (
                <CheckCircle
                    sx={{
                        fontSize: 16,
                        color: 'primary.main',
                        position: 'absolute',
                        top: 6,
                        right: 6,
                    }}
                />
            )}
            <StudentInfo student={student} isSelected={isSelected} />
            {stats && <StudentStats stats={stats} theme={theme} />}
        </Box>
    );
};

// --- MAIN COMPONENT ---

export const StudentSelector: React.FC<StudentSelectorProps> = ({
    students,
    selectedStudent,
    onStudentChange,
    className = '',
}) => {
    const { t } = useTranslation('student');
    if (!students.length) {
        return (
            <Box
                className={className}
                sx={{
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.875rem' }}
                >
                    {t('messages.noRecordsFound')}
                </Typography>
            </Box>
        );
    }

    return (
        <Box className={className} sx={{ width: '100%' }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5, px: 0.5 }}
            >
                <Typography
                    variant="overline"
                    sx={{
                        fontWeight: 600,
                        color: 'text.secondary',
                        fontSize: '0.625rem',
                    }}
                >
                    {t('noStudent.selectStudent')}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
                >
                    {t('studentSelector.students', { count: students.length })}
                </Typography>
            </Stack>

            <Grid container spacing={1.5}>
                {students.map(student => (
                    <Grid
                        key={student.id}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3,
                        }}
                    >
                        <StudentCard
                            student={student}
                            isSelected={selectedStudent?.id === student.id}
                            onSelect={() => onStudentChange(student)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
