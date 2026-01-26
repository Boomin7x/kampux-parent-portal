import {
    Palette as ArtIcon,
    Groups as ClubsIcon,
    Science as ScienceIcon,
    Sports as SportsIcon,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Activity interface
interface Activity {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    participants: string;
    achievements: string[];
    image?: string;
}

// Student Life Section props
interface StudentLifeSectionProps {
    className?: string;
}

// Featured activities data
const featuredActivities: Activity[] = [
    {
        id: 'athletics',
        title: 'Athletic Excellence',
        description:
            'Competitive sports programs that build character, develop teamwork, and foster physical wellness while creating champions on and off the field.',
        icon: <SportsIcon />,
        color: '#ef4444',
        participants: '400+ Students',
        achievements: [
            'State Championships',
            'Regional Titles',
            'College Scholarships',
        ],
        image: '/pexels-cics-uma-ipn-238541486-12238968.jpg',
    },
    {
        id: 'creative-arts',
        title: 'Creative Arts',
        description:
            'Comprehensive arts programs including theater, music, and visual arts that nurture creative expression and artistic excellence.',
        icon: <ArtIcon />,
        color: '#ec4899',
        participants: '350+ Students',
        achievements: [
            'Award-Winning Productions',
            'Art Exhibitions',
            'Music Festivals',
        ],
        image: '/raymond-yeung-uwhDZbX-sz8-unsplash.jpg',
    },
    {
        id: 'stem-innovation',
        title: 'STEM Innovation',
        description:
            "Cutting-edge science, technology, and robotics programs that prepare students for tomorrow's challenges through hands-on learning.",
        icon: <ScienceIcon />,
        color: '#10b981',
        participants: '280+ Students',
        achievements: [
            'National Competitions',
            'Innovation Awards',
            'Research Publications',
        ],
        image: '/patrick-amoy-6DfEbkqsTiA-unsplash.jpg',
    },
    {
        id: 'leadership',
        title: 'Leadership Development',
        description:
            'Student government, debate teams, and community service programs that cultivate the next generation of ethical leaders.',
        icon: <ClubsIcon />,
        color: '#6366f1',
        participants: '200+ Students',
        achievements: [
            'Student Government',
            'Community Impact',
            'Leadership Awards',
        ],
        image: '/azzedine-rouichi-KDM09YR4_bY-unsplash.jpg',
    },
];

// Main Student Life Section component
export const StudentLifeSection: React.FC<StudentLifeSectionProps> = ({
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="student-life"
            component="section"
            className={className}
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
                        mb: { xs: 12, md: 16 },
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
                        Student Life
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
                        Beyond the
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            Classroom
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
                        Rich extracurricular programs that develop character,
                        creativity, and leadership for life.
                    </Typography>
                </Box>

                {/* Featured Activities Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            lg: 'repeat(2, 1fr)',
                        },
                        gap: { xs: 8, lg: 12 },
                        mb: { xs: 12, md: 16 },
                    }}
                >
                    {featuredActivities.map((activity, index) => (
                        <Box
                            key={activity.id}
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(50px)',
                                transition:
                                    'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${0.8 + index * 0.2}s`,
                            }}
                        >
                            {/* Activity Image */}
                            <Box
                                sx={{
                                    aspectRatio: '16/10',
                                    backgroundImage: `url("${activity.image}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                    mb: 4,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '50%',
                                        background: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)`,
                                        borderRadius: 2,
                                    },
                                }}
                            >
                                {/* Icon Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        background: `rgba(255, 255, 255, 0.15)`,
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 2,
                                        '& svg': {
                                            fontSize: '1.5rem',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {activity.icon}
                                </Box>
                            </Box>

                            {/* Activity Info */}
                            <Box>
                                {/* Participants Badge */}
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: activity.color,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        mb: 2,
                                    }}
                                >
                                    {activity.participants}
                                </Typography>

                                {/* Title */}
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        mb: 3,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {activity.title}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: '1rem',
                                            md: '1.125rem',
                                        },
                                        lineHeight: 1.6,
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        mb: 4,
                                    }}
                                >
                                    {activity.description}
                                </Typography>

                                {/* Achievements */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: 'rgba(0, 0, 0, 0.6)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            mb: 1,
                                        }}
                                    >
                                        Notable Achievements
                                    </Typography>
                                    {activity.achievements.map(
                                        (achievement, idx) => (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        backgroundColor:
                                                            activity.color,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        color: 'rgba(0, 0, 0, 0.8)',
                                                    }}
                                                >
                                                    {achievement}
                                                </Typography>
                                            </Box>
                                        )
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Student Life Stats */}
                <Box
                    sx={{
                        textAlign: 'center',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '1.6s',
                    }}
                >
                    {/* Stats Header */}
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                            fontWeight: 700,
                            mb: 8,
                            color: '#1a1a1a',
                            lineHeight: 1.1,
                        }}
                    >
                        Engagement & Impact
                    </Typography>

                    {/* Stats Grid */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
                            },
                            gap: { xs: 6, md: 8 },
                            maxWidth: '1000px',
                            mx: 'auto',
                        }}
                    >
                        {[
                            {
                                number: '45+',
                                label: 'Clubs &\nActivities',
                                description: 'Something for everyone',
                            },
                            {
                                number: '1200+',
                                label: 'Active\nParticipants',
                                description: 'Engaged students',
                            },
                            {
                                number: '95%',
                                label: 'Student\nParticipation',
                                description: 'School-wide involvement',
                            },
                            {
                                number: '150+',
                                label: 'Annual\nEvents',
                                description: 'Year-round activities',
                            },
                        ].map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    opacity: isIntersecting ? 1 : 0,
                                    transform: isIntersecting
                                        ? 'scale(1)'
                                        : 'scale(0.8)',
                                    transition:
                                        'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transitionDelay: `${1.8 + index * 0.1}s`,
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: {
                                            xs: '2.5rem',
                                            md: '3.5rem',
                                        },
                                        fontWeight: 700,
                                        color: '#ec4899',
                                        mb: 2,
                                        lineHeight: 1,
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: '0.875rem',
                                            md: '1rem',
                                        },
                                        fontWeight: 600,
                                        color: '#1a1a1a',
                                        mb: 1,
                                        lineHeight: 1.3,
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {stat.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Inspirational Quote */}
                    <Box
                        sx={{
                            mt: 12,
                            py: 8,
                            maxWidth: '800px',
                            mx: 'auto',
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '2.2s',
                        }}
                    >
                        <Box
                            sx={{
                                width: 60,
                                height: 1,
                                backgroundColor: '#ec4899',
                                mx: 'auto',
                                mb: 6,
                                opacity: 0.6,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontStyle: 'italic',
                                color: 'rgba(0, 0, 0, 0.8)',
                                lineHeight: 1.6,
                                mb: 4,
                                fontWeight: 300,
                            }}
                        >
                            "Student life at Excellence Academy isn't just about
                            activities—it's about discovering passions, building
                            confidence, and creating memories that last a
                            lifetime."
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: '#ec4899',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            Student Experience Philosophy
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
