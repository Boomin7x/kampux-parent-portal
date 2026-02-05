/* eslint-disable react-hooks/set-state-in-effect */
import { yupResolver } from '@hookform/resolvers/yup';
import {
    CheckCircle as CheckIcon,
    Email as EmailIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';

interface EmailVerificationStepProps {
    onVerifyEmail: (data: { token?: string; code?: string }) => Promise<void>;
    onResendVerification: (email: string) => Promise<void>;
    email?: string;
    isLoading?: boolean;
    error?: string | null;
}

interface VerificationFormData {
    verificationCode: string;
}

const verificationSchema = yup.object({
    verificationCode: yup
        .string()
        .required('Verification code is required')
        .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits')
        .length(6, 'Verification code must be exactly 6 digits'),
});

export const EmailVerificationStep: React.FC<EmailVerificationStepProps> = ({
    onVerifyEmail,
    onResendVerification,
    email = '',
    isLoading = false,
    error,
}) => {
    const [verificationStatus, setVerificationStatus] = useState<
        'pending' | 'verifying' | 'success' | 'manual'
    >('pending');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [hasAutoVerified, setHasAutoVerified] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<VerificationFormData>({
        resolver: yupResolver(verificationSchema),
        mode: 'onChange',
        defaultValues: {
            verificationCode: '',
        },
    });

    // Auto-verify if token is present in URL
    useEffect(() => {
        if (token && !hasAutoVerified) {
            setVerificationStatus('verifying');
            setHasAutoVerified(true);

            onVerifyEmail({ token })
                .then(() => {
                    setVerificationStatus('success');
                })
                .catch(() => {
                    setVerificationStatus('manual');
                });
        }
    }, [token, onVerifyEmail, hasAutoVerified]);

    // Resend cooldown timer
    useEffect(() => {
        let timer: any;
        if (resendCooldown > 0) {
            timer = setTimeout(() => {
                setResendCooldown(resendCooldown - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const handleManualVerification = async (data: VerificationFormData) => {
        try {
            setVerificationStatus('verifying');
            await onVerifyEmail({ code: data.verificationCode });
            setVerificationStatus('success');
        } catch (error) {
            console.error(error);
            setVerificationStatus('manual');
        }
    };

    const handleResendClick = async () => {
        if (resendCooldown > 0 || !email) return;

        try {
            await onResendVerification(email);
            setResendCooldown(60); // 60 second cooldown
        } catch (error) {
            console.error('Resend verification error:', error);
        }
    };

    const handleContinueToPortal = () => {
        navigate('/portal');
    };

    const handleBackToSignup = () => {
        navigate('/auth');
    };

    // Auto-verification in progress
    if (verificationStatus === 'verifying') {
        return (
            <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                <CircularProgress
                    size={60}
                    sx={{
                        color: 'primary.main',
                        mb: 3,
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: 'text.primary',
                    }}
                >
                    Verifying Your Email...
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        maxWidth: 400,
                        mx: 'auto',
                    }}
                >
                    Please wait while we verify your email address.
                </Typography>
            </Box>
        );
    }

    // Success state
    if (verificationStatus === 'success') {
        return (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                {/* Success Icon */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'success.50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4,
                        border: '2px solid',
                        borderColor: 'success.200',
                    }}
                >
                    <CheckIcon sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                    }}
                >
                    Email Verified Successfully!
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        mb: 6,
                        maxWidth: 400,
                        mx: 'auto',
                    }}
                >
                    Your email has been verified. You can now access your parent
                    portal and start tracking your child's academic progress.
                </Typography>

                <Button
                    onClick={handleContinueToPortal}
                    variant="contained"
                    size="large"
                    sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        '&:hover': {
                            background:
                                'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Continue to Portal
                </Button>
            </Box>
        );
    }

    // Manual verification or initial state
    return (
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                {/* Icon */}
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: 'primary.50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        border: '2px solid',
                        borderColor: 'primary.200',
                    }}
                >
                    <EmailIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                </Box>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                    }}
                >
                    Verify Your Email Address
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        mb: 1,
                        maxWidth: 450,
                        mx: 'auto',
                    }}
                >
                    We've sent a verification code to
                </Typography>

                {email && (
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'primary.main',
                            fontSize: '1rem',
                            fontWeight: 600,
                            mb: 3,
                        }}
                    >
                        {email}
                    </Typography>
                )}

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        maxWidth: 400,
                        mx: 'auto',
                    }}
                >
                    Enter the 6-digit code below to verify your account.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(handleManualVerification)}>
                {/* Verification Code Field */}
                <Controller
                    name="verificationCode"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Verification Code"
                            fullWidth
                            error={!!errors.verificationCode}
                            helperText={errors.verificationCode?.message}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.5em',
                                },
                                '& input': {
                                    textAlign: 'center',
                                },
                            }}
                            placeholder="000000"
                            inputProps={{
                                maxLength: 6,
                                pattern: '[0-9]*',
                            }}
                        />
                    )}
                />

                {/* Error Display */}
                {error && (
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'error.50',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'error.200',
                            mb: 3,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'error.main',
                                fontSize: '0.875rem',
                            }}
                        >
                            {error}
                        </Typography>
                    </Box>
                )}

                {/* Verify Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!isValid || isLoading}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        '&:hover': {
                            background:
                                'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                            background: 'grey.300',
                            transform: 'none',
                        },
                        mb: 3,
                    }}
                >
                    {isLoading ? 'Verifying...' : 'Verify Email'}
                </Button>

                {/* Resend Section */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 3,
                        backgroundColor: 'grey.50',
                        borderRadius: 2,
                        mb: 3,
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
                        Didn't receive the code?
                    </Typography>

                    <Button
                        onClick={handleResendClick}
                        disabled={resendCooldown > 0 || isLoading}
                        startIcon={<RefreshIcon />}
                        sx={{
                            color:
                                resendCooldown > 0
                                    ? 'text.secondary'
                                    : 'primary.main',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline',
                            },
                            '&:disabled': {
                                color: 'text.secondary',
                            },
                        }}
                    >
                        {resendCooldown > 0
                            ? `Resend Code (${resendCooldown}s)`
                            : 'Resend Verification Code'}
                    </Button>
                </Box>

                {/* Back to Signup Link */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                        }}
                    >
                        Need to change your email?{' '}
                        <Button
                            onClick={handleBackToSignup}
                            variant="text"
                            sx={{
                                p: 0,
                                minWidth: 'auto',
                                color: 'primary.main',
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Back to Sign Up
                        </Button>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
};
