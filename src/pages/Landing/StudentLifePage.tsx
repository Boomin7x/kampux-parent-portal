import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    SportsBasketball as SportsIcon,
    Brush as ArtsIcon,
    MenuBook as AcademicIcon,
    VolunteerActivism as ServiceIcon,
    EmojiEvents as TrophyIcon,
    Groups as ClubsIcon,
} from '@mui/icons-material';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';
import {
    ActivityCatalog,
    EventCalendar,
} from '../../components/landing/detail';
import type { Activity } from '../../components/landing/detail/ActivityCatalog';

export const StudentLifePage: React.FC = () => {
    const { isIntersecting: heroIntersecting, targetRef: heroRef } =
        useIntersectionObserver({
            threshold: 0.1,
            freezeOnceVisible: true,
        });

    const activities: Activity[] = [
        {
            id: '1',
            name: 'Basketball Team',
            category: 'Sports',
            description:
                'Competitive varsity and JV teams with professional coaching. Multiple league championships.',
            icon: <SportsIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Mon-Fri, 3:30-5:30 PM',
            memberCount: 28,
        },
        {
            id: '2',
            name: 'Drama Club',
            category: 'Arts',
            description:
                'Annual theatrical productions, improv workshops, and performance opportunities throughout the year.',
            icon: <ArtsIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Tue & Thu, 3:00-5:00 PM',
            memberCount: 35,
        },
        {
            id: '3',
            name: 'Debate Team',
            category: 'Academic',
            description:
                'Compete in regional and national tournaments while developing critical thinking and public speaking skills.',
            icon: <AcademicIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Wed & Fri, 3:30-5:00 PM',
            memberCount: 22,
        },
        {
            id: '4',
            name: 'Community Service Club',
            category: 'Service',
            description:
                'Organize volunteer projects and service initiatives benefiting local and global communities.',
            icon: <ServiceIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Thursdays, 3:00-4:30 PM',
            memberCount: 45,
        },
        {
            id: '5',
            name: 'Art Studio',
            category: 'Arts',
            description:
                'Explore various art mediums including painting, sculpture, and digital art. Curate annual student exhibition.',
            icon: <ArtsIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Open Studio: Daily 3:00-6:00 PM',
            memberCount: 30,
        },
        {
            id: '6',
            name: 'Soccer Club',
            category: 'Sports',
            description:
                'Both competitive and recreational soccer programs for all skill levels.',
            icon: <SportsIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Mon, Wed, Fri 3:30-5:00 PM',
            memberCount: 32,
        },
        {
            id: '7',
            name: 'Robotics Team',
            category: 'Academic',
            description:
                'Design, build, and program robots for FIRST Robotics competitions. State champions 2023.',
            icon: <TrophyIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Daily, 3:30-6:00 PM',
            memberCount: 18,
        },
        {
            id: '8',
            name: 'Environmental Club',
            category: 'Service',
            description:
                'Campus sustainability initiatives, environmental awareness campaigns, and outdoor conservation projects.',
            icon: <ServiceIcon sx={{ fontSize: 24 }} />,
            meetingSchedule: 'Tuesdays, 3:30-4:30 PM',
            memberCount: 27,
        },
    ];

    const upcomingEvents = [
        {
            id: '1',
            title: 'Spring Musical Performance',
            date: '2024-03-15',
            time: '7:00 PM',
            location: 'Main Auditorium',
        },
        {
            id: '2',
            title: 'Science Fair',
            date: '2024-03-20',
            time: '9:00 AM - 3:00 PM',
            location: 'Gymnasium',
        },
        {
            id: '3',
            title: 'Career Day',
            date: '2024-03-25',
            time: '10:00 AM - 2:00 PM',
            location: 'Campus Wide',
        },
        {
            id: '4',
            title: 'Basketball Championship Game',
            date: '2024-03-28',
            time: '6:00 PM',
            location: 'Home Court',
        },
        {
            id: '5',
            title: 'Art Exhibition Opening',
            date: '2024-04-02',
            time: '5:30 PM',
            location: 'Art Gallery',
        },
        {
            id: '6',
            title: 'Spring Concert',
            date: '2024-04-10',
            time: '7:00 PM',
            location: 'Main Auditorium',
        },
        {
            id: '7',
            title: 'College Fair',
            date: '2024-04-15',
            time: '1:00 PM - 4:00 PM',
            location: 'Gymnasium',
        },
    ];

    return (
        <Box sx={{ backgroundColor: '#fefefe', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                ref={heroRef}
                component="section"
                sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '21/9',
                    minHeight: { xs: '200px', sm: '300px', md: '400px' },
                    backgroundColor: '#171717',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9))',
                        zIndex: 1,
                    }}
                />
                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '1.5rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#ffffff',
                            mb: 2,
                            opacity: heroIntersecting ? 1 : 0,
                            transform: heroIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        Student Life
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            color: '#ffffff',
                            maxWidth: '800px',
                            mx: 'auto',
                            opacity: heroIntersecting ? 1 : 0,
                            transform: heroIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition:
                                'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                        }}
                    >
                        A vibrant community where students discover passions, build
                        friendships, and create lasting memories.
                    </Typography>
                </Container>
            </Box>

            {/* Overview Stats */}
            <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f8fafc',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        color: 'primary.main',
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ClubsIcon sx={{ fontSize: 24 }} />
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    50+
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Clubs & Organizations
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f8fafc',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        color: '#10b981',
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SportsIcon sx={{ fontSize: 24 }} />
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    12
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Varsity Sports
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f8fafc',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        color: '#f59e0b',
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ArtsIcon sx={{ fontSize: 24 }} />
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    8
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Arts Programs
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: '#f8fafc',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        color: '#ef4444',
                                        mb: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ServiceIcon sx={{ fontSize: 24 }} />
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 0.5,
                                    }}
                                >
                                    5000+
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Service Hours/Year
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Activity Catalog */}
            <Box
                component="section"
                sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8fafc' }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '1.5rem' },
                                fontWeight: 600,
                                background:
                                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2,
                            }}
                        >
                            Clubs & Activities
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '0.875rem',
                                color: 'text.secondary',
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            Explore our diverse range of extracurricular activities and
                            find your passion.
                        </Typography>
                    </Box>
                    <ActivityCatalog activities={activities} />
                </Container>
            </Box>

            {/* Events and Calendar */}
            <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.5rem', md: '1.5rem' },
                                        fontWeight: 600,
                                        background:
                                            'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 2,
                                    }}
                                >
                                    Daily Schedule
                                </Typography>
                                <Box
                                    sx={{
                                        p: 3,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2,
                                        }}
                                    >
                                        {[
                                            {
                                                time: '7:45 - 8:00 AM',
                                                activity: 'Morning Assembly',
                                            },
                                            {
                                                time: '8:00 - 11:30 AM',
                                                activity: 'Morning Classes',
                                            },
                                            {
                                                time: '11:30 AM - 12:15 PM',
                                                activity: 'Lunch Break',
                                            },
                                            {
                                                time: '12:15 - 3:00 PM',
                                                activity: 'Afternoon Classes',
                                            },
                                            {
                                                time: '3:00 - 6:00 PM',
                                                activity:
                                                    'Extracurricular Activities',
                                            },
                                        ].map((item, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    pb: 2,
                                                    borderBottom:
                                                        index < 4
                                                            ? '1px solid'
                                                            : 'none',
                                                    borderColor: 'divider',
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        color: 'primary.main',
                                                        minWidth: '140px',
                                                    }}
                                                >
                                                    {item.time}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.8125rem',
                                                        color: 'text.primary',
                                                    }}
                                                >
                                                    {item.activity}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <EventCalendar
                                events={upcomingEvents}
                                onViewAll={() => console.log('View all events')}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};
