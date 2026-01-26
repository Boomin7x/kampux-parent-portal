import { yupResolver } from '@hookform/resolvers/yup';
import {
    ArrowBack as ArrowBackIcon,
    CheckCircle as CheckIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { authSchemas } from '../../../utils/validation/schemas';

interface ForgotPasswordStepProps {
    onSendResetLink: (email: string) => Promise<void>;
    onBack: () => void;
    isLoading?: boolean;
    error?: string | null;
}

interface ForgotPasswordFormData {
    email: string;
}

export const ForgotPasswordStep: React.FC<ForgotPasswordStepProps> = ({
    onSendResetLink,
    onBack,
    isLoading = false,
    error,
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(authSchemas.forgotPassword),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });

    const watchedEmail = watch('email');

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await onSendResetLink(data.email);
            setSubmittedEmail(data.email);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Password reset error:', error);
        }
    };

    const handleResendEmail = async () => {
        if (submittedEmail) {
            await onSendResetLink(submittedEmail);
        }
    };

    if (isSubmitted) {
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

                {/* Success Message */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                    }}
                >
                    Check Your Email
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        mb: 1,
                        maxWidth: 400,
                        mx: 'auto',
                    }}
                >
                    We've sent password reset instructions to
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'primary.main',
                        fontSize: '1rem',
                        fontWeight: 600,
                        mb: 4,
                    }}
                >
                    {submittedEmail}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        mb: 6,
                        maxWidth: 400,
                        mx: 'auto',
                    }}
                >
                    Click the link in the email to reset your password. If you don't see the email,
                    check your spam folder.
                </Typography>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: 300,
                        mx: 'auto',
                    }}
                >
                    <Button
                        onClick={handleResendEmail}
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                                transform: 'translateY(-1px)',
                            },
                            '&:disabled': {
                                background: 'grey.300',
                                transform: 'none',
                            },
                        }}
                    >
                        {isLoading ? 'Resending...' : 'Resend Email'}
                    </Button>

                    <Button
                        onClick={onBack}
                        variant="outlined"
                        size="large"
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: '1rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            borderColor: 'grey.300',
                            color: 'text.primary',
                            '&:hover': {
                                borderColor: 'primary.main',
                                backgroundColor: 'grey.50',
                            },
                        }}
                    >
                        Back to Sign In
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{
                        color: 'text.secondary',
                        p: 0,
                        mb: 4,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: 'primary.main',
                        },
                    }}
                >
                    Back to Sign In
                </Button>

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
                    Forgot Your Password?
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        maxWidth: 400,
                    }}
                >
                    No worries! Enter your email address and we'll send you a link to reset your
                    password.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Email Address"
                            type="email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                            placeholder="Enter your email address"
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!isValid || isLoading || !watchedEmail}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                            background: 'grey.300',
                            transform: 'none',
                        },
                        mb: 4,
                    }}
                >
                    {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </Button>

                {/* Additional Help */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 3,
                        backgroundColor: 'grey.50',
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                            mb: 1,
                        }}
                    >
                        Still having trouble?
                    </Typography>
                    <Button
                        variant="text"
                        sx={{
                            color: 'primary.main',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            p: 0,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Contact School Administration
                    </Button>
                </Box>
            </form>
        </Box>
    );
};