/* eslint-disable react-hooks/set-state-in-effect */
import {
    ArrowBack as ArrowBackIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageSelector } from '../../components/common/LanguageSelector';
import { AuthBackground } from './components/AuthBackground';
import { SignInForm } from './components/SignInForm';

interface LoginPageProps {
    className?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ className = '' }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [successMessage, setSuccessMessage] = useState('');

    // Check for success message from navigation state (e.g., after account creation)
    useEffect(() => {
        const state = location.state as { message?: string } | null;
        if (state?.message) {
            // Clear the state to prevent showing message on subsequent visits
            navigate(location.pathname, { replace: true, state: null });

            // Set success message
            setSuccessMessage(state.message);

            // Clear success message after 5 seconds
            const timer = setTimeout(() => setSuccessMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state, location.pathname, navigate]);

    const handleBackToWebsite = () => {
        navigate('/');
    };

    const handleForgotPassword = () => {
        navigate('/auth/forgot-password');
    };

    const handleSignupMode = () => {
        navigate('/auth/signup');
    };

    return (
        <Box
            className={className}
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fefefe',
                position: 'relative',
            }}
        >
            {/* Back to Website Button */}
            <IconButton
                onClick={handleBackToWebsite}
                sx={{
                    position: 'absolute',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: isMobile ? 'primary.main' : 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                }}
            >
                <ArrowBackIcon />
            </IconButton>

            {/* Language Selector */}
            <Box
                sx={{
                    position: 'absolute',
                    top: { xs: 16, md: 24 },
                    right: { xs: 16, md: 24 },
                    zIndex: 10,
                }}
            >
                <LanguageSelector variant="page" />
            </Box>

            {/* Main Content */}
            <Grid container sx={{ minHeight: '100vh' }}>
                {/* Left Panel - Branding (Hidden on mobile) */}
                {!isMobile && (
                    <Grid size={{ md: 6, lg: 7 }}>
                        <AuthBackground />
                    </Grid>
                )}

                {/* Right Panel - Auth Form */}
                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            height: '100vh',
                            borderRadius: 0,
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            px: { xs: 3, sm: 4, md: 6 },
                            py: { xs: 4, md: 8 },
                        }}
                    >
                        <Container maxWidth="sm">
                            {/* Mobile Logo */}
                            {isMobile && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 4,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SchoolIcon
                                        sx={{
                                            fontSize: 32,
                                            color: 'primary.main',
                                            mr: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'primary.main',
                                        }}
                                    >
                                        Excellence Academy
                                    </Typography>
                                </Box>
                            )}

                            {/* Classic Login Form */}
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        color: 'text.primary',
                                        fontSize: {
                                            xs: '1.75rem',
                                            md: '2.25rem',
                                        },
                                    }}
                                >
                                    Welcome Back!
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Sign in to access your parent portal and
                                    stay connected with your child's educational
                                    journey.
                                </Typography>
                            </Box>

                            {/* Success Alert */}
                            {successMessage && (
                                <Alert
                                    severity="success"
                                    sx={{
                                        mb: 3,
                                        borderRadius: 2,
                                    }}
                                    onClose={() => setSuccessMessage('')}
                                >
                                    {successMessage}
                                </Alert>
                            )}

                            {/* Sign-In Form */}
                            <SignInForm
                                onForgotPassword={handleForgotPassword}
                                onSuccess={() => navigate('/portal')}
                            />

                            {/* Create Account Link */}
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    mt: 4,
                                    pt: 3,
                                    borderTop: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                        mb: 2,
                                    }}
                                >
                                    Don't have an account?{' '}
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={handleSignupMode}
                                        sx={{
                                            p: 0,
                                            minWidth: 'auto',
                                            color: 'primary.main',
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                </Typography>
                            </Box>

                            {/* Footer */}
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                        mb: 2,
                                    }}
                                >
                                    Need help?{' '}
                                    <Button
                                        variant="text"
                                        size="small"
                                        sx={{
                                            p: 0,
                                            minWidth: 'auto',
                                            color: 'primary.main',
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        Contact School Administration
                                    </Button>
                                </Typography>
                            </Box>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
