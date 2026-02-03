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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthFlow } from '../../hooks/useAuthFlow';
import { useToast } from '../../hooks/useToast';
import { AuthBackground } from './components/AuthBackground';
import { AuthStepper } from './components/AuthStepper';
import { EmailStep } from './components/EmailStep';
import { MethodSelector } from './components/MethodSelector';
import { OTPStep } from './components/OTPStep';
import { PasswordStep } from './components/PasswordStep';
import { SignInForm } from './components/SignInForm';

interface LoginPageProps {
    className?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ className = '' }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [useNewFlow, setUseNewFlow] = useState(true);

    const { state, actions } = useAuthFlow();
    const toast = useToast();

    const handleBackToWebsite = () => {
        navigate('/');
    };

    const toggleFlowMode = () => {
        setUseNewFlow(!useNewFlow);
        actions.reset();
    };

    const handleForgotPassword = () => {
        navigate('/auth/forgot-password');
    };

    const handleSignupMode = () => {
        navigate('/auth/signup');
    };

    // Demo function to test toasts (remove in production)
    const testToast = () => {
        const toastTypes = [
            () =>
                toast.success('Welcome to Excellence Academy!', {
                    description:
                        'Modern toast system is now active with beautiful animations.',
                    action: {
                        label: 'Explore',
                        onClick: () =>
                            toast.info(
                                'Toast system features beautiful gradients and smooth animations!'
                            ),
                    },
                }),
            () => toast.auth.loginSuccess('John Doe'),
            () =>
                toast.error('Demo Error Toast', {
                    description:
                        'This showcases the error styling with proper typography.',
                }),
            () =>
                toast.warning('Important Notice', {
                    description:
                        'Please verify your email address to access all features.',
                    action: {
                        label: 'Verify',
                        onClick: () =>
                            toast.auth.emailVerificationSent(
                                'demo@excellence.edu'
                            ),
                    },
                }),
            () =>
                toast.info('Excellence Academy Portal', {
                    description:
                        'Experience the most advanced parent portal system.',
                }),
        ];

        // Show random toast type
        const randomToast =
            toastTypes[Math.floor(Math.random() * toastTypes.length)];
        randomToast();
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

                            {/* Auth Flow Content */}
                            {useNewFlow ? (
                                <>
                                    {/* Multi-Step Login Flow */}
                                    <AuthStepper
                                        activeStep={state.step}
                                        selectedMethod={state.method}
                                        completed={state.completedSteps}
                                    />

                                    {/* Step Content */}
                                    {state.step === 'email' && (
                                        <EmailStep
                                            onContinue={actions.setEmail}
                                            initialEmail={state.email}
                                        />
                                    )}

                                    {state.step === 'method' && (
                                        <MethodSelector
                                            email={state.email}
                                            onSelectMethod={actions.setMethod}
                                            onBack={actions.goBack}
                                        />
                                    )}

                                    {state.step === 'auth' &&
                                        state.method === 'otp' && (
                                            <OTPStep
                                                email={state.email}
                                                onVerify={
                                                    actions.handleOTPSuccess
                                                }
                                                onBack={actions.goBack}
                                                onResendOTP={actions.resendOTP}
                                            />
                                        )}

                                    {state.step === 'auth' &&
                                        state.method === 'password' && (
                                            <PasswordStep
                                                email={state.email}
                                                onSignIn={
                                                    actions.handlePasswordSuccess
                                                }
                                                onBack={actions.goBack}
                                                onForgotPassword={
                                                    handleForgotPassword
                                                }
                                            />
                                        )}

                                    {/* Flow Actions */}
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
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            Prefer the classic login?{' '}
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={toggleFlowMode}
                                                sx={{
                                                    p: 0,
                                                    minWidth: 'auto',
                                                    color: 'primary.main',
                                                    textTransform: 'none',
                                                    fontSize: '0.875rem',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Switch to Classic Login
                                            </Button>
                                        </Typography>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    {/* Legacy Auth Form */}
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
                                            Sign in to access your parent portal
                                            and stay connected with your child's
                                            educational journey.
                                        </Typography>
                                    </Box>

                                    {/* Sign-In Form */}
                                    <SignInForm
                                        onForgotPassword={handleForgotPassword}
                                        onSuccess={() => navigate('/portal')}
                                    />

                                    {/* Flow Toggle */}
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
                                            Want a more secure login?{' '}
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={toggleFlowMode}
                                                sx={{
                                                    p: 0,
                                                    minWidth: 'auto',
                                                    color: 'primary.main',
                                                    textTransform: 'none',
                                                    fontSize: '0.875rem',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Try New Secure Login
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

                                        {/* Demo Toast Button - Remove in production */}
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={testToast}
                                            sx={{
                                                mt: 1,
                                                textTransform: 'none',
                                                fontSize: '0.75rem',
                                                opacity: 0.7,
                                            }}
                                        >
                                            Test Toast
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
