import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import md5 from 'md5';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useToast } from '../../../hooks/useToast';
import { tokenManager } from '../../../lib/axios';
import { authSchemas } from '../../../utils/validation/schemas';
import { useGetTokenQuery, useUserExistsQuery } from '../_hooks/useAuthQueries';
import { ILanguage } from '../_model/authModel';
import { FormField } from './shared/FormField';
import { SocialAuth } from './shared/SocialAuth';
import { authStyles, formAnimations } from './shared/authStyles';

// Sign-in form data interface
interface SignInFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

// Sign-in form props
interface SignInFormProps {
    onForgotPassword?: () => void;
    onSuccess?: (userData: any) => void;
    className?: string;
}

// Main SignInForm component
export const SignInForm: React.FC<SignInFormProps> = ({
    onForgotPassword,
    onSuccess: _o,
    className = '',
}) => {
    const toast = useToast();
    const { mutateAsync } = useUserExistsQuery();
    const { mutateAsync: getTokenMutateAsync } = useGetTokenQuery();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form setup with login schema validation
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: yupResolver(authSchemas.login),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        mode: 'onChange',
    });

    // Mock current user data
    // const currentUser = {
    //     name: 'Sarah Johnson',
    //     email: 'sarah.johnson@email.com',
    //     avatar: undefined,
    // };

    // const defaultUser = {
    //     userName: 'moussango@gmail.com',
    //     // name: 'Moussango Bertrand',
    //     password: md5('P@ssw0rd'),
    //     tenantAlias: 'univ',
    // };

    // Form submission handler
    const onSubmit = async (data: SignInFormData) => {
        const password = md5(data?.password);
        setIsSubmitting(true);
        try {
            console.log('Sign-in data:', data);

            const result = await mutateAsync({
                hubConnectionId: '',
                language: ILanguage.EN,
                password: password,
                tenantAlias: 'univ',
                userName: data?.email,
            });

            console.log({ result });

            if (!result) {
                toast.error('Sign-in failed');
                return;
            }

            if (result.succeeded === false) {
                toast.error('Sign-in failed', {
                    description:
                        result.messages.join(', ') || 'Wrong credentials.',
                });
                return;
            }

            const tokenResult = await getTokenMutateAsync({
                userName: data?.email,
                password: password,
                tenantAlias: 'univ',
                hubConnectionId: '',
                language: ILanguage.EN,
            });

            if (!tokenResult || tokenResult.succeeded === false) {
                toast.error('Sign-in failed', {
                    description:
                        tokenResult?.messages.join(', ') ||
                        'Wrong Credentials.',
                });
                return;
            }

            toast.success(`Login Successful`, {
                description: 'Welcome back to your parent portal',
            });
            const tokenData = {
                tokeen: tokenResult.data.token,
                refreshToken: tokenResult.data.refreshToken,
            };

            tokenManager.setTokens(tokenData.tokeen, tokenData.refreshToken);
            localStorage.setItem('user', JSON.stringify(tokenResult?.data));

            // navigate
            return;
        } catch (error) {
            console.error('Sign-in error:', error);
            if (isAxiosError(error)) {
                toast.error('Sign-in failed', {
                    description: error.response?.data?.message || error.message,
                });
            } else {
                toast.error('Sign-in failed', {
                    description: 'An unexpected error occurred.',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Google sign-in handler
    const handleGoogleSignIn = () => {
        // TODO: Implement Google SSO
        console.log('Google sign-in clicked');
        toast.info('Google Sign-in', {
            description: 'Google SSO will be implemented soon.',
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
                } as any
            }
        >
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
                placeholder="Enter your password"
                showPasswordToggle
                error={errors.password}
                sx={authStyles.passwordField}
            />

            {/* Remember me and forgot password */}
            <Box sx={authStyles.formActionsContainer}>
                <Controller
                    name="rememberMe"
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
                                    Remember Me
                                </Typography>
                            }
                        />
                    )}
                />
                <Button
                    variant="text"
                    onClick={onForgotPassword}
                    sx={authStyles.linkButton}
                >
                    Forgot Password?
                </Button>
            </Box>

            {/* Submit Button */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={authStyles.submitButton}
            >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Social Authentication */}
            <SocialAuth
                onGoogleSignIn={handleGoogleSignIn}
                isLoading={isSubmitting}
                mode="signin"
            />
        </Box>
    );
};
