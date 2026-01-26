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
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthFlow } from '../../hooks/useAuthFlow';
import { AuthBackground } from './components/AuthBackground';
import { AuthForm } from './components/AuthForm';
import { AuthStepper } from './components/AuthStepper';
import { EmailStep } from './components/EmailStep';
import { EmailVerificationStep } from './components/EmailVerificationStep';
import { ForgotPasswordStep } from './components/ForgotPasswordStep';
import { MethodSelector } from './components/MethodSelector';
import { OTPStep } from './components/OTPStep';
import { PasswordStep } from './components/PasswordStep';
import { ResetPasswordStep } from './components/ResetPasswordStep';
import { SignupStep } from './components/SignupStep';

// Auth page props
interface AuthPageProps {
    className?: string;
}

// Main Auth Page component
const AuthPage: React.FC<AuthPageProps> = ({ className = '' }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [useNewFlow, setUseNewFlow] = useState(true);

    const [searchParams] = useSearchParams();
    const { state, actions } = useAuthFlow();

    // Handle URL-based navigation for reset password and email verification
    useEffect(() => {
        const resetToken = searchParams.get('token');
        const mode = searchParams.get('mode');

        if (resetToken && mode === 'reset-password') {
            actions.setMode('reset-password');
        } else if (resetToken && mode === 'verify-email') {
            actions.setMode('verify-email');
        }
    }, [searchParams, actions]);

    const handleBackToWebsite = () => {
        navigate('/');
    };

    const toggleAuthMode = () => {
        setAuthMode(prev => (prev === 'login' ? 'register' : 'login'));
    };

    const toggleFlowMode = () => {
        setUseNewFlow(!useNewFlow);
        actions.reset();
    };

    const handleForgotPassword = () => {
        actions.setMode('forgot-password');
    };

    const handleSignupMode = () => {
        actions.setMode('signup');
    };

    const handleBackToLogin = () => {
        actions.setMode('login');
        setAuthMode('login');
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
                            {state.mode === 'reset-password' ? (
                                <ResetPasswordStep
                                    onResetPassword={
                                        actions.handleResetPassword
                                    }
                                    isLoading={state.isLoading}
                                    error={state.error}
                                />
                            ) : state.mode === 'verify-email' ? (
                                <EmailVerificationStep
                                    onVerifyEmail={
                                        actions.handleEmailVerification
                                    }
                                    onResendVerification={
                                        actions.resendEmailVerification
                                    }
                                    email={state.email}
                                    isLoading={state.isLoading}
                                    error={state.error}
                                />
                            ) : state.mode === 'forgot-password' ? (
                                <ForgotPasswordStep
                                    onSendResetLink={
                                        actions.handleForgotPassword
                                    }
                                    onBack={handleBackToLogin}
                                    isLoading={state.isLoading}
                                    error={state.error}
                                />
                            ) : state.mode === 'signup' ? (
                                <SignupStep
                                    onSignup={actions.handleSignupSuccess}
                                    onBack={handleBackToLogin}
                                    isLoading={state.isLoading}
                                    error={state.error}
                                />
                            ) : useNewFlow && authMode === 'login' ? (
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
                                            {authMode === 'login'
                                                ? 'Welcome Back!'
                                                : 'Join Our Community!'}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '1rem',
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {authMode === 'login'
                                                ? "Sign in to access your parent portal and stay connected with your child's educational journey."
                                                : "Create your parent account to start tracking your child's academic progress and school activities."}
                                        </Typography>
                                    </Box>

                                    {/* Auth Form */}
                                    <AuthForm
                                        mode={authMode}
                                        onToggleMode={toggleAuthMode}
                                        onForgotPassword={handleForgotPassword}
                                    />

                                    {/* Flow Toggle */}
                                    {authMode === 'login' && (
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
                                    )}

                                    {/* Footer */}
                                    <Box sx={{ textAlign: 'center', mt: 4 }}>
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
                                </>
                            )}
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AuthPage;
