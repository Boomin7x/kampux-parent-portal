import { yupResolver } from '@hookform/resolvers/yup';
import {
    CheckCircle as CheckIcon,
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authSchemas } from '../../../utils/validation/schemas';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface ResetPasswordStepProps {
    onResetPassword: (data: ResetPasswordFormData) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
}

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
    token: string;
}

export const ResetPasswordStep: React.FC<ResetPasswordStepProps> = ({
    onResetPassword,
    isLoading = false,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [tokenValid, setTokenValid] = useState<boolean | null>(null);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        setValue,
    } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(authSchemas.resetPassword),
        mode: 'onChange',
        defaultValues: {
            password: '',
            confirmPassword: '',
            token: token || '',
        },
    });

    const watchedPassword = watch('password');

    useEffect(() => {
        if (token) {
            setValue('token', token);
            // TODO: Validate token with API
            // For now, just set as valid if token exists
            setTokenValid(!!token);
        } else {
            setTokenValid(false);
        }
    }, [token, setValue]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            await onResetPassword(data);
            setIsSuccess(true);
        } catch (error) {
            console.error('Password reset error:', error);
        }
    };

    const handleBackToLogin = () => {
        navigate('/auth');
    };

    // Invalid token state
    if (tokenValid === false) {
        return (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                {/* Error Icon */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'error.50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4,
                        border: '2px solid',
                        borderColor: 'error.200',
                    }}
                >
                    <LockIcon sx={{ fontSize: 40, color: 'error.main' }} />
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
                    Invalid Reset Link
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
                    This password reset link is invalid or has expired. Please request a new reset link
                    to continue.
                </Typography>

                <Button
                    onClick={handleBackToLogin}
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
                            background: 'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Back to Sign In
                </Button>
            </Box>
        );
    }

    // Success state
    if (isSuccess) {
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
                    Password Reset Successful!
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
                    Your password has been successfully reset. You can now sign in with your new
                    password.
                </Typography>

                <Button
                    onClick={handleBackToLogin}
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
                            background: 'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Continue to Sign In
                </Button>
            </Box>
        );
    }

    // Loading state while validating token
    if (tokenValid === null) {
        return (
            <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Validating reset token...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
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
                    <LockIcon sx={{ fontSize: 32, color: 'primary.main' }} />
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
                    Reset Your Password
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
                    Please enter your new password below. Make sure it's strong and secure.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* New Password Field */}
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                {...field}
                                label="New Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                                placeholder="Enter your new password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <PasswordStrengthIndicator
                                password={watchedPassword}
                                showRequirements={true}
                            />
                        </Box>
                    )}
                />

                {/* Confirm Password Field */}
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Confirm New Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                            placeholder="Confirm your new password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            edge="end"
                                            size="small"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOffIcon fontSize="small" />
                                            ) : (
                                                <VisibilityIcon fontSize="small" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
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

                {/* Submit Button */}
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
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </Button>

                {/* Back to Login Link */}
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        onClick={handleBackToLogin}
                        variant="text"
                        sx={{
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
                        Back to Sign In
                    </Button>
                </Box>
            </form>
        </Box>
    );
};