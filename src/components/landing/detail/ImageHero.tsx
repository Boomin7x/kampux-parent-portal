import React from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { useIntersectionObserver } from '../../../hooks/ui/useIntersectionObserver';

interface ImageHeroProps {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage: string;
    overlayColor?: string;
    overlayOpacity?: number;
    height?: { xs: string; md: string };
    textAlign?: 'left' | 'center' | 'right';
    badge?: string;
    badgeColor?: 'primary' | 'secondary';
    className?: string;
}

export const ImageHero: React.FC<ImageHeroProps> = ({
    title,
    subtitle,
    description,
    backgroundImage,
    overlayColor = '#000000',
    overlayOpacity = 0.4,
    height = { xs: '60vh', md: '70vh' },
    textAlign = 'center',
    badge,
    badgeColor = 'primary',
    className = '',
}) => {
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            ref={targetRef}
            className={className}
            sx={{
                position: 'relative',
                height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 1,
                // Background image
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // Responsive background positioning
                backgroundPosition: {
                    xs: 'center center',
                    md: 'center center',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: overlayColor,
                    opacity: overlayOpacity,
                    transition: 'opacity 0.3s ease-in-out',
                },
                '&:hover::before': {
                    opacity: overlayOpacity * 0.8,
                },
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    color: '#ffffff',
                    textAlign,
                    py: { xs: 4, md: 6 },
                }}
            >
                <Box
                    sx={{
                        opacity: isIntersecting ? 1 : 0,
                        transform: isIntersecting
                            ? 'translateY(0)'
                            : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.2s',
                    }}
                >
                    {badge && (
                        <Chip
                            label={badge}
                            sx={{
                                backgroundColor:
                                    badgeColor === 'primary'
                                        ? 'primary.main'
                                        : 'secondary.main',
                                color: '#ffffff',
                                fontWeight: 600,
                                fontSize: '0.8125rem',
                                mb: 2,
                                opacity: isIntersecting ? 1 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(20px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.1s',
                            }}
                        />
                    )}

                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            fontWeight: 700,
                            lineHeight: 1.2,
                            mb: subtitle ? 1 : 2,
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                            opacity: isIntersecting ? 1 : 0,
                            transform: isIntersecting
                                ? 'translateY(0)'
                                : 'translateY(40px)',
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.3s',
                        }}
                    >
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                fontSize: {
                                    xs: '1.25rem',
                                    sm: '1.5rem',
                                    md: '1.75rem',
                                },
                                fontWeight: 400,
                                mb: 2,
                                // opacity: 0.9,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                                opacity: isIntersecting ? 0.9 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(30px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.4s',
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}

                    {description && (
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                lineHeight: 1.6,
                                maxWidth: '600px',
                                mx: textAlign === 'center' ? 'auto' : 0,
                                // opacity: 0.85,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                                opacity: isIntersecting ? 0.85 : 0,
                                transform: isIntersecting
                                    ? 'translateY(0)'
                                    : 'translateY(20px)',
                                transition:
                                    'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: '0.5s',
                            }}
                        >
                            {description}
                        </Typography>
                    )}
                </Box>
            </Container>
        </Box>
    );
};
