import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    authSchemas,
    type EmailOnlyFormData,
} from '../../../utils/validation/schemas';
import { useUserExistsQuery } from '../_hooks/useAuthQueries';
import { ILanguage } from '../_model/authModel';

interface EmailStepProps {
    onContinue: (email: string) => void;
    initialEmail?: string;
    className?: string;
}

export const EmailStep: React.FC<EmailStepProps> = ({
    onContinue,
    initialEmail = '',
    className = '',
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { mutateAsync } = useUserExistsQuery();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EmailOnlyFormData>({
        resolver: yupResolver(authSchemas.emailOnly),
        mode: 'onSubmit',
        defaultValues: {
            email: initialEmail,
        },
    });

    const onSubmit = async (data: EmailOnlyFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // TODO: Implement email verification API call
            const result = await mutateAsync({
                hubConnectionId: '',
                language: ILanguage.EN,
                password: '',
                tenantAlias: 'moussango@gmail.com',
                userName: '',
            }); // Simulate API call

            console.log({ result });

            // Simulate email verification
            // const emailExists = true; // This would come from API response

            if (!result) {
                setError(
                    'No account found with this email address. Please check your email or contact school administration.'
                );
                return;
            }

            onContinue(data.email);
        } catch (err) {
            console.error('Email verification error:', err);
            setError('Unable to verify email address. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box className={className}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                >
                    Sign In to Parent Portal
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        maxWidth: 400,
                        mx: 'auto',
                    }}
                >
                    Enter your email address to get started. We'll help you sign
                    in securely.
                </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                            disabled={isSubmitting}
                            sx={{
                                mb: 4,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    height: 56,
                                    fontSize: '1.1rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.1rem',
                                },
                            }}
                            placeholder="Enter your email address"
                            autoComplete="email"
                            autoFocus
                        />
                    )}
                />

                {/* Continue Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || !isValid}
                    endIcon={
                        isSubmitting ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <ArrowForwardIcon />
                        )
                    }
                    sx={{
                        py: 2,
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        height: 56,
                        background: 'linear-gradient(135deg, #f59e0b, #16a34a)',
                        '&:hover': {
                            background:
                                'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                            boxShadow: theme => theme.shadows[8],
                        },
                        '&:disabled': {
                            background: 'grey.300',
                            transform: 'none',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    {isSubmitting ? 'Verifying...' : 'Continue'}
                </Button>
            </Box>

            {/* Help Text */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                    }}
                >
                    Don't have access?{' '}
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            p: 0,
                            minWidth: 'auto',
                            color: 'primary.main',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Contact School Administration
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
};
