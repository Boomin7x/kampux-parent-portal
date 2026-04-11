import { yupResolver } from '@hookform/resolvers/yup';
import {
    ArrowBack as ArrowBackIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    authSchemas,
    type RegisterFormData,
} from '../../../utils/validation/schemas';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface SignupStepProps {
    onSignup: (data: RegisterFormData) => Promise<void>;
    onBack: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export const SignupStep: React.FC<SignupStepProps> = ({
    onSignup,
    onBack,
    isLoading = false,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState<
        'info' | 'password' | 'terms'
    >('info');

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        trigger,
    } = useForm<RegisterFormData>({
        resolver: yupResolver(authSchemas.register),
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        },
    });

    const watchedPassword = watch('password');
    const watchedFields = watch();

    const handleNext = async () => {
        if (currentStep === 'info') {
            const isStepValid = await trigger([
                'firstName',
                'lastName',
                'email',
            ]);
            if (isStepValid) {
                setCurrentStep('password');
            }
        } else if (currentStep === 'password') {
            const isStepValid = await trigger(['password', 'confirmPassword']);
            if (isStepValid) {
                setCurrentStep('terms');
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep === 'terms') {
            setCurrentStep('password');
        } else if (currentStep === 'password') {
            setCurrentStep('info');
        } else {
            onBack();
        }
    };

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await onSignup(data);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const getStepProgress = () => {
        switch (currentStep) {
            case 'info':
                return 33;
            case 'password':
                return 66;
            case 'terms':
                return 100;
            default:
                return 0;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handlePrevious}
                    sx={{
                        color: 'text.secondary',
                        p: 0,
                        mb: 3,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: 'primary.main',
                        },
                    }}
                >
                    {currentStep === 'info' ? 'Back to Login' : 'Previous'}
                </Button>

                {/* Progress Bar */}
                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 4,
                            backgroundColor: 'grey.200',
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                width: `${getStepProgress()}%`,
                                height: '100%',
                                backgroundColor: 'primary.main',
                                transition: 'width 0.3s ease',
                            }}
                        />
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            mt: 1,
                            display: 'block',
                        }}
                    >
                        Step{' '}
                        {currentStep === 'info'
                            ? '1'
                            : currentStep === 'password'
                              ? '2'
                              : '3'}{' '}
                        of 3
                    </Typography>
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
                    {currentStep === 'info' && 'Create Your Account'}
                    {currentStep === 'password' && 'Choose a Strong Password'}
                    {currentStep === 'terms' && 'Review & Agree'}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                    }}
                >
                    {currentStep === 'info' &&
                        'Enter your basic information to get started.'}
                    {currentStep === 'password' &&
                        'Create a secure password to protect your account.'}
                    {currentStep === 'terms' &&
                        'Review your information and accept our terms to complete registration.'}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Basic Info */}
                {currentStep === 'info' && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="First Name"
                                        fullWidth
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            },
                                        }}
                                        placeholder="Enter your first name"
                                    />
                                )}
                            />
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Last Name"
                                        fullWidth
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            },
                                        }}
                                        placeholder="Enter your last name"
                                    />
                                )}
                            />
                        </Box>

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
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        },
                                    }}
                                    placeholder="Enter your email address"
                                />
                            )}
                        />
                    </Box>
                )}

                {/* Step 2: Password */}
                {currentStep === 'password' && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Box>
                                    <TextField
                                        {...field}
                                        label="Password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        fullWidth
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            },
                                        }}
                                        placeholder="Create a strong password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
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

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Confirm Password"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    fullWidth
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        },
                                    }}
                                    placeholder="Confirm your password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword
                                                        )
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
                    </Box>
                )}

                {/* Step 3: Terms & Review */}
                {currentStep === 'terms' && (
                    <Box>
                        {/* Review Information */}
                        <Box
                            sx={{
                                p: 3,
                                backgroundColor: 'grey.50',
                                borderRadius: 2,
                                mb: 4,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    color: 'text.primary',
                                }}
                            >
                                Account Information
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <strong>Name:</strong>{' '}
                                    {watchedFields.firstName}{' '}
                                    {watchedFields.lastName}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <strong>Email:</strong>{' '}
                                    {watchedFields.email}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Terms Acceptance */}
                        <Controller
                            name="acceptTerms"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...field}
                                            size="small"
                                            sx={{
                                                color: 'text.secondary',
                                                '&.Mui-checked': {
                                                    color: 'primary.main',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{ fontSize: '0.875rem' }}
                                        >
                                            I agree to the{' '}
                                            <Link
                                                href="#"
                                                sx={{
                                                    color: 'primary.main',
                                                    textDecoration: 'none',
                                                    '&:hover': {
                                                        textDecoration:
                                                            'underline',
                                                    },
                                                }}
                                            >
                                                Terms of Service
                                            </Link>{' '}
                                            and{' '}
                                            <Link
                                                href="#"
                                                sx={{
                                                    color: 'primary.main',
                                                    textDecoration: 'none',
                                                    '&:hover': {
                                                        textDecoration:
                                                            'underline',
                                                    },
                                                }}
                                            >
                                                Privacy Policy
                                            </Link>
                                        </Typography>
                                    }
                                    sx={{
                                        alignItems: 'flex-start',
                                        mt: 0,
                                    }}
                                />
                            )}
                        />
                        {errors.acceptTerms && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'error.main',
                                    fontSize: '0.75rem',
                                    ml: 4,
                                    mt: 1,
                                    display: 'block',
                                }}
                            >
                                {errors.acceptTerms.message}
                            </Typography>
                        )}
                    </Box>
                )}

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

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 4,
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}
                >
                    {currentStep !== 'terms' ? (
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isLoading}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                background:
                                    'linear-gradient(135deg, #f59e0b, #16a34a)',
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                                    transform: 'translateY(-1px)',
                                },
                                '&:disabled': {
                                    background: 'grey.300',
                                    transform: 'none',
                                },
                            }}
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={!watchedFields.acceptTerms || isLoading}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                background:
                                    'linear-gradient(135deg, #f59e0b, #16a34a)',
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                                    transform: 'translateY(-1px)',
                                },
                                '&:disabled': {
                                    background: 'grey.300',
                                    transform: 'none',
                                },
                            }}
                        >
                            {isLoading
                                ? 'Creating Account...'
                                : 'Create Account'}
                        </Button>
                    )}
                </Box>

                {/* Login Link */}
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                        }}
                    >
                        Already have an account?{' '}
                        <Button
                            variant="text"
                            onClick={onBack}
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
                            Sign In
                        </Button>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
};
