import {
    Groups as CommunityIcon,
    TrendingUp as GrowthIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

// Auth Background props
interface AuthBackgroundProps {
    className?: string;
}

// Background images for rotation
const backgroundImages = [
    '/pexels-rdne-7092339.jpg',
    '/pexels-katerina-holmes-5905554.jpg',
    '/pexels-rdne-7092613.jpg',
    '/pexels-kampus-8629106.jpg',
];

// Feature highlights for the background panel
const features = [
    {
        icon: <SchoolIcon />,
        title: 'Academic Excellence',
        description: 'Track grades, assignments, and progress',
    },
    {
        icon: <GrowthIcon />,
        title: 'Real-time Updates',
        description: 'Stay informed with instant notifications',
    },
    {
        icon: <CommunityIcon />,
        title: 'School Community',
        description: 'Connect with teachers and staff',
    },
];

// Main AuthBackground component
export const AuthBackground: React.FC<AuthBackgroundProps> = ({
    className = '',
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        backgroundImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);

            // Calculate next image
            const next = (currentImageIndex + 1) % backgroundImages.length;
            setNextImageIndex(next);

            // After transition completes, swap indices
            setTimeout(() => {
                setCurrentImageIndex(next);
                setIsTransitioning(false);
            }, 1500); // Match this with CSS transition duration
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImageIndex]);

    return (
        <Box
            className={className}
            sx={{
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Image Layer */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    // transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
                    opacity: isTransitioning ? 0.7 : 1,
                    transition: 'all 1s ease-out',
                    zIndex: 1,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('${backgroundImages[nextImageIndex]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1,
                    opacity: isTransitioning ? 1 : 0,
                    // transform: isTransitioning ? 'scale(1)' : 'scale(1.1)',
                    transition: 'opacity 1s ease-in',
                }}
            />

            {/* Gradient Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.4) 100%)',
                    zIndex: 2,
                }}
            />

            {/* Content Layer */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 3,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    px: 6,
                    color: 'white',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
                        `,
                    },
                    '@keyframes float': {
                        '0%, 100%': {
                            transform: 'translateY(0px) rotate(0deg)',
                        },
                        '50%': {
                            transform: 'translateY(-10px) rotate(1deg)',
                        },
                    },
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 4, maxWidth: 480 }}>
                    {/* Logo and Brand */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 3,
                            }}
                        >
                            <SchoolIcon sx={{ fontSize: 24, color: 'white' }} />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1.25rem',
                            }}
                        >
                            Excellence Academy
                        </Typography>
                    </Box>

                    {/* Main Headline */}
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '2.25rem', lg: '2.75rem' },
                            lineHeight: 1.2,
                            mb: 3,
                            background:
                                'linear-gradient(135deg, #ffffff, #e0e7ff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Connect. Track. Engage.
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.125rem',
                            lineHeight: 1.6,
                            mb: 6,
                            opacity: 0.9,
                            maxWidth: 400,
                        }}
                    >
                        Your gateway to staying connected with your child's
                        educational journey. Access real-time updates,
                        communicate with teachers, and support your student's
                        success.
                    </Typography>

                    {/* Feature List */}
                    <Box sx={{ space: 3 }}>
                        {features.map((feature, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    mb: 3,
                                    opacity: 0.95,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 3,
                                        mt: 0.5,
                                    }}
                                >
                                    {React.cloneElement(feature.icon, {
                                        sx: { fontSize: 20, color: 'white' },
                                    })}
                                </Box>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 0.5,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: '0.875rem',
                                            opacity: 0.8,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* Trust Indicators */}
                    <Box
                        sx={{
                            mt: 6,
                            pt: 4,
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.75rem',
                                opacity: 0.7,
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                fontWeight: 500,
                            }}
                        >
                            Trusted by 1,250+ Families
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Decorative Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '-5%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    animation: 'float 25s ease-in-out infinite reverse',
                    zIndex: 2,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    animation: 'float 30s ease-in-out infinite',
                    zIndex: 2,
                }}
            />
        </Box>
    );
};
