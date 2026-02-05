import {
    ArrowBack as ArrowBackIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import {
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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthBackground } from './components/AuthBackground';
import { SignUpForm } from './components/SignUpForm';

interface SignupPageProps {
    className?: string;
}

const SignupPage: React.FC<SignupPageProps> = ({ className = '' }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // const { state, actions } = useAuthFlow();

    const handleBackToWebsite = () => {
        navigate('/');
    };

    const handleBackToLogin = () => {
        navigate('/auth');
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

                            {/* Header */}
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
                                    Create Your Account
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Join our parent portal to stay connected
                                    with your child's educational journey.
                                </Typography>
                            </Box>

                            {/* Sign-Up Form */}
                            <SignUpForm
                                onSuccess={userData => {
                                    // Navigate to email verification with user data
                                    navigate(
                                        `/auth/verify-email?email=${encodeURIComponent(userData.email)}`
                                    );
                                }}
                            />

                            {/* Footer */}
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    Already have an account?{' '}
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={handleBackToLogin}
                                        sx={{
                                            p: 0,
                                            minWidth: 'auto',
                                            color: 'primary.main',
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Typography>
                            </Box>

                            {/* Help Footer */}
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
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

export default SignupPage;
