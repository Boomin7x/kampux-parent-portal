import React from 'react';
import { Box, Typography } from '@mui/material';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Sample announcements & events data
const events = [
    {
        id: 'finals-exams',
        type: 'exam',
        title: 'End-of-Term Examinations',
        description:
            'Final exams for all grades begin Monday, May 19 and end Friday, May 30. Students must bring their ID cards and required materials.',
        date: 'May 19 – May 30',
        image: '/pexels-yaroslav-shuraev-6281132.jpg',
        color: '#6366f1',
        urgent: false,
    },
    {
        id: 'pta-meeting',
        type: 'announcement',
        title: 'Parent-Teacher Association Meeting',
        description:
            'Our next PTA meeting is scheduled for Thursday, June 5, at 6:00 pm. Attendance is strongly encouraged for all parents and guardians.',
        date: 'June 5, 6:00pm',
        image: '/pexels-kampus-8629106.jpg',
        color: '#10b981',
        urgent: false,
    },
    {
        id: 'exam-venue-update',
        type: 'announcement',
        title: 'Exam Venue Change',
        description:
            'Due to ongoing facility renovations, Grade 10 and 11 exams will now take place in Room B201. Please adjust arrival plans accordingly.',
        date: 'Effective Immediately',
        image: '/pexels-rdne-8500421.jpg',
        color: '#ef4444',
        urgent: true,
    },
    {
        id: 'midterm-results',
        type: 'announcement',
        title: 'Midterm Results Published',
        description:
            'Midterm exam results are now available on the student and parent portal. For any concerns, contact the academic office.',
        date: 'May 10',
        image: '/pexels-cottonbro-6208926.jpg',
        color: '#6366f1',
        urgent: false,
    },
    {
        id: 'graduation-ceremony',
        type: 'event',
        title: 'Graduation Ceremony',
        description:
            'Celebrate our senior class! Ceremony will take place at the Main Hall, Saturday, June 15, at 4:00 pm. All are welcome.',
        date: 'June 15, 4:00pm',
        image: '/pexels-kampus-8629106.jpg',
        color: '#f59e0b',
        urgent: false,
    },
];

export const EventsAnnouncementsSection: React.FC = () => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="events-announcements"
            component="section"
            ref={targetRef}
            sx={{
                position: 'relative',
                py: { xs: 12, md: 20 },
                backgroundColor: '#fefefe',
                overflow: 'hidden',
            }}
        >
            {/* Main Content Container */}
            <Box
                sx={{
                    width: '95%',
                    maxWidth: '1600px',
                    mx: 'auto',
                    px: { xs: 3, md: 6, lg: 8 },
                }}
            >
                {/* Section Header */}
                <Box
                    sx={{
                        mb: { xs: 8, md: 12 },
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.2s',
                    }}
                >
                    {/* Overline */}
                    <Typography
                        variant="overline"
                        sx={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            fontWeight: 500,
                            letterSpacing: '0.2em',
                            mb: { xs: 3, md: 4 },
                            display: 'block',
                            textTransform: 'uppercase',
                        }}
                    >
                        Events & Announcements
                    </Typography>

                    {/* Main Headline */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: {
                                xs: '3rem',
                                sm: '4rem',
                                md: '5rem',
                                lg: '6rem',
                                xl: '7rem',
                            },
                            fontWeight: 700,
                            lineHeight: { xs: 0.9, md: 0.85 },
                            letterSpacing: '-0.03em',
                            mb: { xs: 4, md: 6 },
                            color: '#1a1a1a',
                            maxWidth: { xs: '100%', lg: '80%' },
                        }}
                    >
                        Stay
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #10b981 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            Informed
                        </Box>
                    </Typography>

                    {/* Large Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: '1.25rem',
                                md: '1.75rem',
                                lg: '2rem',
                            },
                            fontWeight: 400,
                            lineHeight: 1.3,
                            color: 'rgba(0, 0, 0, 0.7)',
                            maxWidth: { xs: '100%', lg: '70%' },
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.5s',
                        }}
                    >
                        Important announcements, exam schedules, and school
                        updates delivered with clarity and timeliness.
                    </Typography>
                </Box>

                {/* Events Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: { xs: 4, md: 6 },
                        mb: { xs: 8, md: 12 },
                    }}
                >
                    {events.map((event, index) => (
                        <Box
                            key={event.id}
                            sx={{
                                position: 'relative',
                                aspectRatio: '4/3',
                                borderRadius: 2,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(50px)',
                                transition:
                                    'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${0.8 + index * 0.2}s`,
                                '&:hover': {
                                    '& .event-image': {
                                        transform: 'scale(1.1)',
                                    },
                                    '& .event-overlay': {
                                        opacity: 1,
                                        transform: 'translateY(0)',
                                    },
                                },
                            }}
                        >
                            {/* Background Image */}
                            <Box
                                className="event-image"
                                component="img"
                                src={event.image}
                                alt={event.title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s ease',
                                }}
                            />

                            {/* Gradient Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '70%',
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                                }}
                            />

                            {/* Content Overlay */}
                            <Box
                                className="event-overlay"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 4,
                                    color: 'white',
                                    opacity: 0.95,
                                    transform: 'translateY(10px)',
                                    transition:
                                        'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                {/* Date Badge */}
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: event.color,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        mb: 1.5,
                                    }}
                                >
                                    {event.date}
                                </Typography>

                                {/* Title */}
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: '1.5rem',
                                            md: '1.75rem',
                                        },
                                        fontWeight: 700,
                                        mb: 2,
                                        lineHeight: 1.2,
                                        color: 'white',
                                    }}
                                >
                                    {event.title}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        lineHeight: 1.5,
                                        opacity: 0.9,
                                        color: 'white',
                                    }}
                                >
                                    {event.description}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
