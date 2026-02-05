import { yupResolver } from '@hookform/resolvers/yup';
import {
    ArrowBack as ArrowBackIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Login as LoginIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Alert,
    CircularProgress,
    Chip,
    alpha,
    useTheme,
    Link,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    authSchemas,
    type PasswordAuthFormData,
} from '../../../utils/validation/schemas';

interface PasswordStepProps {
    email: string;
    onSignIn: (data: PasswordAuthFormData) => void;
    onBack: () => void;
    onForgotPassword?: () => void;
    className?: string;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({
    email,
    onSignIn,
    onBack,
    onForgotPassword,
    className = '',
}) => {
    const theme = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PasswordAuthFormData>({
        resolver: yupResolver(authSchemas.passwordAuth),
        mode: 'onChange',
        defaultValues: {
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: PasswordAuthFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // TODO: Implement password authentication API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            // Simulate password verification
            const isValidPassword = data.password.length >= 6; // This would come from API response

            if (!isValidPassword) {
                setError(
                    'Incorrect password. Please try again or use OTP to sign in.'
                );
                return;
            }

            onSignIn(data);
        } catch (err) {
            console.error('Password authentication error:', err);
            setError(
                'Unable to sign in. Please check your password and try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = () => {
        if (onForgotPassword) {
            onForgotPassword();
        }
    };

    return (
        <Box className={className}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        mb: 2,
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                            ),
                        },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                >
                    Enter Your Password
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '1rem',
                        }}
                    >
                        Signing in as:
                    </Typography>
                    <Chip
                        label={email}
                        size="small"
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                            ),
                            color: 'primary.main',
                            fontWeight: 500,
                        }}
                    />
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                    }}
                >
                    Enter your password to securely access your parent portal.
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
                {/* Password Field */}
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            disabled={isSubmitting}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    height: 56,
                                    fontSize: '1.1rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.1rem',
                                },
                            }}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            autoFocus
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                handleTogglePasswordVisibility
                                            }
                                            edge="end"
                                            size="small"
                                            disabled={isSubmitting}
                                            sx={{
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    color: 'primary.main',
                                                },
                                            }}
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
                    )}
                />

                {/* Remember Me & Forgot Password */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                    }}
                >
                    <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        size="small"
                                        disabled={isSubmitting}
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
                                        Keep me signed in
                                    </Typography>
                                }
                            />
                        )}
                    />

                    <Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={handleForgotPassword}
                        disabled={isSubmitting}
                        sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                            '&:disabled': {
                                color: 'text.disabled',
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        Forgot Password?
                    </Link>
                </Box>

                {/* Sign In Button */}
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
                            <LoginIcon />
                        )
                    }
                    sx={{
                        py: 2,
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        height: 56,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        '&:hover': {
                            background:
                                'linear-gradient(135deg, #5b5bd6, #7c3aed)',
                            transform: 'translateY(-1px)',
                            boxShadow: theme.shadows[8],
                        },
                        '&:disabled': {
                            background: 'grey.300',
                            transform: 'none',
                        },
                        transition: 'all 0.3s ease',
                        mb: 4,
                    }}
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
            </Box>

            {/* Alternative Method */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        mb: 1,
                    }}
                >
                    Prefer a more secure option?
                </Typography>

                <Button
                    variant="text"
                    onClick={onBack}
                    sx={{
                        color: 'primary.main',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                            ),
                        },
                    }}
                >
                    Use OTP Instead
                </Button>
            </Box>
        </Box>
    );
};
