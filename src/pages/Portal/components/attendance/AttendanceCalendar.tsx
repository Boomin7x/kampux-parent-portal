import {
    CalendarToday as CalendarIcon,
    CalendarMonth as CalendarViewIcon,
    Schedule as ScheduleIcon,
    TableView as TableViewIcon,
    Schedule as TimetableIcon,
    CheckCircle as PresentIcon,
    AccessTime as TardyIcon,
    Cancel as AbsentIcon,
    ExitToApp as EarlyDismissalIcon,
    TrendingUp as TrendIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import React, { useState, useMemo } from 'react';
import type { Student } from '../../../../types/student.types';
import { WeeklyTimetable } from './WeeklyTimetable';

// Types for attendance tracking
type AttendanceStatus = 'present' | 'absent' | 'late' | 'early_dismissal' | 'not_yet';

interface PeriodAttendance {
    subject: string;
    teacher: string;
    room: string;
    startTime: string;
    endTime: string;
    status: AttendanceStatus;
    notes?: string;
}

// TabPanel component
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
            id={`attendance-tabpanel-${index}`}
            aria-labelledby={`attendance-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

interface AttendanceCalendarProps {
    selectedStudent: Student | null;
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
    selectedStudent,
}) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodAttendance | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [periodDialogOpen, setPeriodDialogOpen] = useState(false);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Mock weekly attendance data
    const weeklyAttendanceData = useMemo(() => {
        const periods = [
            '08:00 - 08:45', '08:50 - 09:35', '09:40 - 10:25',
            '10:45 - 11:30', '11:35 - 12:20', '13:15 - 14:00', '14:05 - 14:50'
        ];

        const subjects = [
            { name: 'Mathematics', teacher: 'Ms. Johnson', room: 'Room 201' },
            { name: 'English', teacher: 'Mr. Davis', room: 'Room 105' },
            { name: 'Science', teacher: 'Dr. Wilson', room: 'Lab 3' },
            { name: 'Break', teacher: '', room: '' },
            { name: 'History', teacher: 'Ms. Brown', room: 'Room 302' },
            { name: 'Lunch', teacher: '', room: '' },
            { name: 'Art', teacher: 'Mr. Garcia', room: 'Art Studio' },
        ];

        const weekData: Record<string, PeriodAttendance[]> = {};
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        weekDays.forEach((day, dayIndex) => {
            weekData[day] = periods.map((period, periodIndex) => {
                const subject = subjects[periodIndex];
                const isBreakTime = subject.name === 'Break' || subject.name === 'Lunch';

                // Generate realistic attendance status
                let status: AttendanceStatus = 'present';
                const random = Math.random();

                if (!isBreakTime) {
                    if (dayIndex >= 3 && periodIndex >= 5) { // Future periods
                        status = 'not_yet';
                    } else if (random < 0.1) {
                        status = 'late';
                    } else if (random < 0.05) {
                        status = 'absent';
                    } else if (random < 0.02) {
                        status = 'early_dismissal';
                    }
                }

                return {
                    subject: subject.name,
                    teacher: subject.teacher,
                    room: subject.room,
                    startTime: period.split(' - ')[0],
                    endTime: period.split(' - ')[1],
                    status: isBreakTime ? 'present' : status,
                    notes: status === 'late' ? 'Arrived 10 minutes late' :
                           status === 'absent' ? 'Doctor appointment' : undefined,
                };
            });
        });

        return weekData;
    }, []);

    const getCurrentDayOfWeek = () => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        return today;
    };

    const getCurrentTime = () => {
        return new Date().getHours() * 60 + new Date().getMinutes();
    };

    const isPeriodDisabled = (day: string, periodIndex: number) => {
        const today = getCurrentDayOfWeek();
        const currentTime = getCurrentTime();
        const period = weeklyAttendanceData[day]?.[periodIndex];

        if (!period) return true;

        const [hours, minutes] = period.startTime.split(':').map(Number);
        const periodStartMinutes = hours * 60 + minutes;

        // If it's a future day, disable
        const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(day);
        const todayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(today);

        if (dayIndex > todayIndex) return true;

        // If it's today, disable future periods
        if (day === today && currentTime < periodStartMinutes) return true;

        return false;
    };

    const getStatusColor = (status: AttendanceStatus | string) => {
        switch (status) {
            case 'present':
                return '#10b981'; // Green
            case 'late':
                return '#f59e0b'; // Orange
            case 'absent':
                return '#ef4444'; // Red
            case 'early_dismissal':
                return '#8b5cf6'; // Purple
            case 'not_yet':
                return '#d1d5db'; // Gray
            default:
                return '#6b7280';
        }
    };

    const getStatusIcon = (status: AttendanceStatus | string, size: number = 14) => {
        switch (status) {
            case 'present':
                return <PresentIcon sx={{ fontSize: size, color: 'white' }} />;
            case 'late':
                return <TardyIcon sx={{ fontSize: size, color: 'white' }} />;
            case 'absent':
                return <AbsentIcon sx={{ fontSize: size, color: 'white' }} />;
            case 'early_dismissal':
                return <EarlyDismissalIcon sx={{ fontSize: size, color: 'white' }} />;
            default:
                return null;
        }
    };

    const getStatusLabel = (status: AttendanceStatus) => {
        switch (status) {
            case 'present':
                return 'Present';
            case 'late':
                return 'Late';
            case 'absent':
                return 'Absent';
            case 'early_dismissal':
                return 'Early Dismissal';
            case 'not_yet':
                return 'Not Yet';
            default:
                return 'Unknown';
        }
    };

    const handlePeriodClick = (period: PeriodAttendance) => {
        setSelectedPeriod(period);
        setPeriodDialogOpen(true);
    };

    // Monthly calendar data
    const generateMonthlyData = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Generate calendar days
        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add actual month days with attendance data
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isToday = date.toDateString() === new Date().toDateString();
            const isPastDay = date < new Date().setHours(0, 0, 0, 0);

            // Generate realistic attendance status for school days
            let status: 'present' | 'absent' | 'late' | 'early_dismissal' | 'no_school' | 'future' = 'future';

            if (isWeekend) {
                status = 'no_school';
            } else if (isPastDay) {
                const random = Math.random();
                if (random < 0.85) status = 'present';
                else if (random < 0.92) status = 'late';
                else if (random < 0.97) status = 'early_dismissal';
                else status = 'absent';
            }

            days.push({
                day,
                date,
                isWeekend,
                isToday,
                isPastDay,
                status,
                attendanceRate: status === 'present' ? 100 : status === 'late' || status === 'early_dismissal' ? 85 : 0
            });
        }

        return days;
    };

    const monthlyData = useMemo(generateMonthlyData, []);

    const currentDate = new Date();
    const monthName = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    const handleDayClick = (dayData: any) => {
        if (dayData && (dayData.isPastDay || dayData.isToday)) {
            setSelectedDay(dayData);
            setDialogOpen(true);
        }
    };


    if (!selectedStudent) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    color: 'text.secondary',
                }}
            >
                <Typography variant="body2">
                    Please select a student to view attendance
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: '1rem',
                        color: 'text.primary',
                    }}
                >
                    Attendance Overview
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
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 1 }}>
                        <Tab
                            icon={<CalendarViewIcon sx={{ fontSize: 16 }} />}
                            label="Monthly Calendar"
                            iconPosition="start"
                            sx={{
                                minHeight: 48,
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                            }}
                        />
                        <Tab
                            icon={<TimetableIcon sx={{ fontSize: 16 }} />}
                            label="Weekly Timetable"
                            iconPosition="start"
                            sx={{
                                minHeight: 48,
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                            }}
                        />
                        <Tab
                            icon={<TableViewIcon sx={{ fontSize: 16 }} />}
                            label="Period Attendance"
                            iconPosition="start"
                            sx={{
                                minHeight: 48,
                                fontSize: '0.8125rem',
                                textTransform: 'none',
                            }}
                        />
                    </Tabs>
                </Box>

                {/* Monthly Calendar Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Box sx={{ p: 2 }}>
                        {/* Monthly Stats */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1.5,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {monthName} Overview
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                    gap: 1.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: 'primary.50',
                                        border: '1px solid',
                                        borderColor: 'primary.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <CalendarIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Attendance Rate
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                            94.2%
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: 'success.50',
                                        border: '1px solid',
                                        borderColor: 'success.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <PresentIcon sx={{ color: 'success.main', fontSize: 16 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Days Present
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                            18
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: 'warning.50',
                                        border: '1px solid',
                                        borderColor: 'warning.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <TardyIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Late Days
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                            1
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: 'error.50',
                                        border: '1px solid',
                                        borderColor: 'error.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <AbsentIcon sx={{ color: 'error.main', fontSize: 16 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Absent Days
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                            0
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Calendar */}
                        <Paper
                            elevation={0}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                overflow: 'hidden',
                            }}
                        >
                            {/* Calendar Header */}
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: 'primary.50',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        color: 'primary.main',
                                    }}
                                >
                                    {monthName}
                                </Typography>
                            </Box>

                            {/* Days of Week Header */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    backgroundColor: 'background.default',
                                }}
                            >
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <Box
                                        key={day}
                                        sx={{
                                            p: 1,
                                            textAlign: 'center',
                                            borderRight: '1px solid',
                                            borderColor: 'divider',
                                            '&:last-child': { borderRight: 'none' },
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {day}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Calendar Grid */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    minHeight: '300px',
                                }}
                            >
                                {monthlyData.map((dayData, index) => {
                                    if (!dayData) {
                                        return (
                                            <Box
                                                key={`empty-${index}`}
                                                sx={{
                                                    borderRight: '1px solid',
                                                    borderBottom: '1px solid',
                                                    borderColor: 'divider',
                                                    '&:nth-of-type(7n)': { borderRight: 'none' },
                                                }}
                                            />
                                        );
                                    }

                                    const isClickable = dayData.isPastDay || dayData.isToday;
                                    const statusColor = getStatusColor(dayData.status);

                                    return (
                                        <Box
                                            key={dayData.day}
                                            onClick={() => isClickable && handleDayClick(dayData)}
                                            sx={{
                                                borderRight: '1px solid',
                                                borderBottom: '1px solid',
                                                borderColor: 'divider',
                                                minHeight: 80,
                                                p: 0.5,
                                                cursor: isClickable ? 'pointer' : 'default',
                                                position: 'relative',
                                                backgroundColor: dayData.isToday
                                                    ? 'primary.50'
                                                    : dayData.isWeekend
                                                    ? 'background.default'
                                                    : 'background.paper',
                                                '&:hover': isClickable
                                                    ? {
                                                        backgroundColor: dayData.isToday
                                                            ? 'primary.100'
                                                            : 'action.hover',
                                                    }
                                                    : {},
                                                '&:nth-of-type(7n)': { borderRight: 'none' },
                                                opacity: dayData.status === 'future' ? 0.6 : 1,
                                            }}
                                        >
                                            {/* Day Number */}
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: dayData.isToday ? 700 : 500,
                                                    fontSize: '0.875rem',
                                                    color: dayData.isToday
                                                        ? 'primary.main'
                                                        : dayData.isWeekend
                                                        ? 'text.secondary'
                                                        : 'text.primary',
                                                    display: 'block',
                                                }}
                                            >
                                                {dayData.day}
                                            </Typography>

                                            {/* Today Indicator */}
                                            {dayData.isToday && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        right: 4,
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        backgroundColor: 'primary.main',
                                                    }}
                                                />
                                            )}

                                            {/* Attendance Status Indicator */}
                                            {!dayData.isWeekend && dayData.status !== 'future' && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 4,
                                                        left: 4,
                                                        right: 4,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '50%',
                                                            backgroundColor: statusColor,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        {getStatusIcon(dayData.status, 12)}
                                                    </Box>
                                                </Box>
                                            )}

                                            {/* Weekend or No School Indicator */}
                                            {dayData.isWeekend && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 4,
                                                        left: 4,
                                                        right: 4,
                                                        textAlign: 'center',
                                                        fontSize: '0.625rem',
                                                        color: 'text.secondary',
                                                    }}
                                                >
                                                    Weekend
                                                </Typography>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Paper>

                        {/* Legend */}
                        <Box sx={{ mt: 2 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                }}
                            >
                                LEGEND
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1.5,
                                }}
                            >
                                {[
                                    { label: 'Present', color: '#10b981', icon: <PresentIcon /> },
                                    { label: 'Late', color: '#f59e0b', icon: <TardyIcon /> },
                                    { label: 'Absent', color: '#ef4444', icon: <AbsentIcon /> },
                                    { label: 'Early Out', color: '#8b5cf6', icon: <EarlyDismissalIcon /> },
                                ].map((item) => (
                                    <Box
                                        key={item.label}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor: item.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {React.cloneElement(item.icon, {
                                                sx: { fontSize: 8, color: 'white' },
                                            })}
                                        </Box>
                                        <Typography
                                            variant="caption"
                                            sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>

                {/* Weekly Timetable Tab (Classes Only) */}
                <TabPanel value={tabValue} index={1}>
                    <WeeklyTimetable selectedStudent={selectedStudent} />
                </TabPanel>

                {/* Period Attendance Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Box sx={{ p: 2 }}>
                        {/* Weekly Stats */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1.5,
                                    fontSize: '0.875rem',
                                }}
                            >
                                Weekly Attendance Summary
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                    gap: 1.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: 'success.50',
                                        border: '1px solid',
                                        borderColor: 'success.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <PresentIcon sx={{ color: 'success.main', fontSize: 16 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Present
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                            28
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: 'warning.50',
                                        border: '1px solid',
                                        borderColor: 'warning.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <TardyIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Late
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                            2
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: 'error.50',
                                        border: '1px solid',
                                        borderColor: 'error.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <AbsentIcon sx={{ color: 'error.main', fontSize: 16 }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Absent
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                                            1
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Attendance Table */}
                        <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                        >
                            <Table size="small" sx={{ minWidth: 600 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                                            Period
                                        </TableCell>
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                                            const isToday = day === getCurrentDayOfWeek();
                                            return (
                                                <TableCell
                                                    key={day}
                                                    align="center"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '0.75rem',
                                                        backgroundColor: isToday ? 'primary.100' : 'inherit',
                                                        borderRight: '1px solid',
                                                        borderColor: 'divider',
                                                        color: isToday ? 'primary.main' : 'inherit',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    {day}
                                                    {isToday && (
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 2,
                                                                right: 2,
                                                                width: 6,
                                                                height: 6,
                                                                borderRadius: '50%',
                                                                backgroundColor: 'primary.main',
                                                            }}
                                                        />
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.from({ length: 7 }, (_, periodIndex) => (
                                        <TableRow key={periodIndex}>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem',
                                                    backgroundColor: 'background.default',
                                                    borderRight: '1px solid',
                                                    borderColor: 'divider',
                                                    verticalAlign: 'top',
                                                    minWidth: 80,
                                                }}
                                            >
                                                Period {periodIndex + 1}
                                            </TableCell>
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                                                const period = weeklyAttendanceData[day]?.[periodIndex];
                                                const isCurrentDay = day === getCurrentDayOfWeek();
                                                const isDisabled = isPeriodDisabled(day, periodIndex);
                                                const isBreak = period?.subject === 'Break' || period?.subject === 'Lunch';

                                                if (!period) {
                                                    return (
                                                        <TableCell
                                                            key={`${day}-${periodIndex}`}
                                                            sx={{ border: '1px solid', borderColor: 'divider' }}
                                                        />
                                                    );
                                                }

                                                const statusColor = getStatusColor(period.status);

                                                return (
                                                    <TableCell
                                                        key={`${day}-${periodIndex}`}
                                                        onClick={() => !isDisabled && !isBreak && handlePeriodClick(period)}
                                                        sx={{
                                                            p: 0.5,
                                                            border: '1px solid',
                                                            borderColor: 'divider',
                                                            minHeight: 48,
                                                            backgroundColor: isDisabled
                                                                ? 'action.disabledBackground'
                                                                : isCurrentDay && !isBreak
                                                                ? `${statusColor}08`
                                                                : 'background.paper',
                                                            cursor: !isDisabled && !isBreak ? 'pointer' : 'default',
                                                            opacity: isDisabled ? 0.5 : 1,
                                                            '&:hover': !isDisabled && !isBreak
                                                                ? {
                                                                    backgroundColor: `${statusColor}15`,
                                                                }
                                                                : {},
                                                            ...(isCurrentDay &&
                                                                !isDisabled &&
                                                                !isBreak && {
                                                                    borderLeft: `3px solid ${statusColor}`,
                                                                }),
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: 0.25,
                                                                minHeight: 40,
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            {!isBreak && (
                                                                <>
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 0.5,
                                                                            mb: 0.25,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="caption"
                                                                            sx={{
                                                                                fontWeight: 600,
                                                                                fontSize: '0.6875rem',
                                                                                lineHeight: 1,
                                                                                color: isCurrentDay
                                                                                    ? statusColor
                                                                                    : 'text.primary',
                                                                                flex: 1,
                                                                            }}
                                                                        >
                                                                            {period.subject}
                                                                        </Typography>
                                                                        {!isDisabled && (
                                                                            <Box
                                                                                sx={{
                                                                                    width: 14,
                                                                                    height: 14,
                                                                                    borderRadius: '50%',
                                                                                    backgroundColor: statusColor,
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                }}
                                                                            >
                                                                                {getStatusIcon(period.status)}
                                                                            </Box>
                                                                        )}
                                                                    </Box>
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize: '0.625rem',
                                                                            color: 'text.secondary',
                                                                            lineHeight: 1,
                                                                        }}
                                                                    >
                                                                        {period.teacher}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize: '0.625rem',
                                                                            color: 'text.secondary',
                                                                            lineHeight: 1,
                                                                        }}
                                                                    >
                                                                        {period.room}
                                                                    </Typography>
                                                                </>
                                                            )}
                                                            {isBreak && (
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        fontSize: '0.6875rem',
                                                                        color: 'text.secondary',
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    {period.subject}
                                                                </Typography>
                                                            )}
                                                            {isDisabled && !isBreak && (
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        fontSize: '0.625rem',
                                                                        color: 'text.secondary',
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    Not Yet
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </TabPanel>
            </Paper>

            {/* Daily Details Dialog */}
            {selectedDay && (
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                            <Typography variant="h6">Daily Attendance Details</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 2, fontSize: '0.875rem' }}
                        >
                            {selectedDay.date?.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Typography>

                        <List sx={{ py: 0 }}>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            backgroundColor: getStatusColor(selectedDay.status),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {getStatusIcon(selectedDay.status)}
                                    </Box>
                                </Box>
                                <ListItemText
                                    primary="Overall Status"
                                    secondary={
                                        selectedDay.status === 'present' ? 'Present' :
                                        selectedDay.status === 'late' ? 'Late Arrival' :
                                        selectedDay.status === 'absent' ? 'Absent' :
                                        selectedDay.status === 'early_dismissal' ? 'Early Dismissal' : 'Unknown'
                                    }
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        },
                                        '& .MuiListItemText-secondary': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemText
                                    primary="Time In"
                                    secondary={selectedDay.status === 'present' ? '8:00 AM' :
                                              selectedDay.status === 'late' ? '8:15 AM' : 'N/A'}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        },
                                        '& .MuiListItemText-secondary': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemText
                                    primary="Time Out"
                                    secondary={selectedDay.status === 'early_dismissal' ? '2:30 PM' :
                                              selectedDay.status === 'absent' ? 'N/A' : '3:15 PM'}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        },
                                        '& .MuiListItemText-secondary': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemText
                                    primary="Periods Present"
                                    secondary={`${selectedDay.attendanceRate === 100 ? '7/7' :
                                               selectedDay.attendanceRate === 85 ? '6/7' : '0/7'}`}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        },
                                        '& .MuiListItemText-secondary': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </ListItem>

                            {selectedDay.status === 'late' && (
                                <ListItem sx={{ px: 0, py: 1 }}>
                                    <ListItemText
                                        primary="Notes"
                                        secondary="Student arrived 15 minutes late - traffic delay"
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontSize: '0.8125rem',
                                                fontWeight: 500,
                                            },
                                            '& .MuiListItemText-secondary': {
                                                fontSize: '0.875rem',
                                            },
                                        }}
                                    />
                                </ListItem>
                            )}

                            {selectedDay.status === 'absent' && (
                                <ListItem sx={{ px: 0, py: 1 }}>
                                    <Chip
                                        label="Doctor's Appointment - Excused"
                                        color="info"
                                        size="small"
                                        sx={{ fontSize: '0.6875rem' }}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}

            {selectedPeriod && (
                <Dialog
                    open={periodDialogOpen}
                    onClose={() => setPeriodDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ScheduleIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                            <Typography variant="h6">Period Attendance Details</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 2, fontSize: '0.875rem' }}
                        >
                            {selectedPeriod.subject} ({selectedPeriod.startTime} - {selectedPeriod.endTime})
                        </Typography>

                        <List sx={{ py: 0 }}>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            backgroundColor: getStatusColor(selectedPeriod.status),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {getStatusIcon(selectedPeriod.status)}
                                    </Box>
                                </Box>
                                <ListItemText
                                    primary="Status"
                                    secondary={getStatusLabel(selectedPeriod.status)}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        },
                                        '& .MuiListItemText-secondary': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemText
                                    primary="Teacher"
                                    secondary={selectedPeriod.teacher}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        },
                                        '& .MuiListItemText-secondary': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemText
                                    primary="Location"
                                    secondary={selectedPeriod.room}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        },
                                        '& .MuiListItemText-secondary': {
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                />
                            </ListItem>

                            {selectedPeriod.notes && (
                                <ListItem sx={{ px: 0, py: 1 }}>
                                    <ListItemText
                                        primary="Notes"
                                        secondary={selectedPeriod.notes}
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontSize: '0.8125rem',
                                                fontWeight: 500,
                                            },
                                            '& .MuiListItemText-secondary': {
                                                fontSize: '0.875rem',
                                            },
                                        }}
                                    />
                                </ListItem>
                            )}

                            {(selectedPeriod.status === 'absent' || selectedPeriod.status === 'late') && (
                                <ListItem sx={{ px: 0, py: 1 }}>
                                    <Chip
                                        label="Requires Parent Contact"
                                        color="error"
                                        size="small"
                                        sx={{ fontSize: '0.6875rem' }}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setPeriodDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};