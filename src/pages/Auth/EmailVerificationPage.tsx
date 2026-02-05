/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthFlow } from '../../hooks/useAuthFlow';
import { AuthBackground } from './components/AuthBackground';
import { EmailVerificationStep } from './components/EmailVerificationStep';

interface EmailVerificationPageProps {
    className?: string;
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({
    className = '',
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [searchParams] = useSearchParams();

    const { state, actions } = useAuthFlow();

    const handleBackToWebsite = () => {
        navigate('/');
    };

    const handleEmailVerification = async (data: { code?: string }) => {
        const token = searchParams.get('token');

        try {
            await actions.handleEmailVerification({
                token: token as string,
                ...data,
            });
            // On success, the hook will redirect to portal
        } catch (_e) {
            // Error is handled by the hook
        }
    };

    // Get email from URL params, state, or local storage
    const email =
        searchParams.get('email') ||
        state.email ||
        (localStorage.getItem('pendingUser')
            ? JSON.parse(localStorage.getItem('pendingUser')!).email
            : '');

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

                            {/* Email Verification Content */}
                            <EmailVerificationStep
                                onVerifyEmail={handleEmailVerification}
                                onResendVerification={
                                    actions.resendEmailVerification
                                }
                                email={email}
                                isLoading={state.isLoading}
                                error={state.error}
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
                                    Wrong email address?{' '}
                                    <Button
                                        variant="text"
                                        size="small"
                                        onClick={() => navigate('/auth/signup')}
                                        sx={{
                                            p: 0,
                                            minWidth: 'auto',
                                            color: 'primary.main',
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Sign Up Again
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

export default EmailVerificationPage;
