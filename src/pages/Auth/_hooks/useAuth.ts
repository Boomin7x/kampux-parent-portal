import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenManager } from '../../../lib/axios';
import {
    authService,
    type LoginRequest,
    type LoginResponse,
    type UserData,
} from '../_service/authService';

// Custom hook for login
export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: authService.login,
        onSuccess: response => {
            // Check if login was successful
            if (response.succeeded && response.data) {
                // Store tokens
                if (response.data.token && response.data.refreshToken) {
                    tokenManager.setTokens(
                        response.data.token,
                        response.data.refreshToken
                    );
                }

                // Store user data
                localStorage.setItem('user', JSON.stringify(response.data));

                // Invalidate any cached queries
                queryClient.invalidateQueries();

                // Navigate to portal
                navigate('/portal');
            } else {
                // Handle failed login
                throw new Error(
                    response.messages?.join(', ') || 'Login failed'
                );
            }
        },
        onError: error => {
            console.error('Login failed:', error);
            // Clear any existing tokens
            tokenManager.clearTokens();
        },
    });
};

// Custom hook for logout
export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: async () => {
            // Clear tokens and user data
            tokenManager.clearTokens();
        },
        onSuccess: () => {
            // Clear user data
            localStorage.removeItem('user');

            // Clear all cached queries
            queryClient.clear();

            // Navigate to auth page
            navigate('/auth');
        },
    });
};

// Custom hook for checking username exists
export const useCheckUsernameExists = () => {
    return useMutation({
        mutationFn: authService.checkUsernameExists,
        onError: error => {
            console.error('Username check failed:', error);
        },
    });
};

// Custom hook to check if user is authenticated
export const useIsAuthenticated = () => {
    const accessToken = tokenManager.getAccessToken();
    return accessToken && !tokenManager.isTokenExpired(accessToken);
};

// Custom hook to get current user with reactive updates
export const useCurrentUser = (): UserData | null => {
    const [user, setUser] = useState<UserData | null>(() => {
        const userString = localStorage.getItem('user');
        if (!userString) return null;

        try {
            return JSON.parse(userString);
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const userString = localStorage.getItem('user');
            if (!userString) {
                setUser(null);
                return;
            }

            try {
                setUser(JSON.parse(userString));
            } catch {
                setUser(null);
            }
        };

        // Listen for storage changes across tabs
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return user;
};

// Helper hook to get user profile information
export const useUserProfile = () => {
    const user = useCurrentUser();

    if (!user) return null;

    return {
        id: user.userId,
        name: user.userAlias,
        email: user.userName,
        description: user.userDescription,
        imageUrl: user.userImageURL,
        isTeacher: user.isTeacher,
        language: user.language,
        applicationSetup: user.applicationSetup,
        schoolYears: user.schoolYears,
        currentSchoolYear:
            user?.schoolYears?.find(sy => sy.isActive) ||
            user?.schoolYears?.[0],
    };
};
