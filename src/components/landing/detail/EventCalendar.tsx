import {
    LocationOn as LocationIcon,
    AccessTime as TimeIcon,
} from '@mui/icons-material';
import { Box, Button, Card, Typography } from '@mui/material';
import React, { type RefObject } from 'react';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
}

interface EventCalendarProps {
    events: Event[];
    onViewAll?: () => void;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({
    events,
    onViewAll,
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    const displayEvents = events.slice(0, 7);

    return (
        <Card
            ref={targetRef as RefObject<HTMLDivElement>}
            sx={{
                p: 2,
                backgroundColor: '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    Upcoming Events
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {displayEvents.map((event, index) => (
                    <Box
                        key={event.id}
                        sx={{
                            p: 1.5,
                            backgroundColor: '#f8fafc',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: `${index * 0.05}s`,
                            '&:hover': {
                                borderColor: 'primary.main',
                                backgroundColor: '#ffffff',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 1,
                                    background:
                                        'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    flexShrink: 0,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        lineHeight: 1,
                                    }}
                                >
                                    {new Date(event.date).toLocaleDateString(
                                        'en-US',
                                        { month: 'short' }
                                    )}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        lineHeight: 1,
                                        mt: 0.25,
                                    }}
                                >
                                    {new Date(event.date).getDate()}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    {event.title}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.25,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <TimeIcon
                                            sx={{
                                                fontSize: 14,
                                                color: 'text.secondary',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {event.time}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <LocationIcon
                                            sx={{
                                                fontSize: 14,
                                                color: 'text.secondary',
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {event.location}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            {onViewAll && (
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onViewAll}
                    sx={{
                        mt: 2,
                        fontSize: '0.875rem',
                        textTransform: 'none',
                    }}
                >
                    View All Events
                </Button>
            )}
        </Card>
    );
};
