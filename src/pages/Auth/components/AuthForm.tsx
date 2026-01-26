import { yupResolver } from '@hookform/resolvers/yup';
import {
    Google as GoogleIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { tokenManager } from '../../../lib/axios';
import { authSchemas } from '../../../utils/validation/schemas';

// Auth form props
interface AuthFormProps {
    mode: 'login' | 'register';
    onToggleMode: () => void;
    onForgotPassword?: () => void;
    className?: string;
}

// Form data interfaces
interface LoginFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
}

// Main AuthForm component
export const AuthForm: React.FC<AuthFormProps> = ({
    mode,
    onToggleMode,
    onForgotPassword,
    className = '',
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form setup
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(
            mode === 'login' ? authSchemas.login : authSchemas.register
        ),
        mode: 'onChange',
    });

    // Toggle password visibility
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Form submission
    const currentUser = {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        avatar: undefined,
    };
    const onSubmit = async (data: LoginFormData | RegisterFormData) => {
        setIsSubmitting(true);
        try {
            // TODO: Implement actual authentication logic
            console.log('Auth data:', data);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            // Store tokens
            tokenManager.setTokens('new token', 'refresh token');

            // Store user data
            localStorage.setItem(
                'user',
                JSON.stringify({ data, ...currentUser })
            );
            // Handle success (redirect, etc.)
        } catch (error) {
            console.error('Auth error:', error);
            // Handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    // Google SSO handler
    const handleGoogleSignIn = () => {
        // TODO: Implement Google SSO
        console.log('Google sign-in clicked');
    };

    // Reset form when mode changes
    React.useEffect(() => {
        reset();
    }, [mode, reset]);

    return (
        <Box
            className={className}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Name fields for registration */}
            {mode === 'register' && (
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
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
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
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
                            />
                        )}
                    />
                </Box>
            )}

            {/* Email field */}
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
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

            {/* Password field */}
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{
                            mb: mode === 'register' ? 3 : 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                        placeholder="Enter your password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleTogglePasswordVisibility}
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
                )}
            />

            {/* Confirm Password field for registration */}
            {mode === 'register' && (
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Confirm Password"
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
                            placeholder="Confirm your password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                handleToggleConfirmPasswordVisibility
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
            )}

            {/* Remember Me / Accept Terms */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                }}
            >
                {mode === 'login' ? (
                    <>
                        <Controller
                            name="rememberMe"
                            control={control}
                            defaultValue={false}
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
                                            Remember Me
                                        </Typography>
                                    }
                                />
                            )}
                        />
                        <Button
                            variant="text"
                            onClick={onForgotPassword}
                            sx={{
                                p: 0,
                                minWidth: 'auto',
                                color: 'primary.main',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Forgot Password?
                        </Button>
                    </>
                ) : (
                    <Controller
                        name="acceptTerms"
                        control={control}
                        defaultValue={false}
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
                                            sx={{ color: 'primary.main' }}
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="#"
                                            sx={{ color: 'primary.main' }}
                                        >
                                            Privacy Policy
                                        </Link>
                                    </Typography>
                                }
                                sx={{ alignItems: 'flex-start' }}
                            />
                        )}
                    />
                )}
            </Box>

            {/* Submit Button */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
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
                    mb: 3,
                }}
            >
                {isSubmitting
                    ? mode === 'login'
                        ? 'Signing In...'
                        : 'Creating Account...'
                    : mode === 'login'
                      ? 'Sign In'
                      : 'Create Account'}
            </Button>

            {/* Divider */}
            <Box sx={{ position: 'relative', mb: 3 }}>
                <Divider />
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        px: 2,
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                    }}
                >
                    Or continue with
                </Typography>
            </Box>

            {/* Google SSO Button */}
            <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleGoogleSignIn}
                startIcon={
                    <GoogleIcon
                        sx={{
                            fontSize: 20,
                            color: '#EA4335',
                        }}
                    />
                }
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
                    mb: 4,
                }}
            >
                Continue with Google
            </Button>

            {/* Toggle Auth Mode */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                    }}
                >
                    {mode === 'login'
                        ? "Don't have an account? "
                        : 'Already have an account? '}
                    <Button
                        variant="text"
                        onClick={onToggleMode}
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
                        {mode === 'login' ? 'Create Account' : 'Sign In'}
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
};
