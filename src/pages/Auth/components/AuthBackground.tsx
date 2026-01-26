import {
    Groups as CommunityIcon,
    TrendingUp as GrowthIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

// Auth Background props
interface AuthBackgroundProps {
    className?: string;
}

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
    return (
        <Box
            className={className}
            sx={{
                height: '100vh',
                background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6366f1 100%)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                px: 6,
                color: 'white',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
                    `,
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
                    opacity: 0.3,
                    animation: 'float 20s ease-in-out infinite',
                },
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
            <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 480 }}>
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
                        background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
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
                    educational journey. Access real-time updates, communicate
                    with teachers, and support your student's success.
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
                }}
            />{' '}
        </Box>
    );
};
