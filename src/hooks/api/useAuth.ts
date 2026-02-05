import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../../lib/axios';
import { invalidateQueries, queryKeys } from '../../lib/queryClient';
import { authService } from '../../services/authService';
// Get current user hook
export function useCurrentUser() {
    return useQuery({
        queryKey: queryKeys.currentUser(),
        queryFn: authService.getCurrentUser,
        enabled: authService.isAuthenticated(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: (failureCount, error: AxiosError) => {
            // Don't retry on authentication errors
            if (error?.status === 401) return false;
            return failureCount < 2;
        },
        initialData: authService.getStoredUser(),
    });
}

// Login mutation hook
export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.login,
        onSuccess: data => {
            // Update user query cache
            queryClient.setQueryData(queryKeys.currentUser(), data.user);

            // Invalidate all auth-related queries
            invalidateQueries.auth();

            // Navigate to portal
            navigate('/portal');
        },
        onError: (error: ApiError) => {
            console.error('Login failed:', error);
            // Error handling is managed by the form component
        },
    });
}

// Registration mutation hook
export function useRegister() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.register,
        onSuccess: data => {
            // Update user query cache
            queryClient.setQueryData(queryKeys.currentUser(), data.user);

            // Invalidate auth queries
            invalidateQueries.auth();

            // Navigate to portal
            navigate('/portal');
        },
        onError: (error: ApiError) => {
            console.error('Registration failed:', error);
        },
    });
}

// Logout mutation hook
export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            // Clear all cached data
            queryClient.clear();

            // Navigate to landing page
            navigate('/');
        },
        onError: (error: ApiError) => {
            // Even if logout fails on server, clear local data
            console.warn('Logout error:', error);
            queryClient.clear();
            navigate('/');
        },
    });
}

// Forgot password mutation hook
export function useForgotPassword() {
    return useMutation({
        mutationFn: authService.forgotPassword,
        onSuccess: () => {
            // Success feedback handled by component
        },
        onError: (error: ApiError) => {
            console.error('Forgot password failed:', error);
        },
    });
}

// Reset password mutation hook
export function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.resetPassword,
        onSuccess: () => {
            // Navigate to login page after successful reset
            navigate('/auth?message=password-reset-success');
        },
        onError: (error: ApiError) => {
            console.error('Reset password failed:', error);
        },
    });
}

// Change password mutation hook
export function useChangePassword() {
    return useMutation({
        mutationFn: authService.changePassword,
        onSuccess: () => {
            // Success feedback handled by component
        },
        onError: (error: ApiError) => {
            console.error('Change password failed:', error);
        },
    });
}

// Email verification mutation hook
export function useVerifyEmail() {
    return useMutation({
        mutationFn: authService.verifyEmail,
        onSuccess: () => {
            // Refresh user data to get updated verification status
            invalidateQueries.auth();
        },
        onError: (error: ApiError) => {
            console.error('Email verification failed:', error);
        },
    });
}

// Resend verification email mutation hook
export function useResendVerificationEmail() {
    return useMutation({
        mutationFn: authService.resendVerificationEmail,
        onSuccess: () => {
            // Success feedback handled by component
        },
        onError: (error: ApiError) => {
            console.error('Resend verification failed:', error);
        },
    });
}

// Comprehensive auth hook that provides all auth state and actions
export function useAuth() {
    const currentUserQuery = useCurrentUser();
    const loginMutation = useLogin();
    const logoutMutation = useLogout();
    const registerMutation = useRegister();

    return {
        // State
        user: currentUserQuery.data,
        isAuthenticated:
            authService.isAuthenticated() && !!currentUserQuery.data,
        isLoading: currentUserQuery.isLoading,
        error: currentUserQuery.error,

        // Actions
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        register: registerMutation.mutateAsync,

        // Mutation states
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        isRegistering: registerMutation.isPending,

        // Errors
        loginError: loginMutation.error,
        logoutError: logoutMutation.error,
        registerError: registerMutation.error,

        // Utilities
        refetchUser: currentUserQuery.refetch,
    };
}

// Hook for checking authentication status in route guards
export function useAuthGuard() {
    const { isAuthenticated, isLoading } = useAuth();

    return {
        isAuthenticated,
        isLoading,
        shouldRedirectToAuth: !isLoading && !isAuthenticated,
        shouldRedirectToPortal: !isLoading && isAuthenticated,
    };
}
