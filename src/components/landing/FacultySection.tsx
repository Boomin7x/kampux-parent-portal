import { Box, Typography } from '@mui/material';
import React from 'react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Faculty member interface
interface FacultyMember {
    id: string;
    name: string;
    title: string;
    department: string;
    specialization: string;
    bio: string;
    image?: string;
}

// Faculty Section props
interface FacultySectionProps {
    className?: string;
}

// Featured faculty data
const featuredFaculty: FacultyMember[] = [
    {
        id: '1',
        name: 'Dr. Sarah Mitchell',
        title: 'Principal & Educational Leader',
        department: 'Administration',
        specialization: 'Educational Excellence & Innovation',
        bio: 'Leading Excellence Academy with 25+ years of educational expertise, championing student-centered learning and academic innovation.',
        image: '/pexels-cottonbro-7395304.jpg',
    },
    {
        id: '2',
        name: 'Prof. Michael Chen',
        title: 'STEM Department Head',
        department: 'Science & Mathematics',
        specialization: 'Advanced Physics & Research Methods',
        bio: 'Inspiring the next generation of scientists through hands-on research and innovative STEM curricula that bridge theory and practice.',
        image: '/pexels-matazumultimedia-32951018.jpg',
    },
    {
        id: '3',
        name: 'Ms. Elena Rodriguez',
        title: 'Arts & Literature Director',
        department: 'Humanities & Fine Arts',
        specialization: 'Creative Writing & Visual Arts',
        bio: 'Fostering creativity and critical thinking through integrated arts education that develops both artistic expression and analytical skills.',
        image: '/pexels-katerina-holmes-5905899.jpg',
    },
];

// Main Faculty Section component
export const FacultySection: React.FC<FacultySectionProps> = ({
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="faculty"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                position: 'relative',
                py: { xs: 12, md: 20 },
                backgroundColor: '#f8fafc',
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
                        Meet Our Faculty
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
                        Inspiring
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #f59e0b 0%, #16a34a 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            Educators
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
                        World-class educators dedicated to nurturing minds and
                        shaping tomorrow's leaders.
                    </Typography>
                </Box>

                {/* Faculty Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            lg: 'repeat(3, 1fr)',
                        },
                        gap: { xs: 8, lg: 8 },
                        mb: { xs: 12, md: 16 },
                    }}
                >
                    {featuredFaculty.map((faculty, index) => (
                        <Box
                            key={faculty.id}
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
                            {/* Faculty Image */}
                            <Box
                                sx={{
                                    aspectRatio: '3/4',
                                    backgroundImage: `url("${faculty.image}")`,
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
                                        height: '40%',
                                        background:
                                            'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%)',
                                        borderRadius: 2,
                                    },
                                }}
                            />

                            {/* Faculty Info */}
                            <Box>
                                {/* Department Badge */}
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: '#f59e0b',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        mb: 2,
                                    }}
                                >
                                    {faculty.department}
                                </Typography>

                                {/* Name */}
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: '1.5rem',
                                            md: '1.75rem',
                                        },
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        mb: 1,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {faculty.name}
                                </Typography>

                                {/* Title */}
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: 'rgba(0, 0, 0, 0.8)',
                                        mb: 2,
                                    }}
                                >
                                    {faculty.title}
                                </Typography>

                                {/* Specialization */}
                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: '#16a34a',
                                        mb: 3,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {faculty.specialization}
                                </Typography>

                                {/* Bio */}
                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6,
                                        color: 'rgba(0, 0, 0, 0.7)',
                                    }}
                                >
                                    {faculty.bio}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Faculty Excellence Stats */}
                <Box
                    sx={{
                        textAlign: 'center',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '1.4s',
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
                        Excellence in Education
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
                                number: '85+',
                                label: 'Expert\nEducators',
                                description: 'Qualified professionals',
                            },
                            {
                                number: '95%',
                                label: 'Advanced\nDegrees',
                                description: "Master's or higher",
                            },
                            {
                                number: '12:1',
                                label: 'Student\nRatio',
                                description: 'Personalized attention',
                            },
                            {
                                number: '25+',
                                label: 'Years\nExperience',
                                description: 'Average tenure',
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
                                    transitionDelay: `${1.6 + index * 0.1}s`,
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
                                        color: '#f59e0b',
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
                            transitionDelay: '2s',
                        }}
                    >
                        <Box
                            sx={{
                                width: 60,
                                height: 1,
                                backgroundColor: '#f59e0b',
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
                            "Excellence is never an accident. It is always the
                            result of high intention, sincere effort, and
                            skilled execution."
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: '#f59e0b',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            Our Faculty Philosophy
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
