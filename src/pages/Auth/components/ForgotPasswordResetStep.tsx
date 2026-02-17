import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useToast from '../../../hooks/useToast';
import {
    authSchemas,
    type ForgotPasswordResetFormData,
} from '../../../utils/validation/schemas';
import {
    useForgotPasswordRequestOtpQuery,
    useForgotPasswordResetQuery,
} from '../_hooks/useAuthQueries';
import type { ILanguage } from '../_model/authModel';
import { FormField } from './shared/FormField';
import { authStyles } from './shared/authStyles';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface ForgotPasswordResetStepProps {
    token: string;
    email: string;
    language: ILanguage;
    tenantAlias: string;
    onSuccess: () => void;
    onError: (error: string) => void;
    onBack: () => void;
}

export const ForgotPasswordResetStep: React.FC<
    ForgotPasswordResetStepProps
> = ({ token, email, language, tenantAlias, onSuccess, onError, onBack }) => {
    const toast = useToast();
    const { mutateAsync: resetPasswordMutateAsync, isPending: isResetting } =
        useForgotPasswordResetQuery();
    const { mutateAsync: resendOtpMutateAsync, isPending: isResending } =
        useForgotPasswordRequestOtpQuery();
    const [resendCountdown, setResendCountdown] = useState(0);

    // Form setup with validation
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ForgotPasswordResetFormData>({
        resolver: yupResolver(authSchemas.forgotPasswordReset),
        defaultValues: {
            otp: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    const passwordValue = watch('password');

    // Countdown timer for resend
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setTimeout(() => {
                setResendCountdown(resendCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCountdown]);

    const onSubmit = async (data: ForgotPasswordResetFormData) => {
        try {
            const requestData = {
                token,
                otp: data.otp.trim(),
                email,
                language: language,
                tenantAlias,
                passwordMD5: md5(data.password),
            };

            const response = await resetPasswordMutateAsync(requestData);

            if (response?.succeeded) {
                onSuccess();
                toast.success('Password reset successfully!', {
                    description:
                        'Your password has been updated. Redirecting to login...',
                });
            } else {
                const errorMessage =
                    response?.messages?.[0] || 'Failed to reset password';
                onError(errorMessage);
                toast.error('Failed to reset password', {
                    description: errorMessage,
                });
            }
        } catch (error) {
            console.error('Password reset error:', error);
            let errorMessage = 'Failed to reset password. Please try again.';

            if (isAxiosError(error)) {
                errorMessage =
                    error?.response?.data?.messages?.[0] || error.message;
            }

            onError(errorMessage);
            toast.error('Failed to reset password', {
                description: errorMessage,
            });
        }
    };

    const handleResendCode = async () => {
        if (resendCountdown > 0) return;

        try {
            const requestData = {
                email,
                language: language,
                tenantAlias,
                hubConnectionId: null,
            };

            const response = await resendOtpMutateAsync(requestData);

            if (response?.succeeded) {
                setResendCountdown(60);
                toast.success('Code resent successfully!', {
                    description:
                        'Please check your email for the new reset code.',
                });
            } else {
                const errorMessage =
                    response?.messages?.[0] || 'Failed to resend code';
                onError(errorMessage);
                toast.error('Failed to resend code', {
                    description: errorMessage,
                });
            }
        } catch (error) {
            console.error('Resend code error:', error);
            let errorMessage = 'Failed to resend code. Please try again.';

            if (isAxiosError(error)) {
                errorMessage =
                    error?.response?.data?.messages?.[0] || error.message;
            }

            onError(errorMessage);
            toast.error('Failed to resend code', {
                description: errorMessage,
            });
        }
    };

    return (
        <Box sx={authStyles.formContainer}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                    }}
                >
                    Enter Reset Code
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        mb: 2,
                    }}
                >
                    Enter the 6-digit code sent to
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                    }}
                >
                    {email}
                </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* OTP Field */}
                <TextField
                    fullWidth
                    label="Reset Code"
                    placeholder="000000"
                    inputProps={{
                        maxLength: 6,
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        style: {
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            letterSpacing: '0.5rem',
                        },
                    }}
                    sx={{
                        ...authStyles.textField,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                    {...control.register('otp', {
                        onChange: e => {
                            // Only allow digits and limit to 6 characters
                            const numericValue = e.target.value
                                .replace(/\D/g, '')
                                .slice(0, 6);
                            e.target.value = numericValue;
                        },
                    })}
                    error={!!errors.otp}
                    helperText={errors.otp?.message}
                />

                {/* Resend Code */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 1 }}
                    >
                        Didn't receive the code?
                    </Typography>
                    <Button
                        variant="text"
                        onClick={handleResendCode}
                        disabled={isResending || resendCountdown > 0}
                        sx={authStyles.linkButton}
                    >
                        {isResending
                            ? 'Sending...'
                            : resendCountdown > 0
                              ? `Resend in ${resendCountdown}s`
                              : 'Resend Code'}
                    </Button>
                </Box>

                {/* Password Field */}
                <FormField
                    name="password"
                    control={control}
                    label="New Password"
                    placeholder="Enter your new password"
                    showPasswordToggle
                    error={errors.password}
                    sx={authStyles.passwordField}
                />

                {/* Password Strength Indicator */}
                {passwordValue && (
                    <Box sx={{ mb: 2 }}>
                        <PasswordStrengthIndicator password={passwordValue} />
                    </Box>
                )}

                {/* Confirm Password Field */}
                <FormField
                    name="confirmPassword"
                    control={control}
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    showPasswordToggle
                    error={errors.confirmPassword}
                    sx={authStyles.confirmPasswordField}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isResetting}
                    sx={authStyles.submitButton}
                >
                    {isResetting ? 'Resetting Password...' : 'Reset Password'}
                </Button>

                {/* Back Button */}
                <Button
                    fullWidth
                    variant="text"
                    onClick={onBack}
                    disabled={isResetting}
                    sx={{
                        ...authStyles.linkButton,
                        textAlign: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Back to Email Step
                </Button>

                {/* Security Info */}
                <Alert
                    severity="info"
                    sx={{
                        mt: 2,
                        backgroundColor: 'primary.50',
                        '& .MuiAlert-icon': {
                            color: 'primary.main',
                        },
                    }}
                >
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                        Your new password will be securely encrypted before
                        being sent to our servers.
                    </Typography>
                </Alert>
            </Box>
        </Box>
    );
};
