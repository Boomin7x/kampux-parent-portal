import { CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { eventsAnnouncementsSectionContent } from '../../content/landing/eventsAnnouncementsSection';
import { SectionPreview } from './SectionPreview';

// Events Preview props
interface EventsPreviewProps {
    className?: string;
}

/**
 * EventsPreview Component
 *
 * Compact preview of events and announcements with:
 * - 3-4 key events as compact cards
 * - Each event: date, title, description, urgent badge
 * - Typography: subtitle2 for title, body2 for description, caption for date
 * - Compact spacing: gap: 1.5
 * - CTA: "View All Events" → /events
 */
const eventImages = [
    'pexels-muhaimin-abdul-aziz-101521657-19520596.jpg',
    'pexels-rdne-7092531.jpg',
    'yamu_jay-ai-generated-9214143.jpg',
];
export const EventsPreview: React.FC<EventsPreviewProps> = ({
    className = '',
}) => {
    const events = eventsAnnouncementsSectionContent.events.slice(0, 3);

    return (
        <SectionPreview
            id="events-preview"
            title="Stay Informed"
            subtitle="Important announcements and upcoming events"
            overline="EVENTS & ANNOUNCEMENTS"
            ctaText="View All Events"
            ctaRoute="/events"
            backgroundColor="#f8fafc"
            className={className}
            containerMaxWidth="xl"
            showCTA={false}
        >
            {/* Events Grid */}
            <Grid container spacing={2}>
                {events.map((event, idx) => (
                    <Grid
                        className="group"
                        size={{ xs: 12, md: 4 }}
                        key={event.id}
                    >
                        <Box
                            sx={{
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: event.urgent
                                    ? 'error.main'
                                    : 'divider',

                                backgroundColor: event.urgent
                                    ? 'error.50'
                                    : 'background.paper',
                                height: '100%',
                                overflow: 'hidden',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: event.urgent
                                        ? 'error.main'
                                        : 'primary.main',
                                    backgroundColor: event.urgent
                                        ? 'error.50'
                                        : 'primary.50',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Box
                                component={'img'}
                                src={`/events/${eventImages[idx % 3]}`}
                                width={'100%'}
                                height={{ xs: '10rem', md: '15rem' }}
                                sx={{
                                    objectFit: 'cover',
                                    '.group:hover &': {
                                        transform: 'scale(105%)',
                                        transition:
                                            'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5,
                                    p: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    {/* Icon */}
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 1,
                                            background: event.urgent
                                                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                        }}
                                    >
                                        <CalendarIcon
                                            sx={{ fontSize: '1.125rem' }}
                                        />
                                    </Box>

                                    {/* Urgent Badge */}
                                    {event.urgent && (
                                        <Chip
                                            label="URGENT"
                                            size="small"
                                            sx={{
                                                height: 20,
                                                fontSize: '0.625rem',
                                                fontWeight: 700,
                                                backgroundColor: 'error.main',
                                                color: 'white',
                                                '& .MuiChip-label': {
                                                    px: 1,
                                                },
                                            }}
                                        />
                                    )}
                                </Box>

                                {/* Date */}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: event.urgent
                                            ? 'error.main'
                                            : 'primary.main',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {event.date}
                                </Typography>

                                {/* Title */}
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {event.title}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                        flex: 1,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {event.description}
                                </Typography>

                                {/* Type Badge */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        pt: 1,
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '0.75rem',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 0.5,
                                            backgroundColor: event.urgent
                                                ? 'error.100'
                                                : 'primary.100',
                                            color: event.urgent
                                                ? 'error.main'
                                                : 'primary.main',
                                            fontWeight: 500,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {event.type}
                                    </Typography>
                                </Box>
                            </Box>
                            {/* Header with Icon and Badge */}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </SectionPreview>
    );
};
