import {
    Restaurant as CafeteriaIcon,
    FitnessCenter as GymIcon,
    Science as LabIcon,
    LocalLibrary as LibraryIcon,
    Security as SecurityIcon,
    Computer as TechIcon,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// Facility interface
interface Facility {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    features: string[];
    capacity?: string;
    image?: string;
    stats?: { label: string; value: string }[];
}

// Facilities Section props
interface FacilitiesSectionProps {
    className?: string;
}

// Featured facilities data
const featuredFacilities: Facility[] = [
    {
        id: 'science-labs',
        title: 'Science Laboratories',
        description:
            'State-of-the-art laboratories equipped with cutting-edge technology for hands-on scientific exploration and research.',
        icon: <LabIcon />,
        color: '#10b981',
        capacity: '30 students per lab',
        image: '/pexels-cottonbro-6208926.jpg',
        features: [
            'Advanced Chemistry Lab',
            'Biology Research Center',
            'Physics Laboratory',
            'Digital Equipment',
        ],
        stats: [
            { label: 'Lab Stations', value: '120+' },
            { label: 'Research Projects', value: '45+' },
        ],
    },
    {
        id: 'library',
        title: 'Modern Library',
        description:
            'Comprehensive learning hub with extensive digital resources, collaborative spaces, and quiet study areas.',
        icon: <LibraryIcon />,
        color: '#8b5cf6',
        capacity: '150+ study spaces',
        image: '/pexels-yaroslav-shuraev-6281132.jpg',
        features: [
            'Digital Resources',
            'Private Study Rooms',
            'Collaborative Spaces',
            'Research Support',
        ],
        stats: [
            { label: 'Books & Resources', value: '25,000+' },
            { label: 'Digital Databases', value: '50+' },
        ],
    },
    {
        id: 'technology-center',
        title: 'Technology Center',
        description:
            'Cutting-edge computer labs and innovation spaces supporting coding, design, and emerging technologies.',
        icon: <TechIcon />,
        color: '#6366f1',
        capacity: '40 workstations',
        image: '/pexels-dothanhyb-5530484.jpg',
        features: [
            'High-Performance Computers',
            'Software Development Labs',
            '3D Printing',
            'VR/AR Equipment',
        ],
        stats: [
            { label: 'Workstations', value: '120+' },
            { label: 'Software Licenses', value: '200+' },
        ],
    },
    {
        id: 'athletic-complex',
        title: 'Athletic Complex',
        description:
            'Multi-purpose sports facilities designed to promote physical fitness, teamwork, and competitive excellence.',
        icon: <GymIcon />,
        color: '#ef4444',
        capacity: '500+ spectators',
        image: '/pexels-boomheadshot-31785121.jpg',
        features: [
            'Full Basketball Courts',
            'Fitness Center',
            'Training Facilities',
            'Locker Rooms',
        ],
        stats: [
            { label: 'Sports Offered', value: '18+' },
            { label: 'Training Equipment', value: '150+' },
        ],
    },
    {
        id: 'dining-hall',
        title: 'Dining Hall',
        description:
            'Nutritious dining program featuring fresh, locally-sourced meals in a welcoming environment.',
        icon: <CafeteriaIcon />,
        color: '#f59e0b',
        capacity: '400+ seats',
        image: '/pexels-kampus-8629106.jpg',
        features: [
            'Fresh Daily Meals',
            'Healthy Options',
            'Allergy-Friendly Menu',
            'Local Sourcing',
        ],
        stats: [
            { label: 'Daily Meals', value: '1,200+' },
            { label: 'Menu Varieties', value: '50+' },
        ],
    },
    {
        id: 'campus-security',
        title: 'Campus Security',
        description:
            'Comprehensive safety and security systems ensuring a secure, nurturing learning environment.',
        icon: <SecurityIcon />,
        color: '#dc2626',
        image: '/pexels-rdne-8500421.jpg',
        features: [
            '24/7 Monitoring',
            'Secure Access Control',
            'Emergency Response',
            'Safety Training',
        ],
        stats: [
            { label: 'Security Personnel', value: '12+' },
            { label: 'Camera Coverage', value: '100%' },
        ],
    },
];

// Main Facilities Section component
export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="facilities"
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
                        Campus Facilities
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
                        World-Class
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            Environment
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
                        Modern infrastructure designed to inspire learning and
                        support student success.
                    </Typography>
                </Box>

                {/* Featured Facilities Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        },
                        gap: { xs: 8, lg: 10 },
                        mb: { xs: 12, md: 16 },
                    }}
                >
                    {featuredFacilities.map((facility, index) => (
                        <Box
                            key={facility.id}
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(50px)',
                                transition:
                                    'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${0.8 + index * 0.15}s`,
                            }}
                        >
                            {/* Facility Image */}
                            <Box
                                sx={{
                                    aspectRatio: '4/3',
                                    backgroundImage: `url("${facility.image}")`,
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
                                        background: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%)`,
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
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        background: facility.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 2,
                                        '& svg': {
                                            fontSize: '1.25rem',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {facility.icon}
                                </Box>
                            </Box>

                            {/* Facility Info */}
                            <Box>
                                {/* Capacity Badge */}
                                <Typography
                                    sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: facility.color,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        mb: 2,
                                    }}
                                >
                                    {facility.capacity}
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
                                        color: '#1a1a1a',
                                        mb: 2,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {facility.title}
                                </Typography>

                                {/* Description */}
                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        lineHeight: 1.6,
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        mb: 3,
                                    }}
                                >
                                    {facility.description}
                                </Typography>

                                {/* Features */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.75,
                                        mb: 3,
                                    }}
                                >
                                    {facility.features
                                        .slice(0, 3)
                                        .map((feature, idx) => (
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
                                                        width: 4,
                                                        height: 4,
                                                        borderRadius: '50%',
                                                        backgroundColor:
                                                            facility.color,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.8125rem',
                                                        fontWeight: 500,
                                                        color: 'rgba(0, 0, 0, 0.8)',
                                                    }}
                                                >
                                                    {feature}
                                                </Typography>
                                            </Box>
                                        ))}
                                </Box>

                                {/* Stats */}
                                {facility.stats && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 4,
                                        }}
                                    >
                                        {facility.stats.map((stat, idx) => (
                                            <Box key={idx}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: 700,
                                                        color: facility.color,
                                                        mb: 0.5,
                                                        lineHeight: 1,
                                                    }}
                                                >
                                                    {stat.value}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 500,
                                                        color: 'rgba(0, 0, 0, 0.6)',
                                                        textTransform:
                                                            'uppercase',
                                                        letterSpacing: '0.05em',
                                                    }}
                                                >
                                                    {stat.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Campus Excellence Stats */}
                <Box
                    sx={{
                        textAlign: 'center',
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '1.8s',
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
                        Infrastructure Excellence
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
                                number: '15+',
                                label: 'Specialized\nFacilities',
                                description: 'Learning spaces',
                            },
                            {
                                number: '50,000',
                                label: 'Square Feet\nCampus',
                                description: 'Modern infrastructure',
                            },
                            {
                                number: '24/7',
                                label: 'Campus\nSecurity',
                                description: 'Safe environment',
                            },
                            {
                                number: '100%',
                                label: 'Technology\nIntegration',
                                description: 'Digital learning',
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
                                    transitionDelay: `${2 + index * 0.1}s`,
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
                                        color: '#10b981',
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

                    {/* Campus Tour CTA */}
                    <Box
                        sx={{
                            mt: 12,
                            py: 8,
                            maxWidth: '600px',
                            mx: 'auto',
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '2.4s',
                        }}
                    >
                        <Box
                            sx={{
                                width: 60,
                                height: 1,
                                backgroundColor: '#10b981',
                                mx: 'auto',
                                mb: 6,
                                opacity: 0.6,
                            }}
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '1.75rem' },
                                fontWeight: 700,
                                color: '#1a1a1a',
                                mb: 4,
                                lineHeight: 1.3,
                            }}
                        >
                            Experience Our Campus
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                lineHeight: 1.6,
                                color: 'rgba(0, 0, 0, 0.7)',
                                mb: 6,
                            }}
                        >
                            Schedule a personalized tour to see our world-class
                            facilities and experience the Excellence Academy
                            difference firsthand.
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 3,
                                px: 4,
                                py: 2,
                                borderRadius: 2,
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                cursor: 'pointer',
                                transition:
                                    'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    borderColor: '#10b981',
                                    background: 'rgba(16, 185, 129, 0.05)',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: '#10b981',
                                }}
                            >
                                Schedule Campus Tour
                            </Typography>
                            <Box
                                sx={{
                                    width: 30,
                                    height: 1,
                                    backgroundColor: '#10b981',
                                    transition: 'width 0.3s ease',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
