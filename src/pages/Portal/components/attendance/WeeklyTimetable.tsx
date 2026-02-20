import {
    CalendarToday as CalendarIcon,
    Timer as DurationIcon,
    EventNote as EventIcon,
    LocationOn as LocationIcon,
    Schedule as ScheduleIcon,
    School as SchoolIcon,
    AccessTime as TimeIcon,
    Today as TodayIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Container,
    Grid,
    LinearProgress,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n/config';
import type { Student } from '../../../../types/student.types';
import { useGetClassTimeTable } from '../../_hooks/useParentWithStore';

interface WeeklyTimetableProps {
    selectedStudent?: Student | null;
}

interface TimetableEvent {
    title: string;
    start: string;
    end: string;
    extendedProps: {
        Id: number;
        SchoolYearTimeSlotId: number | null;
        room?: string;
    };
}

interface TimetableData {
    weekStart: string;
    weekEnd: string;
    minTimeStr: string;
    maxTimeStr: string;
    timetableEvents: TimetableEvent[];
}

const getSubjectColor = (title: string): string => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('math')) return '#3b82f6';
    if (lowerTitle.includes('anglais') || lowerTitle.includes('english'))
        return '#10b981';
    if (lowerTitle.includes('science')) return '#f59e0b';
    if (lowerTitle.includes('histoire') || lowerTitle.includes('history'))
        return '#ef4444';
    if (lowerTitle.includes('géographie') || lowerTitle.includes('geography'))
        return '#06b6d4';
    if (lowerTitle.includes('français') || lowerTitle.includes('french'))
        return '#84cc16';
    if (lowerTitle.includes('économie') || lowerTitle.includes('economy'))
        return '#f97316';
    if (lowerTitle.includes('physique')) return '#8b5cf6';
    if (lowerTitle.includes('travail') || lowerTitle.includes('manuel'))
        return '#ec4899';

    return '#6366f1'; // Default purple
};

const getLanguage = (val: string): string => {
    switch (val) {
        case 'en':
            return 'en-US';
        case 'es':
            return 'es-ES';
        case 'fr':
            return 'fr-FR';
        default:
            return 'fr-FR';
    }
};

const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString(getLanguage(i18n.language), {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

// const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString('fr-FR', {
//         weekday: 'long',
//         day: 'numeric',
//         month: 'long',
//     });
// };

const formatShortDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(getLanguage(i18n.language), {
        day: '2-digit',
        month: '2-digit',
    });
};

const formatDayWithDate = (
    dateString: string
): { day: string; date: string; isToday: boolean; isWeekend: boolean } => {
    const eventDate = new Date(dateString);
    const today = new Date();

    // Normalize dates to compare just the date part
    const eventDateOnly = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate()
    );
    const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const dayName = eventDate.toLocaleDateString(getLanguage(i18n.language), {
        weekday: 'long',
    });
    const dateStr = eventDate.toLocaleDateString(getLanguage(i18n.language), {
        day: '2-digit',
        month: '2-digit',
    });

    const isToday = eventDateOnly.getTime() === todayOnly.getTime();
    const dayOfWeek = eventDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    return {
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        date: dateStr,
        isToday,
        isWeekend,
    };
};

const calculateDuration = (start: string, end: string): string => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMinutes = Math.round(durationMs / (1000 * 60));

    if (durationMinutes < 60) {
        return `${durationMinutes}min`;
    } else {
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        return minutes > 0 ? `${hours}h${minutes}min` : `${hours}h`;
    }
};

const getWorkloadIntensity = (
    dayEvents: TimetableEvent[]
): {
    level: 'light' | 'moderate' | 'heavy';
    color: string;
} => {
    const totalHours = dayEvents.reduce((total, event) => {
        const duration =
            new Date(event.end).getTime() - new Date(event.start).getTime();
        return total + duration / (1000 * 60 * 60); // Convert to hours
    }, 0);

    if (totalHours >= 6) {
        return {
            level: 'heavy',
            color: '#ef4444',
        };
    } else if (totalHours >= 4) {
        return {
            level: 'moderate',
            color: '#f59e0b',
        };
    } else {
        return {
            level: 'light',
            color: '#10b981',
        };
    }
};

const getDayIndex = (dateString: string): number => {
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    // Convert Sunday (0) to Monday (0) based indexing
    return dayIndex === 0 ? 6 : dayIndex - 1;
};

const groupEventsByDayAndTime = (events: TimetableEvent[]) => {
    // Group events by day index (language-independent)
    const eventsByDayIndex = events.reduce(
        (acc, event) => {
            const dayIndex = getDayIndex(event.start);
            if (!acc[dayIndex]) {
                acc[dayIndex] = [];
            }
            acc[dayIndex].push(event);
            return acc;
        },
        {} as Record<number, TimetableEvent[]>
    );

    // Sort events by start time within each day
    Object.values(eventsByDayIndex).forEach(dayEvents => {
        dayEvents.sort(
            (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
        );
    });

    return eventsByDayIndex;
};

export const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({
    selectedStudent,
}) => {
    const { t } = useTranslation('attendance');
    const { data, isLoading, error } = useGetClassTimeTable();
    console.log({ data });

    if (!selectedStudent) {
        return (
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40vh',
                        gap: 2,
                    }}
                >
                    <SchoolIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                    <Typography variant="subtitle1" color="text.secondary">
                        {t('timetable.selectStudent')}
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    <LinearProgress sx={{ mb: 3 }} />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                    >
                        {t('timetable.loading')}
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40vh',
                        gap: 2,
                    }}
                >
                    <EventIcon sx={{ fontSize: 48, color: 'error.main' }} />
                    <Typography variant="subtitle1" color="error.main">
                        {t('timetable.error')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {error.message || t('timetable.unexpectedError')}
                    </Typography>
                </Box>
            </Container>
        );
    }

    const timetableData = data as unknown as TimetableData;
    const events = timetableData?.timetableEvents || [];
    const groupedEvents = groupEventsByDayAndTime(events);

    const weekStart = timetableData?.weekStart;
    const weekEnd = timetableData?.weekEnd;
    const totalSubjects = new Set(events.map(e => e.title)).size;
    const totalHours = events.length;

    // Define weekday indices (0=Monday, 1=Tuesday, etc.)
    const weekDayIndices = [0, 1, 2, 3, 4]; // Monday to Friday

    // Helper function to get localized day name from index
    const getLocalizedDayName = (dayIndex: number): string => {
        const baseDate = new Date(2023, 0, 2); // A Monday (index 0)
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + dayIndex);
        return date.toLocaleDateString(getLanguage(i18n.language), {
            weekday: 'long',
        });
    };

    console.log('🔍 Timetable Debug:', {
        events,
        groupedEvents,
        weekStart,
        weekEnd,
        totalSubjects,
        totalHours,
    });

    return (
        <Box sx={{ py: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: '1.25rem',
                        }}
                    >
                        {t('timetable.header')}
                    </Typography>
                    <Chip
                        label={t('timetable.subjects', {
                            count: totalSubjects,
                        })}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                    />
                </Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 400,
                    }}
                >
                    {selectedStudent.fullName} • Grade {selectedStudent.grade}
                </Typography>
            </Box>

            {/* Enhanced Week Overview */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: 'primary.50',
                        border: '1px solid',
                        borderColor: 'primary.100',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <CalendarIcon
                            sx={{ color: 'primary.main', fontSize: 20 }}
                        />
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                {t('timetable.weekOf')}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {weekStart && formatShortDate(weekStart)}{' '}
                                {t('timetable.to')}{' '}
                                {weekEnd && formatShortDate(weekEnd)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: 'success.50',
                        border: '1px solid',
                        borderColor: 'success.200',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <ScheduleIcon
                            sx={{ color: 'success.main', fontSize: 20 }}
                        />
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                {t('timetable.totalClasses')}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {t('timetable.sessions', { count: totalHours })}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: 'info.50',
                        border: '1px solid',
                        borderColor: 'info.200',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <TrendingUpIcon
                            sx={{ color: 'info.main', fontSize: 20 }}
                        />
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                {t('timetable.subjects', { count: 0 }).replace(
                                    '0 ',
                                    ''
                                )}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {t('timetable.disciplines', {
                                    count: totalSubjects,
                                })}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: 'warning.50',
                        border: '1px solid',
                        borderColor: 'warning.200',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <DurationIcon
                            sx={{ color: 'warning.main', fontSize: 20 }}
                        />
                        <Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                {t('timetable.totalHours')}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {events
                                    .reduce((total, event) => {
                                        const duration =
                                            new Date(event.end).getTime() -
                                            new Date(event.start).getTime();
                                        return (
                                            total + duration / (1000 * 60 * 60)
                                        );
                                    }, 0)
                                    .toFixed(1)}
                                h
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Daily Schedule */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2,
                        fontSize: '0.875rem',
                    }}
                >
                    {t('timetable.dailySchedule')}
                </Typography>

                <Grid container spacing={2}>
                    {weekDayIndices.map(dayIndex => {
                        const dayEvents = groupedEvents[dayIndex] || [];
                        const hasClasses = dayEvents.length > 0;
                        const dayName = getLocalizedDayName(dayIndex);

                        // Get enhanced day info for first event (if exists)
                        const dayInfo =
                            dayEvents.length > 0
                                ? formatDayWithDate(dayEvents[0].start)
                                : {
                                      day:
                                          dayName.charAt(0).toUpperCase() +
                                          dayName.slice(1),
                                      date: '',
                                      isToday: false,
                                      isWeekend: false,
                                  };

                        const workload = hasClasses
                            ? getWorkloadIntensity(dayEvents)
                            : null;

                        return (
                            <Grid
                                key={dayIndex}
                                size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        border: '2px solid',
                                        borderColor: dayInfo.isToday
                                            ? 'primary.main'
                                            : hasClasses
                                              ? 'primary.200'
                                              : 'divider',
                                        borderRadius: 1,
                                        backgroundColor: dayInfo.isToday
                                            ? 'primary.100'
                                            : hasClasses
                                              ? 'primary.50'
                                              : 'background.paper',
                                        minHeight: 320,
                                        transition: 'all 0.3s ease-in-out',
                                        position: 'relative',
                                        '&:hover': hasClasses
                                            ? {
                                                  borderColor: 'primary.main',
                                                  boxShadow:
                                                      '0 4px 20px rgba(99, 102, 241, 0.15)',
                                                  transform: 'translateY(-2px)',
                                              }
                                            : {},
                                    }}
                                >
                                    {/* Today Indicator */}
                                    {dayInfo.isToday && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -1,
                                                right: -1,
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: '0 0 0 8px',
                                                fontSize: '0.625rem',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <TodayIcon sx={{ fontSize: 10 }} />
                                            {t('timetable.today')}
                                        </Box>
                                    )}

                                    {/* Enhanced Day Header */}
                                    <Box
                                        sx={{
                                            mb: 2,
                                            pb: 1.5,
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                mb: 1,
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: dayInfo.isToday
                                                            ? 'primary.dark'
                                                            : hasClasses
                                                              ? 'primary.main'
                                                              : 'text.primary',
                                                        fontSize: '0.875rem',
                                                        mb: 0.25,
                                                    }}
                                                >
                                                    {dayInfo.day}
                                                </Typography>
                                                {dayInfo.date && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontSize:
                                                                '0.6875rem',
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <CalendarIcon
                                                            sx={{
                                                                fontSize: 10,
                                                            }}
                                                        />
                                                        {dayInfo.date}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Workload Intensity Indicator */}
                                            {workload && (
                                                <Chip
                                                    size="small"
                                                    label={t(
                                                        `timetable.workload.${workload.level}`
                                                    )}
                                                    sx={{
                                                        height: 18,
                                                        fontSize: '0.625rem',
                                                        backgroundColor:
                                                            workload.color +
                                                            '20',
                                                        color: workload.color,
                                                        border: '1px solid',
                                                        borderColor:
                                                            workload.color +
                                                            '40',
                                                        fontWeight: 500,
                                                    }}
                                                />
                                            )}
                                        </Box>

                                        {/* Quick Stats */}
                                        {hasClasses && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 1,
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <Chip
                                                    size="small"
                                                    label={t(
                                                        'timetable.classes',
                                                        {
                                                            count: dayEvents.length,
                                                        }
                                                    )}
                                                    variant="outlined"
                                                    sx={{
                                                        height: 16,
                                                        fontSize: '0.625rem',
                                                        borderColor:
                                                            'primary.300',
                                                        color: 'primary.dark',
                                                    }}
                                                />
                                                <Chip
                                                    size="small"
                                                    label={`${dayEvents
                                                        .reduce(
                                                            (total, event) => {
                                                                const duration =
                                                                    new Date(
                                                                        event.end
                                                                    ).getTime() -
                                                                    new Date(
                                                                        event.start
                                                                    ).getTime();
                                                                return (
                                                                    total +
                                                                    duration /
                                                                        (1000 *
                                                                            60 *
                                                                            60)
                                                                );
                                                            },
                                                            0
                                                        )
                                                        .toFixed(1)}h`}
                                                    variant="outlined"
                                                    sx={{
                                                        height: 16,
                                                        fontSize: '0.625rem',
                                                        borderColor:
                                                            'success.300',
                                                        color: 'success.dark',
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Classes */}
                                    {hasClasses ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1.5,
                                            }}
                                        >
                                            {dayEvents.map(event => {
                                                const color = getSubjectColor(
                                                    event.title
                                                );
                                                const startTime = formatTime(
                                                    event.start
                                                );
                                                const endTime = formatTime(
                                                    event.end
                                                );
                                                const duration =
                                                    calculateDuration(
                                                        event.start,
                                                        event.end
                                                    );

                                                return (
                                                    <Box
                                                        key={
                                                            event.extendedProps
                                                                .Id
                                                        }
                                                        sx={{
                                                            p: 1.5,
                                                            borderRadius: 0.75,
                                                            backgroundColor:
                                                                color + '15',
                                                            border: '1px solid',
                                                            borderColor:
                                                                color + '30',
                                                            borderLeft:
                                                                '3px solid',
                                                            borderLeftColor:
                                                                color,
                                                            transition:
                                                                'all 0.2s ease-in-out',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    color +
                                                                    '25',
                                                                borderColor:
                                                                    color +
                                                                    '50',
                                                                transform:
                                                                    'translateY(-1px)',
                                                                boxShadow: `0 2px 8px ${color}20`,
                                                            },
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'space-between',
                                                                alignItems:
                                                                    'flex-start',
                                                                mb: 0.75,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: color,
                                                                    fontSize:
                                                                        '0.6875rem',
                                                                    lineHeight: 1.2,
                                                                    flex: 1,
                                                                }}
                                                            >
                                                                {event.title}
                                                            </Typography>
                                                            <Chip
                                                                label={duration}
                                                                size="small"
                                                                sx={{
                                                                    height: 14,
                                                                    fontSize:
                                                                        '0.5625rem',
                                                                    fontWeight: 600,
                                                                    backgroundColor:
                                                                        color +
                                                                        '20',
                                                                    color: color,
                                                                    border: `1px solid ${color}40`,
                                                                    ml: 0.5,
                                                                }}
                                                            />
                                                        </Box>

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                justifyContent:
                                                                    'space-between',
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    gap: 0.5,
                                                                }}
                                                            >
                                                                <TimeIcon
                                                                    sx={{
                                                                        fontSize: 10,
                                                                        color: 'text.secondary',
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        color: 'text.secondary',
                                                                        fontSize:
                                                                            '0.625rem',
                                                                    }}
                                                                >
                                                                    {startTime}{' '}
                                                                    - {endTime}
                                                                </Typography>
                                                            </Box>

                                                            {event.extendedProps
                                                                .room && (
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        gap: 0.5,
                                                                    }}
                                                                >
                                                                    <LocationIcon
                                                                        sx={{
                                                                            fontSize: 10,
                                                                            color: 'text.secondary',
                                                                        }}
                                                                    />
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            color: 'text.secondary',
                                                                            fontSize:
                                                                                '0.625rem',
                                                                            fontWeight: 500,
                                                                        }}
                                                                    >
                                                                        {
                                                                            event
                                                                                .extendedProps
                                                                                .room
                                                                        }
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '180px',
                                                color: 'text.disabled',
                                            }}
                                        >
                                            <EventIcon
                                                sx={{ fontSize: 32, mb: 1 }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.6875rem',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {t('timetable.noClasses')
                                                    .split(' ')
                                                    .map((word, i) => (
                                                        <React.Fragment key={i}>
                                                            {word}
                                                            <br />
                                                        </React.Fragment>
                                                    ))}
                                            </Typography>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            {/* Subject Summary */}
            {totalSubjects > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 2,
                            fontSize: '0.875rem',
                        }}
                    >
                        {t('timetable.subjectOverview')}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {Array.from(new Set(events.map(e => e.title))).map(
                            subject => {
                                const color = getSubjectColor(subject);
                                const subjectEvents = events.filter(
                                    e => e.title === subject
                                );
                                const hours = subjectEvents.length;

                                return (
                                    <Chip
                                        key={subject}
                                        label={`${subject} (${hours}h)`}
                                        size="small"
                                        sx={{
                                            backgroundColor: color + '15',
                                            color: color,
                                            border: '1px solid',
                                            borderColor: color + '30',
                                            fontSize: '0.6875rem',
                                            fontWeight: 500,
                                            '& .MuiChip-label': {
                                                px: 1,
                                            },
                                        }}
                                    />
                                );
                            }
                        )}
                    </Box>
                </Box>
            )}

            {/* Today Indicator */}
            {events.length > 0 && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: 'info.50',
                        border: '1px solid',
                        borderColor: 'info.200',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: 'info.dark',
                            mb: 0.5,
                        }}
                    >
                        <TodayIcon
                            sx={{
                                fontSize: 16,
                                mr: 0.5,
                                verticalAlign: 'middle',
                            }}
                        />
                        {t('timetable.weekOverview')}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.8125rem',
                        }}
                    >
                        {t('timetable.weekSummary', {
                            studentName: selectedStudent.fullName,
                            totalHours,
                            totalSubjects,
                        })}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
