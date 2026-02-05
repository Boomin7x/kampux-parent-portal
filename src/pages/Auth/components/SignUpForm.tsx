import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Typography,
    type SxProps,
} from '@mui/material';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useToast } from '../../../hooks/useToast';
import { authSchemas } from '../../../utils/validation/schemas';
import { FormField } from './shared/FormField';
import { SocialAuth } from './shared/SocialAuth';
import { authStyles, formAnimations } from './shared/authStyles';

// Sign-up form data interface
interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
}

// Sign-up form props
interface SignUpFormProps {
    onSuccess?: (userData: SignUpFormData) => void;
    className?: string;
}

// Main SignUpForm component
export const SignUpForm: React.FC<SignUpFormProps> = ({
    onSuccess,
    className = '',
}) => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form setup with register schema validation
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(authSchemas.register),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            acceptTerms: false,
        },
        mode: 'onChange',
    });

    // Form submission handler
    const onSubmit = async (data: SignUpFormData) => {
        setIsSubmitting(true);
        try {
            console.log('Sign-up data:', data);

            // TODO: Implement actual registration API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            // Store user data temporarily
            localStorage.setItem(
                'pendingUser',
                JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                })
            );

            // Show success toast
            toast.auth.signupSuccess();

            // Handle success callback
            onSuccess?.(data);
        } catch (error) {
            console.error('Sign-up error:', error);
            if (isAxiosError(error)) {
                toast.error('Registration failed', {
                    description: error.response?.data?.message || error.message,
                });
            } else {
                toast.error('Registration failed', {
                    description: 'An unexpected error occurred.',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Google sign-up handler
    const handleGoogleSignUp = () => {
        // TODO: Implement Google SSO for signup
        console.log('Google sign-up clicked');
        toast.info('Google Sign-up', {
            description: 'Google SSO registration will be implemented soon.',
        });
    };

    return (
        <Box
            className={className}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={
                {
                    ...authStyles.formContainer,
                    ...formAnimations.slideIn,
                } as SxProps
            }
        >
            {/* Name fields */}
            <Box sx={authStyles.nameFieldsContainer}>
                <FormField
                    name="firstName"
                    control={control}
                    label="First Name"
                    placeholder="Enter your first name"
                    error={errors.firstName}
                    sx={{ mb: 3 }}
                />
                <FormField
                    name="lastName"
                    control={control}
                    label="Last Name"
                    placeholder="Enter your last name"
                    error={errors.lastName}
                    sx={{ mb: 3 }}
                />
            </Box>

            {/* Email field */}
            <FormField
                name="email"
                control={control}
                label="Email"
                placeholder="Enter your email address"
                type="email"
                error={errors.email}
                sx={authStyles.textField}
            />

            {/* Password field */}
            <FormField
                name="password"
                control={control}
                label="Password"
                placeholder="Create a password (min. 6 characters)"
                showPasswordToggle
                error={errors.password}
                sx={authStyles.passwordField}
            />

            {/* Confirm Password field */}
            <FormField
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                placeholder="Confirm your password"
                showPasswordToggle
                error={errors.confirmPassword}
                sx={authStyles.confirmPasswordField}
            />

            {/* Terms and conditions */}
            <Controller
                name="acceptTerms"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...field}
                                size="small"
                                sx={authStyles.checkbox}
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
                                            textDecoration: 'underline',
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
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Privacy Policy
                                </Link>
                            </Typography>
                        }
                        sx={{ ...authStyles.termsContainer, mb: 4 }}
                    />
                )}
            />

            {/* Terms validation error */}
            {errors.acceptTerms && (
                <Typography
                    variant="caption"
                    sx={{
                        color: 'error.main',
                        fontSize: '0.75rem',
                        mt: -3,
                        mb: 2,
                        ml: 1,
                        display: 'block',
                    }}
                >
                    {errors.acceptTerms.message}
                </Typography>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={authStyles.submitButton}
            >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>

            {/* Social Authentication */}
            <SocialAuth
                onGoogleSignIn={handleGoogleSignUp}
                isLoading={isSubmitting}
                mode="signup"
            />
        </Box>
    );
};
