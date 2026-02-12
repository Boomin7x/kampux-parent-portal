import {
    ArrowBack as ArrowBackIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Container,
    Grid,
    IconButton,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ILanguage } from './_model/authModel';
import { AuthBackground } from './components/AuthBackground';
import { EmailRegistrationStep } from './components/EmailRegistrationStep';
import { OTPAccountStep } from './components/OTPAccountStep';

const steps = ['Enter Email', 'Verify & Create Account'];

export const CreateAccountPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Data passed between steps
    const [stepData, setStepData] = useState<{
        token: string;
        email: string;
        language: ILanguage;
        tenantAlias: string;
    }>({
        token: '',
        email: '',
        language: 'en-US' as ILanguage,
        tenantAlias: '',
    });

    const handleEmailStepSuccess = (
        token: string,
        email: string,
        language: ILanguage,
        tenantAlias: string
    ) => {
        setStepData({ token, email, language, tenantAlias });
        setActiveStep(1);
        setError('');
        setSuccess(
            'Verification code sent successfully! Please check your email.'
        );

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
    };

    const handleAccountCreationSuccess = () => {
        setSuccess('Account created successfully! Redirecting to login...');
        setError('');

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            navigate('/auth/login', {
                state: {
                    message:
                        'Account created successfully! Please sign in with your credentials.',
                },
            });
        }, 2000);
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
        setSuccess('');
    };

    const handleBackToEmailStep = () => {
        setActiveStep(0);
        setError('');
        setSuccess('');
    };

    const handleBackToWebsite = () => {
        navigate('/');
    };

    const handleBackToLogin = () => {
        navigate('/auth/login');
    };

    const handleForgotPassword = () => {
        navigate('/auth/forgot-password');
    };

    return (
        <Box
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
                                        Parent Portal
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
                                        mb: 3,
                                    }}
                                >
                                    Join thousands of parents staying connected
                                    with their child's education
                                </Typography>
                            </Box>

                            {/* Progress Stepper */}
                            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel
                                            sx={{
                                                '& .MuiStepLabel-label': {
                                                    fontSize: {
                                                        xs: '0.75rem',
                                                        sm: '0.875rem',
                                                    },
                                                    fontWeight:
                                                        activeStep === index
                                                            ? 600
                                                            : 400,
                                                },
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {/* Error Alert */}
                            {error && (
                                <Alert
                                    severity="error"
                                    sx={{
                                        mb: 3,
                                        borderRadius: 2,
                                    }}
                                    onClose={() => setError('')}
                                >
                                    {error}
                                </Alert>
                            )}

                            {/* Success Alert */}
                            {success && (
                                <Alert
                                    severity="success"
                                    sx={{
                                        mb: 3,
                                        borderRadius: 2,
                                    }}
                                >
                                    {success}
                                </Alert>
                            )}

                            {/* Step Content */}
                            <Box sx={{ minHeight: 300 }}>
                                {activeStep === 0 && (
                                    <EmailRegistrationStep
                                        onSuccess={handleEmailStepSuccess}
                                        onError={handleError}
                                    />
                                )}

                                {activeStep === 1 && (
                                    <OTPAccountStep
                                        token={stepData.token}
                                        email={stepData.email}
                                        language={stepData.language}
                                        tenantAlias={stepData.tenantAlias}
                                        onSuccess={handleAccountCreationSuccess}
                                        onError={handleError}
                                        onBack={handleBackToEmailStep}
                                    />
                                )}
                            </Box>

                            {/* Footer */}
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.8125rem',
                                    }}
                                >
                                    Already have an account?{' '}
                                    <Typography
                                        component="button"
                                        variant="body2"
                                        onClick={handleBackToLogin}
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            border: 'none',
                                            background: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Sign In
                                    </Typography>
                                </Typography>
                            </Box>

                            {/* Forgot Password Link */}
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    Already have an account but forgot your
                                    password?{' '}
                                    <Typography
                                        component="button"
                                        variant="body2"
                                        onClick={handleForgotPassword}
                                        sx={{
                                            color: 'primary.main',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            border: 'none',
                                            background: 'none',
                                            fontSize: '0.875rem',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Reset Password
                                    </Typography>
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
                                    <Typography
                                        component="button"
                                        variant="body2"
                                        sx={{
                                            color: 'primary.main',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            border: 'none',
                                            background: 'none',
                                            fontSize: '0.875rem',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Contact School Administration
                                    </Typography>
                                </Typography>
                            </Box>

                            {/* Security Notice */}
                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.75rem',
                                        display: 'block',
                                    }}
                                >
                                    By creating an account, you agree to our
                                    Terms of Service and Privacy Policy
                                </Typography>
                            </Box>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
