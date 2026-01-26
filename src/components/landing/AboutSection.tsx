import { Box, Typography } from '@mui/material';
import React from 'react';
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// About Section props
interface AboutSectionProps {
    className?: string;
}

// Main About Section component
export const AboutSection: React.FC<AboutSectionProps> = ({
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="about"
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
                {/* Section Header with Large Typography */}
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
                        About Excellence Academy
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
                        Shaping
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background:
                                    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 300,
                            }}
                        >
                            Excellence
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
                        Empowering students through innovative education and
                        dedicated mentorship.
                    </Typography>
                </Box>

                {/* Main Content Grid - Images + Text */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1fr 1.2fr' },
                        gap: { xs: 8, lg: 16 },
                        alignItems: 'start',
                        mb: { xs: 12, md: 16 },
                    }}
                >
                    {/* Left Side - Images and Small Stats */}
                    <Box
                        sx={{
                            position: 'relative',
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateX(0)'
                                : 'translateX(-30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.8s',
                        }}
                    >
                        {/* Image Grid */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 3,
                                mb: 6,
                            }}
                        >
                            {/* Large Image */}
                            <Box
                                sx={{
                                    gridColumn: '1 / -1',
                                    aspectRatio: '16/10',
                                    backgroundImage:
                                        'url("/pexels-rdne-8500421.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                }}
                            />

                            {/* Two smaller images */}
                            <Box
                                sx={{
                                    aspectRatio: '4/3',
                                    backgroundImage:
                                        'url("/shraga-kopstein-eUa90rsmjIs-unsplash.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                }}
                            />
                            <Box
                                sx={{
                                    aspectRatio: '4/3',
                                    backgroundImage:
                                        'url("/joydeep-sensarma-utyOEK4GwDM-unsplash.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                }}
                            />
                        </Box>

                        {/* Elegant Typography Element */}
                        <Box
                            sx={{
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(20px)',
                                transition:
                                    'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '1.2s',
                                textAlign: 'center',
                                py: 4,
                            }}
                        >
                            <Typography
                                variant="overline"
                                sx={{
                                    display: 'block',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.2em',
                                    color: 'rgba(0, 0, 0, 0.4)',
                                    textTransform: 'uppercase',
                                    mb: 2,
                                }}
                            >
                                Established 1985
                            </Typography>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 1,
                                    backgroundColor: '#6366f1',
                                    mx: 'auto',
                                    mb: 2,
                                    opacity: 0.6,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    fontStyle: 'italic',
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    lineHeight: 1.6,
                                    maxWidth: '280px',
                                    mx: 'auto',
                                }}
                            >
                                "Excellence is not a skill, it's an attitude
                                that shapes every moment of learning."
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right Side - Mission & Values Combined */}
                    <Box
                        sx={{
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateX(0)'
                                : 'translateX(30px)',
                            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '1s',
                            pl: { lg: 4 },
                        }}
                    >
                        {/* Our Story Header */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    md: '2.5rem',
                                    lg: '3rem',
                                },
                                fontWeight: 700,
                                mb: { xs: 4, md: 6 },
                                color: '#1a1a1a',
                                lineHeight: 1.1,
                            }}
                        >
                            Our Story
                        </Typography>

                        {/* Mission Content */}
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                lineHeight: 1.7,
                                color: 'rgba(0, 0, 0, 0.7)',
                                mb: 6,
                                fontWeight: 400,
                            }}
                        >
                            Excellence Academy is dedicated to providing a
                            comprehensive, challenging, and supportive
                            educational experience. We foster critical thinking,
                            creativity, and character development while
                            maintaining the highest academic standards.
                        </Typography>

                        {/* Values as Clean List */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 600,
                                mb: 4,
                                color: '#1a1a1a',
                            }}
                        >
                            What Drives Us
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2.5,
                            }}
                        >
                            {[
                                'Academic Excellence & Innovation',
                                'Character Development & Integrity',
                                'Community Collaboration & Support',
                                'Individual Growth & Achievement',
                            ].map((value, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 3,
                                        opacity: isIntersecting ? 1 : 0,
                                        transform: isIntersecting
                                            ? 'translateX(0)'
                                            : 'translateX(20px)',
                                        transition:
                                            'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transitionDelay: `${1.4 + index * 0.1}s`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 4,
                                            height: 4,
                                            borderRadius: '50%',
                                            backgroundColor: '#6366f1',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: {
                                                xs: '0.95rem',
                                                md: '1rem',
                                            },
                                            lineHeight: 1.5,
                                            color: 'rgba(0, 0, 0, 0.8)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
