import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenManager } from '../lib/axios';
import type { AuthStep, AuthMethod } from '../pages/Auth/components/AuthStepper';
import type {
    PasswordAuthFormData,
    RegisterFormData
} from '../utils/validation/schemas';

type AuthMode = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'verify-email';

interface AuthState {
    mode: AuthMode;
    step: AuthStep;
    email: string;
    method: AuthMethod;
    completedSteps: AuthStep[];
    isLoading: boolean;
    error: string | null;
}

interface AuthFlowActions {
    // Navigation
    setMode: (mode: AuthMode) => void;
    setEmail: (email: string) => void;
    setMethod: (method: AuthMethod) => void;
    goToStep: (step: AuthStep) => void;
    goBack: () => void;
    completeStep: (step: AuthStep) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    reset: () => void;

    // Auth actions
    handleOTPSuccess: (otp: string) => Promise<void>;
    handlePasswordSuccess: (data: PasswordAuthFormData) => Promise<void>;
    handleSignupSuccess: (data: RegisterFormData) => Promise<void>;
    handleForgotPassword: (email: string) => Promise<void>;
    handleResetPassword: (data: { password: string; confirmPassword: string; token: string }) => Promise<void>;
    handleEmailVerification: (data: { token?: string; code?: string }) => Promise<void>;
    resendOTP: () => Promise<void>;
    resendEmailVerification: (email: string) => Promise<void>;
}

const initialState: AuthState = {
    mode: 'login',
    step: 'email',
    email: '',
    method: null,
    completedSteps: [],
    isLoading: false,
    error: null,
};

export const useAuthFlow = () => {
    const [state, setState] = useState<AuthState>(initialState);
    const navigate = useNavigate();

    // Mock user data - in a real app, this would come from the auth response
    const mockUser = {
        name: 'Sarah Johnson',
        email: state.email,
        avatar: undefined,
    };

    const setEmail = useCallback((email: string) => {
        setState(prev => ({
            ...prev,
            email,
            completedSteps: [...prev.completedSteps, 'email'],
            step: 'method',
            error: null,
        }));
    }, []);

    const setMethod = useCallback((method: AuthMethod) => {
        setState(prev => ({
            ...prev,
            method,
            completedSteps: [...prev.completedSteps, 'method'],
            step: 'auth',
            error: null,
        }));
    }, []);

    const goToStep = useCallback((step: AuthStep) => {
        setState(prev => ({
            ...prev,
            step,
            error: null,
        }));
    }, []);

    const goBack = useCallback(() => {
        setState(prev => {
            let newStep: AuthStep;
            let newCompletedSteps = [...prev.completedSteps];

            switch (prev.step) {
                case 'method':
                    newStep = 'email';
                    newCompletedSteps = newCompletedSteps.filter(s => s !== 'email');
                    break;
                case 'auth':
                    newStep = 'method';
                    newCompletedSteps = newCompletedSteps.filter(s => s !== 'method');
                    break;
                default:
                    newStep = prev.step;
            }

            return {
                ...prev,
                step: newStep,
                completedSteps: newCompletedSteps,
                error: null,
            };
        });
    }, []);

    const completeStep = useCallback((step: AuthStep) => {
        setState(prev => ({
            ...prev,
            completedSteps: [...new Set([...prev.completedSteps, step])],
        }));
    }, []);

    const setError = useCallback((error: string | null) => {
        setState(prev => ({ ...prev, error }));
    }, []);

    const setLoading = useCallback((loading: boolean) => {
        setState(prev => ({ ...prev, isLoading: loading }));
    }, []);

    const reset = useCallback(() => {
        setState(initialState);
    }, []);

    const authenticateUser = async (authData: any): Promise<void> => {
        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock successful authentication
            const tokens = {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
            };

            // Store tokens
            tokenManager.setTokens(tokens.accessToken, tokens.refreshToken);

            // Store user data
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('auth-token', tokens.accessToken);

            // Mark auth step as completed
            completeStep('auth');

            // Redirect to portal
            navigate('/portal');
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error('Authentication failed. Please try again.');
        }
    };

    const handleOTPSuccess = useCallback(async (otp: string) => {
        setLoading(true);
        setError(null);

        try {
            await authenticateUser({
                email: state.email,
                method: 'otp',
                otp,
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    }, [state.email]);

    const handlePasswordSuccess = useCallback(async (data: PasswordAuthFormData) => {
        setLoading(true);
        setError(null);

        try {
            await authenticateUser({
                email: state.email,
                method: 'password',
                password: data.password,
                rememberMe: data.rememberMe,
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Password authentication failed');
        } finally {
            setLoading(false);
        }
    }, [state.email]);

    const resendOTP = useCallback(async () => {
        setError(null);

        try {
            // TODO: Implement actual OTP resend API call
            await new Promise(resolve => setTimeout(resolve, 800));

            console.log(`Resending OTP to: ${state.email}`);

            // In a real app, this would trigger the OTP resend API
            return Promise.resolve();
        } catch (error) {
            console.error('Resend OTP error:', error);
            throw new Error('Failed to resend OTP. Please try again.');
        }
    }, [state.email]);

    const setMode = useCallback((mode: AuthMode) => {
        setState(prev => ({
            ...initialState,
            mode,
            email: prev.email, // Preserve email if available
        }));
    }, []);

    const handleSignupSuccess = useCallback(async (data: RegisterFormData) => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual signup API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store user data temporarily
            localStorage.setItem('pendingUser', JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            }));

            // Redirect to email verification
            setMode('verify-email');
            setState(prev => ({ ...prev, email: data.email }));
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Signup failed');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleForgotPassword = useCallback(async (email: string) => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual forgot password API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log(`Password reset link sent to: ${email}`);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to send reset link');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleResetPassword = useCallback(async (data: { password: string; confirmPassword: string; token: string }) => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual reset password API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Password reset successful', { token: data.token });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Password reset failed');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEmailVerification = useCallback(async (data: { token?: string; code?: string }) => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual email verification API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Email verification successful', data);

            // Get pending user data
            const pendingUserData = localStorage.getItem('pendingUser');
            const userData = pendingUserData ? JSON.parse(pendingUserData) : mockUser;

            // Store tokens and user data
            tokenManager.setTokens('verified-token', 'refresh-token');
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.removeItem('pendingUser');

            // Navigate to portal
            navigate('/portal');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Email verification failed');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const resendEmailVerification = useCallback(async (email: string) => {
        setError(null);

        try {
            // TODO: Replace with actual resend verification API call
            await new Promise(resolve => setTimeout(resolve, 800));

            console.log(`Resending verification email to: ${email}`);
        } catch (error) {
            console.error('Resend verification error:', error);
            throw new Error('Failed to resend verification email. Please try again.');
        }
    }, []);

    const actions: AuthFlowActions = {
        // Navigation
        setMode,
        setEmail,
        setMethod,
        goToStep,
        goBack,
        completeStep,
        setError,
        setLoading,
        reset,

        // Auth actions
        handleOTPSuccess,
        handlePasswordSuccess,
        handleSignupSuccess,
        handleForgotPassword,
        handleResetPassword,
        handleEmailVerification,
        resendOTP,
        resendEmailVerification,
    };

    return {
        state,
        actions,
    };
};