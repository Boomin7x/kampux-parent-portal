import { yupResolver } from '@hookform/resolvers/yup';
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useToast from '../../../hooks/useToast';
import {
    authSchemas,
    type ForgotPasswordEmailFormData,
} from '../../../utils/validation/schemas';
import { useForgotPasswordRequestOtpQuery } from '../_hooks/useAuthQueries';
import type { ILanguage } from '../_model/authModel';
import { FormField } from './shared/FormField';
import { authStyles } from './shared/authStyles';

interface ForgotPasswordEmailStepProps {
    onSuccess: (
        token: string,
        email: string,
        language: ILanguage,
        tenantAlias: string
    ) => void;
    onError: (error: string) => void;
}

export const ForgotPasswordEmailStep: React.FC<
    ForgotPasswordEmailStepProps
> = ({ onSuccess, onError }) => {
    const toast = useToast();
    const { mutateAsync, isPending } = useForgotPasswordRequestOtpQuery();

    // Form setup with validation
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordEmailFormData>({
        resolver: yupResolver(authSchemas.forgotPasswordEmail),
        defaultValues: {
            email: '',
            language: 'en-US',
            tenantAlias: 'univ',
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: ForgotPasswordEmailFormData) => {
        try {
            const requestData = {
                email: data.email.trim(),
                language: data.language as 'fr-FR' | 'en-US',
                tenantAlias: data.tenantAlias.trim(),
                hubConnectionId: null,
            };

            const response = await mutateAsync(requestData);

            if (response?.succeeded) {
                onSuccess(
                    response.data?.token || '',
                    data.email,
                    data.language as ILanguage,
                    data.tenantAlias
                );
                toast.success('Reset code sent!', {
                    description:
                        'Please check your email for the password reset code.',
                });
            } else {
                const errorMessage =
                    response?.messages?.[0] || 'Failed to send reset code';
                onError(errorMessage);
                toast.error('Failed to send reset code', {
                    description: errorMessage,
                });
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            let errorMessage = 'Failed to send reset code. Please try again.';

            if (isAxiosError(error)) {
                errorMessage =
                    error?.response?.data?.messages?.[0] || error.message;
            }

            onError(errorMessage);
            toast.error('Failed to send reset code', {
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
                    Reset Your Password
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                    }}
                >
                    Enter your email to receive a password reset code
                </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <FormField
                    name="email"
                    control={control}
                    label="Email Address"
                    placeholder="Enter your email address"
                    type="email"
                    error={errors.email}
                    sx={authStyles.textField}
                />

                {/* Tenant/School Field */}
                <FormField
                    name="tenantAlias"
                    control={control}
                    label="School/Organization Code"
                    placeholder="Enter your organization code"
                    error={errors.tenantAlias}
                    sx={authStyles.textField}
                />
                {!errors.tenantAlias && (
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            mb: 2,
                            display: 'block',
                            ml: 1.75,
                        }}
                    >
                        Contact your school administrator for the correct code
                    </Typography>
                )}

                {/* Language Selection */}
                <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                            sx={{ mb: 3 }}
                            error={!!errors.language}
                        >
                            <InputLabel>Preferred Language</InputLabel>
                            <Select
                                {...field}
                                label="Preferred Language"
                                disabled={isPending}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            >
                                <MenuItem value="en-US">English (US)</MenuItem>
                                <MenuItem value="fr-FR">Français (FR)</MenuItem>
                            </Select>
                            {errors.language && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'error.main',
                                        mt: 0.5,
                                        ml: 1.75,
                                    }}
                                >
                                    {errors.language.message}
                                </Typography>
                            )}
                        </FormControl>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isPending}
                    sx={authStyles.submitButton}
                >
                    {isPending ? 'Sending Code...' : 'Send Reset Code'}
                </Button>

                {/* Info Alert */}
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
                        We'll send a 6-digit reset code to your email address.
                        Please check your inbox and spam folder.
                    </Typography>
                </Alert>
            </Box>
        </Box>
    );
};
